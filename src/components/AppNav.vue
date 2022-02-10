<!--
 * @Description  : file comments
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-14 18:32:53
 * @LastEditors  : wy
 * @LastEditTime : 2022-02-10 12:23:44
 * @FilePath     : \\src\\components\\AppNav.vue
 * 加油
-->
<template>
  <div class="app-nav">
       <BreadCrumb />
        <!--  -->
        <div class="user-info">
          <el-badge :value="userInfo.notice" type="primary" class="el-badge">
            <el-icon><Bell /></el-icon>
          </el-badge>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{ userInfo.username}}
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu style="width: 100px">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                <el-dropdown-item divided command="log-out"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
</template>

<script>
export default {
  name: 'AppNav'
}
</script>
<script setup >
import BreadCrumb from './BreadCrumb.vue'
import { useUserStore } from '../store/user'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { useMenuStore } from '../store/menu'
const router = useRouter()
const userStore = useUserStore()
const menuStore = useMenuStore()

const userInfo = computed(() => userStore.$state.userInfo)
const handleCommand = (command) => {
  if (command === 'log-out') {
    userStore.$patch((state) => {
      state.userInfo = {}
    })
    menuStore.$patch((state) => {
      state.routesLoaded = false
    })
    router.push('/login')
  }
}

// // 获取通知数量
// const noticeCount = ref(0)
// getNoticeCount().then((res) => {
//   noticeCount.value = res.data.count
// })
</script>

<style scoped lang="scss">
  .app-nav {
      height: 50px;
      padding: 0 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ddd;
      .el-badge {
        margin-right: 16px;
        font-size: 20px;
      }
      .el-dropdown-link {
        cursor: pointer;
        color: #409eff;
      }
      .el-icon--right {
        margin-left: 5px;
      }
    }
</style>