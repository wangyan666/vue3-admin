<template>
  <div class="app-layout">
    <Aside @change-fold="handleFold"></Aside>
    <div :class="['main-container', isFold?'fold':'unfold']">
      <AppNav></AppNav>
      <div class="app-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout'
}
</script>
<script setup>
import Aside from './Aside.vue'
import AppNav from './AppNav.vue'

import { ref } from 'vue'


// 接受子组件传递的isFold
const isFold = ref(false)
const handleFold = (param) => {
  isFold.value = param
}


</script>

<style scoped lang="scss">
.app-layout {
  // display: flex;
  .main-container {
    transition: margin-left .5s;
    &.fold {
      margin-left: 64px;
    }
    &.unfold {
      margin-left: 200px;
    }
    .app-main {
      height: calc(100vh - 50px);
      padding: 20px;
      background-color: #f2f2f2;
    }
  }
}
</style>
