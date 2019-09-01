/* 
通过localStorage来管理(保存/读取/删除)数据
*/
import store from 'store'

const USER_KEY = 'user_key'

export default {
  saveUser (user) {
    // localStorage.setItem('user_key', JSON.stringify(user))
    store.set(USER_KEY, user)
  },

  getUser () {
    // return JSON.parse(localStorage.getItem('user_key') || '{}')
    return store.get(USER_KEY) || {}
  },

  removeUser () {
    // localStorage.removeItem('user_key')
    store.remove(USER_KEY)
  }
}