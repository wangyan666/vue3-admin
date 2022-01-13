/**
 * @Description  : file comments
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-13 12:48:07
 * @LastEditors  : wy
 * @LastEditTime : 2022-01-13 13:41:34
 * @FilePath     : \\src\\views\\login\\composibles\\useValidate.js
 * @加油
 */
import { login } from '@/api/user'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../../store/user'

export default () => {
  // 验证表单并登录
  const router = useRouter()
  const userStore = useUserStore()

  const submitForm = (formRef, form) => {
    formRef.validate((isValid) => {
      if (isValid) {
        login(form).then((res) => {
          router.push('/welcome')
          userStore.$patch((state) => {
            state.userInfo = res.data
          })
        })
      } else {
        return false
      }
    })
  }

  return {
    submitForm
  }
}
