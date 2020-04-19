import {request} from './request'

// 额外封装一个home请求方便管理和逻辑清晰，如果都放在组件内代码多了就乱了
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

// 封装一个请求首页下面商品列表
// export function getGoods(type, page) {
//   return request({
//     url:'/home/data',
//     params:{
//       type,
//       page
//     }
//   })
// }