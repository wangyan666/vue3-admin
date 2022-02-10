import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入公共样式
import 'normalize.css'
import './assets/style/common.scss'


// 插件 引入全部图标
import icons from '@/plugins/icons.js'

const app = createApp(App)
app
.use(store)
.use(router)
.use(icons)
.mount('#app')
