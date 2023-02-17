<template>
	<view class="coupon_box">
		<view class="other_type">
			<view class="text"><span>可领取优惠券</span></view>
		</view>
		<view v-for="(item, index) in coupon" :key="index" class="coupon-box bg-gray">
			<view class="coupon-item">
				<view class="coupon-detail bg-white">
					<view class="flex  align-center">
						<view v-if="item.type == 1" class="padding">
							<view class="tit">名称：{{item.name}}</view>
							<view class="nick">卷码：{{item.coupons_code}}</view>
							<view class="nick">使用场景：{{item.use_type}}</view>
							<view class="end_time" v-if="item.limit_use_type == 1">有效期:{{item.use_start_time}}至{{item.use_end_time}}</view>
							<view class="end_time" v-if="item.limit_use_type == 2">有效期:领取{{item.limit_use_day}}天内有效</view>
							<view class="end_time" v-if="item.limit_use_type == 3">无限制</view>
							<view class="tit">指定产品：{{item.product_id}}</view>
						</view>
						<view v-if="item.type == 2" class="padding">
							<view class="tit">名称：{{item.name}}</view>
							<view class="nick">卷码：{{item.coupons_code}}</view>
							<view class="nick">使用场景：{{item.use_type}}</view>
							<view class="end_time" v-if="item.limit_use_type == 1">有效期:{{item.use_start_time}}至{{item.use_end_time}}</view>
							<view class="end_time" v-if="item.limit_use_type == 2">有效期:领取{{item.limit_use_day}}天内有效</view>
							<view class="end_time" v-if="item.limit_use_type == 3">无限制</view>
							<view class="tit">指定产品：{{item.product_id}}</view>
						</view>
						<view v-if="item.type == 3" class="padding">
							<view class="tit">名称：{{item.name}}</view>
							<view class="nick">卷码：{{item.coupons_code}}</view>
							<view class="nick">使用场景：{{item.use_type}}</view>
							<view class="end_time" v-if="item.limit_use_type == 1">有效期:{{item.use_start_time}}至{{item.use_end_time}}</view>
							<view class="end_time" v-if="item.limit_use_type == 2">有效期:领取{{item.limit_use_day}}天内有效</view>
							<view class="end_time" v-if="item.limit_use_type == 3">无限制</view>
							<view class="tit">指定产品：{{item.product_id}}</view>
						</view>
					</view>
				</view>
				<view class="coupon-money padding light bg-red ">
					<view class="flex flex-direction justify-center">
						<view v-if="item.type == 1">
							<view class="solid-bottom text-xxl">
								<view class="text-red text-center" style="font-size:1em;">{{item.discount/10}}折</view>
							</view>
							<view class="solid-bottom text-sm padding text-center" v-if="item.discount_value != -1 && item.discount_value > 0">
								<text class="text-red">满{{item.discount_value}}可用</text>
							</view>
							<view class="solid-bottom text-sm padding text-center" v-else>
								<text class="text-red">无门槛</text>
							</view>
						</view>
						<view v-if="item.type == 2">
							<view class="solid-bottom text-xxl">
								<view class="text-price text-red text-center">{{item.reduction}}</view>
							</view>
							<view class="solid-bottom text-sm padding text-center" v-if="item.meet_value != -1 && item.reduction > 0">
								<text class="text-red">满{{item.meet_value}}可用</text>
							</view>
							<view class="solid-bottom text-sm padding text-center" v-else>
								<text class="text-red">无门槛</text>
							</view>
						</view>
						<view v-if="item.type == 3">
							<view class="solid-bottom text-xxl">
								<view class="text-price text-red text-center">{{item.amount}}</view>
							</view>
							<view class="solid-bottom text-sm padding text-center" >
								<text class="text-red">无门槛</text>
							</view>
						</view>
						<view class="cu-btn bg-red sm shadow padding-sm round" @click="getCoupons(item.id)" v-if="item.get_status == true">
							立即领取
						</view>
						<view class="cu-btn bg-red sm shadow padding-sm round" @click="goProduct(item.use_type)" v-else>
							立即使用
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				coupon: [{
						url: "/pages/brand/index/id/1",
						money: "150",
						title: "满2000减150元",
						ticket: "YMC_5c929fbf47235",
						seller_name: "百达翡丽官方旗舰店",
						end_time: "2019-04-20 01:51:20",
						state: "1"
					},
					{
						url: "/pages/brand/index/id/1",
						money: "50",
						title: "满1000减50元",
						ticket: "YMC_5c929fbf47235",
						seller_name: "百达翡丽官方旗舰店",
						end_time: "2019-04-20 01:51:20",
						state: "1"
					}
				]
			}
		},
		onLoad() {
			this.getPageData()
		},
		methods: {
			goProduct(type){
				console.log(type)
				if(type == '报名'){
					uni.redirectTo({
						'url':'/pages/search/select'
					})
				}else{
					uni.redirectTo({
						'url':'/pages/category/category'
					})
				}
			},
			getCoupons(code) {
				var _this = this;
				let data = {
					code: code
				};
				this.$http.post('/api/coupons/get', data).then(res => {
					if (res.data.code != 1) {
						uni.showToast({
							title: res.data.info,
							icon: 'none'
						});
					} else {
						uni.showToast({
							title: res.data.info,
							icon: 'none'
						});
						var data = res.data.data
					}
				}).catch(err => {
					console.log(err);
				})
			},
			getPageData() {
				var _this = this;
				this.$http.post('/api/coupons/send', {}).then(res => {
					if (res.data.code != 1) {
						uni.showToast({
							title: res.data.info,
							icon: 'none'
						});
					} else {
						var data = res.data.data
						_this.coupon = data
					}
				}).catch(err => {
					console.log(err);
				})
			},
		}
	}
</script>

<style lang='scss'>
	.coupon-box {
		padding: 1em;
	}

	.coupon-item {
		display: flex;
		flex-direction: row;
	}

	.coupon-detail {
		flex: 5;
		padding: 4px;
	}

	.coupon-money {
		flex: 2;
	}

	page {
		background: #FFFFFF;
	}

	.coupon_box {
		width: 100%;
		height: auto;
		display: table;
		/* padding: 6upx 26upx 26upx 26upx; */
	}

	.other_type {
		width: 100%;
		height: 90upx;
		padding-top: 50upx;

		.text {
			width: 100%;
			border-top: 1px solid #eeeeee;
			display: block;
			text-align: center;
			position: relative;
		}

		.text span {
			width: 180upx;
			height: 40upx;
			line-height: 40upx;
			color: #999999;
			display: block;
			background: #ffffff;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-left: -90upx;
			margin-top: -20upx;
		}
	}
</style>
