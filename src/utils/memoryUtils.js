/* 
在内存存储数据的工具对象
*/
const user = JSON.parse(localStorage.getItem('user_key') || '{}')
export default {
  // 存储当前登陆用户
  // user: JSON.parse(localStorage.getItem('user_key') || '{}')  // 多次读取, 会读多次local
  user
}
