/**
 * @Description  : file comments
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-23 20:15:55
 * @LastEditors  : wy
 * @LastEditTime : 2022-01-26 15:05:51
 * @FilePath     : \\src\\plugins\\icons.js
 * @加油
 */
import * as Icons from '@element-plus/icons-vue'
export const IconList = [] // 供编辑菜单时选择
export default {
  install: (app) => {
    for (const key in Icons) {
      app.component(key, Icons[key])
      IconList.push({ value: key })
    }
  }
}
