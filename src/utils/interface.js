import request from './request'

// 获取服务端战争数据集数据
export const getDataList = () => request.get('/getDataList')
// 获取服务端医药数据集数据
export const getDataList1 = () => request.get('/getDataList1')
// 获取服务端数据交易所数据集数据
export const getDataList2 = () => request.get('/getDataList2')

// 发送
export const sendEvent = (data) => {
  console.log(data)
  return request.post('/sendEvent', data)
}

// 表征融合 图片检索接口
export const searchPicture = (data) => {
  return request.post('/search', data)
}
export const upload = (data) => {
  console.log("data", data)
  return request.post('/uploadImage', data)
}
export const sendMultiData = (data) => {
  return request.post('/sendMultiData', data)
}
// 关系抽取接口
export const sendTextRelation = (data) => {
  return request.post('/process', data)
}
