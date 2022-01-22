/**
 * @Description  : 校验表单
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-17 16:21:32
 * @LastEditors  : wy
 * @LastEditTime : 2022-01-18 14:17:49
 * @FilePath     : \\src\\hooks\\useValidate.js
 * @加油
 */
export default () => {
  // 验证表单
  /**
   * @description: function comments
   * @param {formRef} 表单ref
   * @return {type}
   */
  const validateForm = (formRef) => {
    let res = null
    formRef.validate((isValid) => {
      res = isValid
    })
    return res
  }

  return {
    validateForm
  }
}
