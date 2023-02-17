// 设置储存token
const setTokenStorage = (token) => {
  uni.setStorageSync('am_token', token)
}

// 获取token
const getTokenStorage = () => {
  let token = ''
  try {
    token = uni.getStorageSync('am_token')
  } catch (e) {
  }
  return token
}

// 重新整理一下config
const configHandle = (config) => {
  config.header = {
    ...config.header,
    token: getTokenStorage() // token 特殊处理，主要是header有可能使用的是局部配置
  }
  return config
}

// const httpUrl = 'http://www.lite_app.com'
// const httpUrl = 'http://www.liteapp.com'
// const httpUrl = 'https://www.huanqiupaozhe.cn'
const httpUrl = 'https://www.caucasuseducation.cn';

export {
  setTokenStorage,
  getTokenStorage,
  configHandle,
  httpUrl
}
