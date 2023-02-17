import Request from './request'

import {
	setTokenStorage,
	getTokenStorage,
	configHandle,
	httpUrl
} from '@/js_sdk/tools/tool.js'


// XXX 重新创建一个示例，可根据自身逻辑决定是否需要重新创建一个示例
const reReqest = new Request()
reReqest.setConfig(config => {
	// config.baseUrl = 'http://www.lite_app.com' /* 根域名不同 */
	// config.baseUrl = 'http://www.liteapp.com' /* 根域名不同 */
	// config.baseUrl = 'http://47.92.91.243' /* 根域名不同 */
	config.baseUrl = httpUrl /* 根域名不同 */
	return config
})

const http = new Request()

http.setConfig((config) => { /* 设置全局配置 */
	config.baseUrl = httpUrl /* 根域名不同 */
	// config.baseUrl = 'http://47.92.91.243' /* 根域名不同 */
	// config.baseUrl = 'http://www.lite_app.com' /* 根域名不同 */
	// config.baseUrl = 'http://www.liteapp.com' /* 根域名不同 */
	config.header = {
		...config.header
	}
	return config
})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
http.validateStatus = (statusCode) => {
	return statusCode === 200
}

http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
	config.header = {
		...config.header
	}
	try {
		let token = uni.getStorageSync('userInfo');
		if (token) {
			config.header.token = token
		}
	} catch (e) {
		// error
		console.log(1, e)
	}
	
	
	return config
})

//刷新token
async function refreshToken() {
	let token = uni.getStorageSync('userInfo');
	return new Promise(resolve => {
		uni.request({
			url: httpUrl + '/api/auth/refreshToken',
			data: {
				'refresh_token': token.refresh_token
			},
			success: (res) => {
				var newToken = res.data.data
				if (res.data.code != 1) {
					// uni.showToast({
					// 	title: res.data.info,
					// 	icon: 'none'
					// });
					resolve(false);
				} else {
					let provider = {
						'refresh_token': token.refresh_token,
						'access_token': newToken
					}
					try {
					    uni.setStorageSync('userInfo', provider);
						resolve(true);
					} catch (e) {
					    // error
					}
				}
			}
		});
	})
}

async function wxLogin() {
	return new Promise(resolve => {
		uni.login({
			provider: 'weixin',
			success: function(loginRes) {
				if (loginRes.errMsg == 'login:ok') {
					resolve(loginRes);
				}
			}
		});

	})
}

async function getAuth(loginRes) {
	return new Promise(resolve => {
		if (loginRes.errMsg == 'login:ok') {
			let code = loginRes.code;
			uni.request({
				url: httpUrl + '/api/auth/index',
				data: {
					'code': code
				},
				success: (res) => {
					var token = res.data.data
					if (res.data.code != 1) {
						uni.showToast({
							title: res.data.info,
							icon: 'none'
						});
					} else {
						uni.setStorage({ //缓存用户登陆状态
							key: 'userInfo',
							data: token
						})
						console.log('重新登录成功！')
						resolve(loginRes);
					}
				}
			});
		}
	});
}

http.interceptor.response(async (response) => { /* 请求之后拦截器 */
	if (response.data.code == -99) { // 服务端返回的状态码不等于200，则reject()
		let getTokenResult = await refreshToken()
		if (getTokenResult == false) {
			let _this = this;
			let loginRes = await wxLogin();
			let authRes = await getAuth(loginRes)
			getTokenResult = true
		}
		if (getTokenResult == true) { // 获取新的token成功
			const repeatRes = await reReqest.request(configHandle(response.config)) // XXX 可根据自身逻辑决定是否需要重新创建一个示例
			if (repeatRes) {
				response = repeatRes
			}
		}
	}
	return response
}, (response) => { // 请求错误做点什么
	return response
})

export {
	http
}
