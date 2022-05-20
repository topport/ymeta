<script lang="ts" setup>
import { request } from '@/hooks/useRequest/axios';
import { useRequest } from '@/hooks/useRequest/useRequest';

interface IUser {
  id: number;
  username: string;
  email: string;
  phone: string;
}

function getUserInfo(id: number) {
  return request<IUser>({
    url: '/getUserInfo',
    method: 'get',
    params: {
      id
    }
  })
}

// 单个请求示例
const { run, loading, data, err, cancel } = useRequest<IUser, [number]>(getUserInfo, {
  manual: true,
  onSuccess(res, params) {
    ElMessage.success(`请求成功 参数: ${params.toString()}`)
  },
  onError(err, params) {
    ElMessage.error(`请求错误 参数: ${params.toString()}`)
  }
})

const { run: repeatRun } = useRequest<IUser, [number]>(getUserInfo, {
  manual: true,
  repeatCancel: true
})

interface IPagination{
  pageNum: number,
  pageSize: number
}

const pagination = reactive<IPagination>({
  pageNum: 1,
  pageSize: 10
})

function getList(pagination: IPagination) {
  return request<IUser>({
    url: '/getUserInfo',
    method: 'get',
    params: {
      ...pagination
    }
  })
}

const { loading: refreshDepsLoading } = useRequest<IUser, [IPagination]>(getList, {
  manual: true,
  refreshDeps: [() => pagination],
  refreshDepsParams: computed(() => [pagination])
})

const { querise, run: queriseRun } = useRequest<IUser, [number]>(getUserInfo, {
  manual: true,
  queryKey: (id) => String(id)
})

const { run: debounceRun } = useRequest<IUser, [number]>(getUserInfo, {
  manual: true,
  debounceWait: 1500
})

const { run: throttleRun } = useRequest<IUser, [number]>(getUserInfo, {
  manual: true,
  throttleWait: 1500
})
</script>
<template>
  <div class="p-[24px]">
    普通请求示例
    <div>
      <el-button :loading="loading" @click="run(1)">请求</el-button>
      <el-button @click="cancel?.()">取消</el-button>
      <div>
        data: {{ data }}
      </div>
      <div>
        err: {{ err }}
      </div>
    </div>

    重复请求关闭,只保留最后一个请求，传入queryKey时无效
    <div>
      <el-button @click="repeatRun(2)">请求</el-button>
    </div>

    依赖更新,依赖项发生变化时，自动触发请求
    <div>
      <el-button :loading="refreshDepsLoading" @click="pagination.pageNum++">下一页</el-button>
    </div>

    并发请求
    <ul>
      <li>
        <el-button :loading="querise[1]?.loading" @click="queriseRun(1)">删除</el-button>
        <el-button @click="querise[1].cancel?.()">取消</el-button>
        {{ querise[1]?.data }}
      </li>
      <li>
        <el-button :loading="querise[2]?.loading" @click="queriseRun(2)">删除</el-button>
        <el-button @click="querise[2].cancel?.()">取消</el-button>
        {{ querise[2]?.data }}
      </li>
      <li>
        <el-button :loading="querise[3]?.loading" @click="queriseRun(3)">删除</el-button>
        <el-button @click="querise[3].cancel?.()">取消</el-button>
        {{ querise[3]?.data }}
      </li>
    </ul>

    防抖
    <div>
      <el-button @click="debounceRun(1)">防抖</el-button>
    </div>

    节流
    <div>
      <el-button @click="throttleRun(1)">节流</el-button>
    </div>
  </div>
</template>

