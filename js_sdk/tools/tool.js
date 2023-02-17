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

// const httpUrl = 'http://www.litead.com'
const httpUrl = 'https://wqwangwangwang.mynatapp.cc';



const showLoading = (message) => {
  if (wx.showLoading) {
    // 基础库 1.1.0 微信6.5.6版本开始支持，低版本需做兼容处理
    wx.showLoading({
      title: message,
      mask: true
    });
  } else {
    // 低版本采用Toast兼容处理并将时间设为20秒以免自动消失
    wx.showToast({
      title: message,
      icon: 'loading',
      mask: true,
      duration: 20000
    });
  }
}
 
const hideLoading = () => {
  if (wx.hideLoading) {
    // 基础库 1.1.0 微信6.5.6版本开始支持，低版本需做兼容处理
    wx.hideLoading();
  } else {
    wx.hideToast();
  }
}

export {
  setTokenStorage,
  getTokenStorage,
  configHandle,
  httpUrl,
  showLoading,
  hideLoading
}
