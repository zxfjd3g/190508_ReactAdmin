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