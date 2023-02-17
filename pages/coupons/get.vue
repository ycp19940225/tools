<template>
	<view>
		<view style="margin: 1em;background-color: rgb(74, 122, 202);height: 35vh;">
			<div style="text-align: center;padding:1em; align-items: center;">
				<text class="yticon icon-iconfontweixin" style="color: #b2dfff;"></text><text class="" style="color: #b2dfff;margin-left: 1em;font-size: 16px;">当前余额(元)</text>
			</div>
			<div style="text-align: center;padding:1em; align-items: center;">
				<text style="font-size: 4em;color: #FFFFFF;">{{balance}}</text>
			</div>
			<view style="display: flex;flex-direction: row;justify-content: center;">
				<div class="cu-form-group" style="background-color: rgb(74, 122, 202);">
					<button type="primary" @click="top_up()">充值</button>
				</div>
				<!-- <view style="background-color: rgb(74, 122, 202); padding: 1upx 30upx;display: flex;align-items: center;min-height: 100upx;">
					<text style="color: #b2dfff;text-decoration: underline">充值记录</text>
				</view> -->
			</view>
		</view>
		<view style="margin: 1em;">
			<view style="background-color: #ddd;padding: 1em;">
				充值记录
			</view>
			<view class="cu-form-group">
				<!-- <view class="title">编号</view> -->
				<view class="title">方式</view>
				<view class="title">时间</view>
				<view class="title">金额</view>
			</view>
			<view class="cu-form-group" v-for="(item,index) in record" :key="index">
				<!-- <view class="title">{{item.order_sn}}</view> -->
				<view class="title">{{item.source_type}}</view>
				<view class="title">{{item.create_time}}</view>
				<view class="title">{{item.total_price}}</view>
			</view>
		</view>
		<view style="margin: 1em;">
			<view style="background-color: #ddd;padding: 1em;">
				输入优惠券码兑换优惠券
			</view>
			<view class="cu-form-group">
				<view class="title">优惠券码</view>
				<input placeholder="输入优惠券码" name="input" @input="getCode"></input>
				<button class='cu-btn bg-green shadow' @click="commit()">立即兑换</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				code : '',
				balance: '0.00',
				record:[]
			};
		},
		onLoad(option) {
			console.log(option)
			let _this = this;
			this.TowerSwiper('swiperList');
			_this.getPageData(option);
		},
		methods: {
			getPageData(){
				var _this = this;
				let data = {
					'coupons_code' : _this.code
				};
				_this.$http.post('/api/card/getAmount', data).then(res => {
					console.log(res)
					if (res.data.code != 1) {
						uni.showToast({
							title: res.data.info,
							icon: 'none'
						});
					} else {
						var data = res.data.data
						_this.balance = data.amount
						_this.record = data.record
					}
				}).catch(err => {
					console.log(err);
				})
			},
			top_up(){
				uni.navigateTo({
					url: '/pages/money/card_pay'
				})
			},
			getCode(e){
				this.code = e.detail.value
			},
			//立即报名
			commit(e) {
				// console.log(e)
				var _this = this;
				let data = {
					'coupons_code' : _this.code
				};
				_this.$http.post('/api/coupons/get', data).then(res => {
					console.log(res)
					if (res.data.code != 1) {
						uni.showToast({
							title: res.data.info,
							icon: 'none'
						});
					} else {
						var orderId = res.data.data
						uni.showToast({
							title: res.data.info,
							icon: 'success'
						});
						setTimeout(function() {
							uni.redirectTo({
								url: '/pages/coupons/list'
							})
						}, 2000)
					}
				}).catch(err => {
					console.log(err);
				})
			}
			}
	}
</script>

<style>
</style>
