// Interface data format used to return a unified format
import { getAppEnvConfig } from '../src/utils/env'

export function resultSuccess<T = Recordable>(data: T, { message = 'ok' } = {}) {
  return {
    code: 0,
    data,
    message,
    type: 'success'
  }
}

export function resultPageSuccess<T = any>(
  pageNo: number,
  pageSize: number,
  list: T[],
  { message = 'ok' } = {}
) {
  const pageData = pagination(pageNo, pageSize, list)

  return {
    ...resultSuccess({
      records: pageData,
      total: 100
    }),
    message
  }
}

export function resultError(message = 'Request failed', { code = -1, data = null } = {}) {
  return {
    code,
    data,
    message,
    type: 'error'
  }
}

export function pagination<T = any>(pageNo: number, pageSize: number, array: T[]): T[] {
  const offset = (pageNo - 1) * Number(pageSize)
  const ret =
    offset + Number(pageSize) >= array.length
      ? array.slice(offset, array.length)
      : array.slice(offset, offset + Number(pageSize))
  return ret
}

export interface requestParams {
  method: string
  body: any
  headers?: { authorization?: string }
  query: any
}

/**
 * @description 本函数用于从request数据中获取token，请根据项目的实际情况修改
 *
 */
export function getRequestToken({ headers }: requestParams): string | undefined {
  return headers?.authorization
}

// const envs = getAppEnvConfig()
// console.log('🚀 ~ file: _util.ts ~ line 64 ~ envs', envs)

//TODO 接口父路径（写死不够灵活）
export const baseUrl = '/api'
