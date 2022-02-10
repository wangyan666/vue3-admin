<template>
  <div class="page-404">
    <h1>Page Not Found!</h1>
    <el-button @click="handleClick">Click to go HomePage</el-button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  name: '404'
}
</script>
<script setup>
  const router = useRouter()
  const handleClick = () => {
    router.push('/')
  }
</script>

<style scoped lang="scss">
  .page-404 {

  }
</style>