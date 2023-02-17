import Vue from 'vue'
import store from './store'
import App from './App'
import mixin from 'js_sdk/tools/share.js'
import {showLoading, hideLoading} from 'js_sdk/tools/tool.js'




import Json from './Json' //测试用数据

Vue.config.productionTip = false


//每日抽奖
import draw from './pages/draw/index.vue'
Vue.component('draw', draw);

//会员
import member from './pages/member/center.vue'
Vue.component('member', member);

//积分商城
import basics from './pages/basics/index.vue'
Vue.component('basics', basics);

//首页
import user from './pages/user/user.vue'
Vue.component('user',user);


//商城js
/**
 *  因工具函数属于公司资产, 所以直接在Vue实例挂载几个常用的函数
 *  所有测试用数据均存放于根目录json.js
 *  
 *  css部分使用了App.vue下的全局样式和iconfont图标，有需要图标库的可以留言。
 *  示例使用了uni.scss下的变量, 除变量外已尽量移除特有语法,可直接替换为其他预处理器使用
 */
const msg = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
const json = type=>{
	//模拟异步请求数据
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Json[type]);
		}, 500)
	})
}

const prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}

import { http } from '@/js_sdk/luch-request/index.js' // 全局挂载引入，配置相关在该index.js文件里修改

Vue.config.productionTip = false
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$tool = {showLoading, hideLoading};
Vue.prototype.$api = {msg, json, prePage};
Vue.prototype.mapSecret = '0cc44eb70a945ab36ee445909dac6536';
Vue.prototype.$http = http
// Vue.prototype.httpUrl = 'http://www.lite_app.com'

//分享
Vue.mixin(mixin)


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
