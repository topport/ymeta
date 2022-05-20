import { defineStore } from 'pinia'
import { UserItem } from '@/api/page/model/loginModel'

export interface User {
  userInfo: UserItem
}

const info = JSON.parse(localStorage.getItem('userInfo') as string)
export const useUserStore = defineStore({
  id: 'user',
  state: (): User => ({
    userInfo: info ?? {}
  }),
  getters: {
    getUserInfo(): UserItem {
      return this.userInfo
    }
  },
  actions: {
    setUserInfo(info: Partial<UserItem>) {
      this.userInfo = info
      localStorage.setItem('userInfo', JSON.stringify(info))
    },
    clearUserInfo() {
      this.userInfo = {}
      localStorage.clear()
    }
  }
})
