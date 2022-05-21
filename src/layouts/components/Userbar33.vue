<template>
  <div class="user-bar">
	 werwer
	</div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {getUser, removeAll} from '@/utils/local'
import {fullscreen} from '@/utils/utils'
import {msgList} from '@/plugins/mock'
import useGlobalProperties from '@/hooks/useGlobalProperties'

const router = useRouter()
const globalProperties = useGlobalProperties()

const userName = ref('user.name')
const userNameF = ref('')
const msg = ref(false)

onMounted(() => {
  const userInfo = getUser()
  userName.value = userInfo.userName
  userNameF.value = userName.value.substring(0, 1)
})

/* function */
//个人信息
function handleUser(command) {
  if (command === 'uc') {
    router.push({path: '/usercenter'})
  }
  if (command === 'cmd') {
    router.push({path: '/cmd'})
  }
  if (command === 'clearCache') {
    globalProperties.confirm('清除缓存会将系统初始化，包括登录状态、主题、语言设置等，是否继续？','提示', {
      type: 'info'
    }).then(() => {
      const loading = this.$loading()
      removeAll()
      router.replace({path: '/login'})
      const timer = setTimeout(() => {
        loading.close()
        location.reload()
      }, 1000)
      clearTimeout(timer)
    }).catch(() => {
      // 取消
    })
  }
  if (command === 'logout') {
    this.$confirm('确认是否退出当前用户？','提示', {
      type: 'warning',
      confirmButtonText: '退出',
      confirmButtonClass: 'el-button--danger'
    }).then(() => {
      this.$router.replace({path: '/login'});
    }).catch(() => {
      // 取消退出
    })
  }
}
// 全屏
function screen() {
  const element = document.documentElement
  fullscreen(element)
}
</script>

<style scoped>
.user-bar {display: flex;align-items: center;height: 100%;}
.user-bar .panel-item {padding: 0 10px;cursor: pointer;height: 100%;display: flex;align-items: center;}
.user-bar .panel-item i {font-size: 16px;}
.user-bar .panel-item:hover {background: rgba(0, 0, 0, 0.1);}
.user-bar .user-avatar {height:49px;display: flex;align-items: center;}
.user-bar .user-avatar label {display: inline-block;margin-left:5px;font-size: 12px;cursor:pointer;}

.msg-list li {border-top:1px solid #eee;}
.msg-list li a {display: flex;padding:20px;}
.msg-list li a:hover {background: #ecf5ff;}
.msg-list__icon {width: 40px;margin-right: 15px;}
.msg-list__main {flex: 1;}
.msg-list__main h2 {font-size: 15px;font-weight: normal;color: #333;}
.msg-list__main p {font-size: 12px;color: #999;line-height: 1.8;margin-top: 5px;}
.msg-list__time {width: 100px;text-align: right;color: #999;}

[data-theme='dark'] .msg-list__main h2 {color: #d0d0d0;}
[data-theme='dark'] .msg-list li {border-top:1px solid #363636;}
[data-theme='dark'] .msg-list li a:hover {background: #383838;}
</style>
