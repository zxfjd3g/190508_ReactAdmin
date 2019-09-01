import storageUtils from './storageUtils'

/* 
在内存存储数据的工具对象
*/
export default {
  // 存储当前登陆用户
  user: storageUtils.getUser() // 多次读取, 会读多次local
}
