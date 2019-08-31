/* 
包含n个接口请求函数
函数的返回值是promise
根据API文档编写(必须具备这个能力)
*/
import ajax from './ajax'

/* 
登陆
*/
export const reqLogin = (username, password) => ajax({
  method: 'POST',
  url: '/login',
  data: {username, password}
})
