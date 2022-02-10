/**
 * @Description  : file comments
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-18 15:06:51
 * @LastEditors  : wy
 * @LastEditTime : 2022-02-10 16:44:22
 * @FilePath     : \\src\\utils\\timeFormatter.js
 * @加油
 */
export default (date, rule) => {
  let fmt = rule || 'YYYY-MM-DD hh:mm:ss'
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, date.getFullYear())
  }
  const o = {
    // 'y+': date.getFullYear(),
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const val = o[k] + ''
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? val : ('00' + val).substr(val.length)
      )
    }
  }
  return fmt
}