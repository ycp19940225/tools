<template>
	<view>
		<view class="top">
			<view class="top_swiper">
				<swiper :swiperList="swiperList"></swiper>
			</view>
			<!-- <view class="title_box">
					<view class="title">
						<text class="tb_title">2019第二届九鼎山百公里全球越野挑战赛</text>
					</view>
					<view class="title_type">
						<text>马拉松</text>
					</view>
				</view> -->
			<view class="title_box">
				<view class="title">
					<text class="tb_title">{{ product.name }}</text>
					<text class="tb_msg">{{ product.desc }}</text>
				</view>
				<!-- <view class="sports_type">
						<view class="sports_type_item">
							<img class="sports_image" src="/static/common/mls.png">
						</view>
						<view class="sports_type_item">
							<text class="type">{{ product.type }}</text>
						</view>
					</view> -->
			</view>
			<view class="activity_date">
				<view class="date_time_box">
					<view class="date_time">
						<text class="doings_date">
							<text>
							</text>
							<text>
								比赛日期
							</text>
						</text>
						<text class="date_time_item">
							{{ product.start_time }}
						</text>
					</view>
				</view>
				<view class="date_finish" v-if="product.status == 1">
					<text>距离{{ product.apply_end_time }}报名截止还有：</text>
					<!-- <text>21天(报名即止)</text> -->
					<text>{{ product.apply_end_time_day }}</text>
				</view>
				<view class="date_finish" v-if="product.status == 0">
					<text>{{ product.apply_start_time }}报名开始</text>
					<!-- <text>21天(报名即止)</text> -->
				</view>
				<view class="date_finish" v-if="product.status == 2">
					<text class="text-bold text-yellow">报名已于{{product.apply_end_time}}结束</text>
					<!-- <text>21天(报名即止)</text> -->
				</view>
			</view>
			<navigator class="location_box" :url="'/pages/map/index?longitude=' + product.longitude + '&latitude='+ product.latitude">
				<view class="loction_left">
					<view>
						<view class="lg text-gray cuIcon-locationfill">
							<text class="location_text">{{ product.place }}</text>
						</view>
					</view>
				</view>
				<view class="loction_right">
					<text class="lg text-gray cuIcon-right"></text>
				</view>
			</navigator>
			<!-- <view class="activity_article">
					<view class="loction_left">
						<view>
							<view class="lg text-gray cuIcon-sort">
								<text class="location_text">赛事文章</text>
							</view>
						</view>
					</view>
					<view class="loction_right">
						<text>为什么要跑?</text>
						<text class="lg text-gray cuIcon-right">
						</text>
					</view>
				</view> -->
			<view class="activity_article" v-if="product.note == null">
				<view class="loction_left">
					<view>
						<view class="lg text-gray cuIcon-notification">
							<text class="notice">{{ product.note }}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="detail">
				<view class="detail_nav">
					<scroll-view scroll-x class="bg-white nav">
						<view class="flex text-center">
							<view class="cu-item flex-sub" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in navList" :key="index"
							 @tap="tabSelect" :data-id="index">
							 <view v-if="item != null">
								 {{ item }}
							 </view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
			<view class="article" v-if="'0' == nav_id">
				<view class="article_dettail">
					<view>
						<u-parse :content="product.content" @preview="preview" @navigate="navigate" />
					</view>
				</view>
			</view>
			<view class="article" v-if="'1' == nav_id">
				<view class="group">
					<view class="group_dettail">
						<text>赛程</text>
						<text>报名费</text>
						<text>状态</text>
					</view>
					<view v-for="item in product.group" :key="item.id" class="group_dettail_item">
						<text>{{ item.name }}</text>
						<text>{{ item.price }}</text>
						<text v-if="item.status > 0">报名</text>
						<text v-else></text>
					</view>
				</view>
				<view>
					<view style="padding: 30rpx;">
						<u-parse :content="product.group_content" @preview="preview" @navigate="navigate" />
					</view>
				</view>
			</view>
			<view class="article" v-if="'package' == nav_id">
				<view class="package_dettail">
					<view class="pay_common" v-for="(item, key) in product.package" :key="key">
						<view class="package_name">
							<text>{{ item.name }}</text>
						</view>
						<view class="package_type">
							<text class="p_tag_color_red">{{ item.room_type.name }}</text>
							<text class="package_type_desc">{{ item.room_type.desc }}</text>
						</view>
						<view class="package_price_box">
							<text class="package_tag">优惠价</text>
							<text class="package_price">￥{{ item.price }}起</text>
							<text class="package_list_price"><text>￥</text><text>{{ item.list_price }}</text></text>
						</view>
						<view class="flex flex-direction">
							<button class="cu-btn bg-cyan margin-tb-sm sub" @tap="showModal(key)">查看详情</button>
						</view>
					</view>
				</view>
			</view>
			<view v-if="'goods' == nav_id">
				<view class="activity_product">
					<view class="product_item" v-for="(item, key) in product.goods" :key="key">
							<view class="product_content" @click="navTo('/pages/product/product?id='+item.id)">
								<view class="product_img">
									<img :src="item.logo" alt="">
								</view>
								<view class="goods_title">
									{{item.title}}
								</view>
								<view class="goods_price">
									<view class="s_pricecurr"><text>￥</text><text>{{item.price_market}}</text></view>
									<view class="s_price">{{item.price_market}}</view>
								</view>
							</view>
						</view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="cu-bar bg-white tabbar border shop">
				<view class="action" @click="goTop">
					<view class="cuIcon-top"></view>
					返回顶部
				</view>
				<view class="action" @click="tip">
					<view class="cuIcon-noticefill">
					</view>
					报名提醒
				</view>
				<button class="action" @click="customerOpen()">
					<view class="cuIcon-service">
					</view>
					客服咨询
				</button>
				<view class="submit bg-red " @click="commit()" v-if="product.status == 1">立即报名</view>
				<view class="bg-gray submit" @click="showTip(0)" v-if="product.status == 0">报名未开始</view>
				<view class="bg-grey submit" @click="showTip(1)" v-if="product.status == 2">报名已结束</view>
			</view>
		</view>
		<view class="cu-modal" :class="customerShow == true ? 'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="action" @tap="hideCustomer">
						<view class="content">客服咨询</view>
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					请添加客服微信：hqpz006
				</view>
			</view>
		</view>
		<view v-for="(item, key) in product.package" :key="key">
			<view class="cu-modal" :class="packageId == key ? 'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">{{item.name}}</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl">
						<u-parse :content="item.description" @preview="preview" @navigate="navigate" />
						<!-- <u-parse :content="product.content" @preview="preview" @navigate="navigate" /> product.package[packageId].description-->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import swiper from '@/components/colorui/components/swiper.vue';
	import uParse from '@/components/gaoyia-parse/parse.vue';
	export default {
		data() {
			return {
				productId: 0,
				customerShow: false,
				swiperList: {},
				product: {},
				title: '',
				TabCur: 0,
				scrollLeft: 0,
				nav_id: 0,
				navList: {"0" : "赛事介绍", "1" : "赛事组别", "package" : "参赛套餐",  "goods" : "可选服务",},
				packageId: null,
				modalName: ''
			}
		},
		components: {
			swiper,
			uParse,
		},
		onShareAppMessage(res) {
			return {
				title: this.product.name,
				path: '/pages/product/index?id=' + this.product.id
			}
		},
		methods: {
			showTip(type){
				
				switch(type){
					case 0:
					    uni.showToast({
					    	title:'活动未开始报名！',
							icon: 'none'
					    })
					break;
					case 1:
					uni.showToast({
						title:'活动报名已结束！',
						icon: 'none'
					})
					break;
				}
			},
			navTo(url) {
				uni.navigateTo({
					url:url
				})
			},
			hideCustomer(e) {
				this.customerShow = false
				console.log(this.packageId)
			},
			customerOpen() {
				this.customerShow = true
			},
			tip() {
				this.$api.msg('暂未开放');
			},
			goTop() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},
			showModal(key) {
				console.log(key)
				this.packageId = key
			},
			hideModal(e) {
				this.packageId = null
				console.log(this.packageId)
			},
			preview(src, e) {
				// do something
			},
			navigate(href, e) {
				// do something
			},
			tabSelect(e) {
				this.nav_id = this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60

			},
			commit() {
				let product_id = this.product.id;
				uni.navigateTo({
					url: '/pages/commit/index?product_id=' + product_id,
				});
			},
			getProduct(id) {
				var _this = this;
				uni.showLoading({
				    title: '加载中',
					mask:true
				});
				this.$http.post('/api/activity/detail', {
					"id": id
				}).then(res => {
					var data = res.data.data
					if (res.data.code != 1) {
						uni.showToast({
							title: res.data.info,
							icon: 'none'
						});
					} else {
						console.log(res)
						_this.swiperList = data.image;
						_this.product = data;
						if (data.package.length == 0) {
							// _this.navList.splice(2, 1);
							delete _this.navList.package
							console.log(_this.navList)
						}
						if (_this.product.isCate) {
							// （准备资料）（签证名额）（签证类别）
							_this.navList = ['准备资料', '签证名额', '签证类别'];
						}
						 uni.hideLoading();
						// console.log(data.package.length)
					}
				}).catch(err => {
					console.log(err);
					uni.showToast({
						title: '网络错误！',
						icon: 'none'
					});
					uni.hideLoading();
				})
				// uni.hideLoading();
				// uni.request({
				// 	url: _this.httpUrl + '/api/activity/detail',
				// 	header: {
				// 		'content-type': 'application/x-www-form-urlencoded',
				// 	},
				// 	data: {
				// 		"id": id
				// 	},
				// 	method: 'POST',
				// 	dataType: 'json',
				// 	success: (res) => {
				// 		var data = res.data.data
				// 		if (res.data.code != 1) {
				// 			uni.showToast({
				// 				title: res.data.info,
				// 				icon: 'none'
				// 			});
				// 		} else {
				// 			console.log(res)
				// 			_this.swiperList = data.image;
				// 			_this.product = data;
				// 			if (data.package.length == 0) {
				// 				_this.navList.splice(2, 1)
				// 			}
				// 			console.log(data.package.length)
				// 		}
				// 	}
				// });
			},
			//获取页面数据
			getPageData: function(id) {
				var _this = this;
				_this.getProduct(id);
			},
		},
		onLoad: function(option) {
			// option.id = 8;
			this.getPageData(option.id);
		},
	}
</script>
<style scoped>
	.padding-xl {
		text-align: left;
	}

	.uni-popup_box {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		background-color: #fff;
		padding: 4px 8px;
	}

	.package_type_desc {
		margin-left: 0.5em;
		font-size: 0.8rem;
		color: #555555;
	}

	.package_list_price>text:nth-child(2) {
		font-size: 1rem;
		float: left;
		margin-top: 0.14rem;
		text-decoration: line-through;
	}

	.package_list_price>text:nth-child(1) {
		font-size: 0.8rem;
		float: left;
		margin-top: 0.35rem;
		margin-right: -0.14rem;
		text-decoration: line-through;
	}

	.package_list_price {
		overflow: hidden;
		font-family: arial;
		color: #CCCCCC;
		margin-left: 0.2857142857142857rem;
	}

	.package_price {
		overflow: hidden;
		font-family: arial;
		color: #fc8726;
	}

	.package_tag {
		padding: 0;
		height: 1rem;
		line-height: 1rem;
		font-size: 0.64rem;
		color: #FFFFFF;
		background: #fc8726;
		border-radius: 0.14rem;
		margin-right: 0.28rem;
	}

	.package_price_box {
		display: flex;
		justify-content: center;
		height: 2.9rem;
		margin-top: 0;
		background: #f2f7ff;
		border: 1px solid #f7f7f7;
		border-top: none;
		border-radius: 0 0 0.14rem 0.14rem;
		box-sizing: border-box;
		align-items: center;
	}

	.p_tag_color_red {
		border: 1px solid #f26163;
		color: #f26163;
	}

	.p_tag>text:nth-child(1) {
		height: 0.9rem;
		line-height: 0.78rem;
		font-size: 0.6rem;
		border-radius: 1px;
		padding: 0 0.14rem;
	}

	.package_type {
		min-height: 120rpx;
		padding: 0.7rem 0.7rem 0.35rem 0.7rem;
	}

	.tagbox_pb {
		padding: 0.7rem 0.7rem 0.31rem 0.7rem;
	}

	.pay_common {
		display: flex;
		flex-direction: column;
		/* min-height: 10em; */
	}

	.package_name {
		background: #4674C1;
		padding: 0.6rem 0.7rem;
		min-height: 150rpx;
	}

	.package_name>text:nth-child(1) {
		font-size: 1rem;
		line-height: 1.2rem;
		color: #FFFFFF;
		text-align: center;
		border-radius: 2px 2px 0 0;
	}

	.package_dettail {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-around
	}

	.pay_common {
		width: 45%;
		border-radius: 0.14rem;
		margin-top: 1.4rem;
		box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
	}

	.group {
		margin: 1em 1em;
		border: 1px solid #ddd;
	}

	.group_dettail_item {
		margin: 0.5em 0.5em;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #8892a2;
		line-height: 2.4rem;
	}

	.group_dettail {
		padding: 1em;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #f7fbff;
		color: #8892a2;
		line-height: 2.4rem;
	}

	.article_dettail {
		background-color: #FFFFFF;
		margin: 30rpx;
	}

	.article {
		background-color: #FFFFFF;
		margin: 20rpx;
	}

	.s_price {
		font-size: 0.8rem;
		color: #CCCCCC;
		text-decoration: line-through;
		margin-left: 0.2rem;
	}

	.s_pricecurr text:nth-child(2) {
		color: #eb2b2b;
		font-weight: bold;
		font-size: 1.1rem;
	}

	.s_pricecurr text:nth-child(1) {
		color: #eb2b2b;
		font-weight: bold;
	}

	.goods_price {
		display: flex;
		padding: 4px 8px;
		flex-direction: row;
		align-items: center;
	}

	.goods_title {
		padding: 4px 12px;
	}

	.product_img image {
		width: 100%;
		height: 12em;
	}

	.product_content {
		background-color: white;
		margin: 1px 2px;
	}

	.product_item {
		width: 50%;
		/* height: 15vh; */
		/* background-color: white;	 */
	}

	.activity_product {
		display: flex;
		flex-direction: row;
		padding: 2px 4px;
		width: 100%;
		flex-wrap: wrap;
	}

	.submit {
		background-color: #4674c1;
		line-height: 3.5rem;
		font-size: 1.1rem;
	}

	.bottom {
		position: fixed;
		bottom: 0;
		width: 100%;
	}

	.text-blue,
	.line-blue,
	.lines-blue {
		color: #4674C1;
	}

	.detail_nav {
		border-top: #4674C1 2px solid;
	}

	.detail {
		margin-top: 0.5em;
	}

	.cuIcon-notification {
		font-size: 1.1em;
		;
		color: #333333;
	}

	.notice {
		padding-left: 0.8em;
		font-size: 0.9em;
	}

	.loction_right text:nth-child(1) {
		color: #999999;
		/* margin-right: 10px; */
	}

	.cuIcon-sort {
		font-size: 1rem;
		color: #333333;
	}

	.activity_article {
		display: flex;
		margin-top: 0.5em;
		height: 8vh;
		background-color: #FFFFFF;
		border-bottom: solid 1px rgb(246, 246, 246);
		justify-content: space-between;
		/* 相对父元素水平居中 */
		align-items: center;
		/*垂直居中*/
		padding: 8px 16px;
	}

	.cuIcon-locationfill {
		font-size: 1rem;
		color: #333333;
	}

	.location_text {
		padding-left: 0.8em;
		font-size: 1em;
		font-family: arial;
		color: #333333;
		line-height: 1rem;
	}

	.location_box {
		display: flex;
		height: 8vh;
		background-color: #FFFFFF;
		border-bottom: solid 1px rgb(246, 246, 246);
		justify-content: space-between;
		/* 相对父元素水平居中 */
		align-items: center;
		/*垂直居中*/
		padding: 8px 16px;
	}

	.date_finish {
		padding-bottom: 0.8em;
	}

	.date_finish text:nth-child(1) {
		font-size: 0.7rem;
		color: #555555;
		margin-top: 0.5rem;
		line-height: 1rem;
	}

	.date_finish text:nth-child(2) {
		font-size: 1rem;
		color: #222222;
		font-weight: bold;
		font-family: arial;
	}


	.date_time text:nth-child(1) {
		color: #777777;
		font-size: 0.7rem;
	}

	.date {
		width: 15px;
		height: 15px;
	}

	.date_time_box {
		display: flex;
		width: 40%;
	}

	.date_finish {
		display: flex;
		flex-direction: column;
		width: 60%;
		justify-content: center;
		/* 相对父元素水平居中 */
		align-items: center;
		/*垂直居中*/
	}

	.date_time {
		display: flex;
		flex-direction: column;
		width: 100%;
		justify-content: center;
		/* 相对父元素水平居中 */
		align-items: center;
		/*垂直居中*/
		background-color: #f7faff;
		margin: 8px 16px;
	}

	.activity_date {
		display: flex;
		flex-direction: row;
		background-color: #FFFFFF;
		height: 11vh;
		border-bottom: solid 1px rgb(246, 246, 246);
	}

	.type {
		font-size: 0.6rem;
		color: #B2B2B2;
	}

	.title_type {}

	.sports_image {
		margin: 0 auto;
		width: 34px;
		height: 36px;
	}

	.sports_type {
		display: flex;
		flex-direction: column;
		/* 子元素横向排列 */
		justify-content: center;
		/* 相对父元素水平居中 */
		align-items: center;
		/*垂直居中*/
		width: 23%;
	}

	.top {
		display: flex;
		flex-direction: column;
		/* margin-bottom: 40vh; */
		padding-bottom: 10vh;
	}

	.top_swiper {
		height: 30vh;
	}

	/deep/ .screen-swiper {
		height: 30vh;
	}

	.top_swiper {
		height: 30vh;
	}

	.title {
		display: flex;
		flex-direction: column;
		width: 77%;
		border-right: rgb(246, 246, 246) 1px solid;
	}

	.title_box {
		display: flex;
		height: 12vh;
		overflow: hidden;
		background: #FFFFFF;
		padding: 0 0 0 1.071428571428571rem;
		border-bottom: solid 1px rgb(246, 246, 246);
	}

	.tb_title {
		font-size: 1.2em;
		color: #333333;
		font-weight: bold;
		line-height: 1.5rem;
		margin-top: 0.8em;
	}

	.tb_msg {
		font-size: 0.7rem;
		color: #B2B2B2;
		line-height: 1.2rem;
		margin-top: 0.2rem;
		overflow: hidden;
		position: relative;
		overflow: hidden;
	}
</style>
