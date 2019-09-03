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
