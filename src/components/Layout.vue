<template>
  <div class="app-layout">
    <div class="aside-container"></div>
    <div class="main-container">
      <div class="app-nav">right</div>
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

</script>

<style scoped lang="scss">
.app-layout {
  position: relative;
  .aside-container{
    position: fixed;
    width: 200px;
    height: 100vh;
    overflow-y: auto;
    transition: width .5s;
    color: #fff;
    background-color: orange;
  }
  .main-container{
    margin-left: 200px;
    .app-nav {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
    }
    .app-main {
      height: calc(100vh - 50px);
      padding: 20px;
      background-color: #f2f2f2;
    }
  }
}

</style>

