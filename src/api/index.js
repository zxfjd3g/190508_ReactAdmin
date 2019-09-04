/* 
包含n个接口请求函数
函数的返回值是promise
根据API文档编写(必须具备这个能力)
*/
import jsonp from 'jsonp'
import ajax from './ajax'
import { message } from 'antd'

/* 
登陆
*/
export const reqLogin = (username, password) => ajax({
  method: 'POST',
  url: '/login',
  data: {username, password}
})


/* 
获取天气信息
*/
export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url, {}, (err, data) => {
      // 如果请求成功
      if (!err && data.status==='success') {
        const {dayPictureUrl, weather} = data.results[0].weather_data[0]
        resolve({dayPictureUrl, weather})
      } else {
        // reject()
        message.error('获取天气失败!')
      }
    })
  })
  
}

/* 
获取分类列表
*/
export const reqCategorys = () => ajax({
  url: '/manage/category/list',
})

/* 
添加分类
*/
export const reqAddCategory = (categoryName) => ajax({
  url: '/manage/category/add',
  method: 'POST',
  data: {categoryName}
})
// ajax.post('/manage/category/add', {categoryName})

/* 
更新分类
*/
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax.post(
  '/manage/category/update',
  {categoryId, categoryName}
)

/* 
获取商品分页列表
*/
export const reqProducts = (pageNum, pageSize) => ajax.get(
  '/manage/product/list',
  {
    params: {
      pageNum,
      pageSize
    }
  }
)

/* 
进行商品搜索分页
searchType: 'productName' 或者 'productDesc'
*/
export const reqSearchProducts = ({pageNum, pageSize, searchType, searchName}) => ajax.get(
  '/manage/product/search',
  {
    params: {
      pageNum,
      pageSize,
      [searchType]: searchName
    }
  }
)

/* 
对商品进行上架/下架处理
*/
export const reqUpdateStatus = (productId, status) => ajax.post(
  '/manage/product/updateStatus',
  {productId, status}
)


/* 
根据商品ID获取商品
*/
export const reqProduct = (productId) => ajax({
  url: '/manage/product/info',
  params: {
    productId
  }
})

/* 
根据分类ID获取分类
*/
export const reqCategory = (categoryId) => ajax({
  url: '/manage/category/info',
  params: {
    categoryId
  }
})

/* 
删除图片
*/
export const reqDeleteImg = (name) => ajax({
  url: '/manage/img/delete',
  method: 'POST',
  data: {
    name
  }
})

/* 
添加或更新商品
*/
export const addOrUpdateProduct = (product) => ajax({
  url: '/manage/product/' + (product._id ? 'update' : 'add'),
  method: "POST",
  data: product
})

// 获取所有角色的列表
export const reqRoles = () => ajax('/manage/role/list')
// 添加角色
export const reqAddRole = (roleName) => ajax.post('/manage/role/add', {roleName})
// 添加角色
export const reqUpdateRole = (role) => ajax.post('/manage/role/update', role)


// 获取所有用户的列表
export const reqUsers = () => ajax('/manage/user/list')
// 删除指定用户
export const reqDeleteUser = (userId) => ajax.post('/manage/user/delete', {userId})
// 添加/更新用户
export const reqAddOrUpdateUser = (user) => ajax.post('/manage/user/'+(user._id ? 'update' : 'add'), user)

