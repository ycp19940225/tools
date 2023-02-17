<template>
	<view>
		<swiper class="card-swiper" :class="'square-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="false" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
		 indicator-active-color="#0081ff">
			<swiper-item v-for="(item,index) in swiperList" :key="item">
				<view class="swiper-item">
					<image :src="item.url" mode="aspectFill"></image>
				</view>
			</swiper-item>
		</swiper>
		<view style="margin: 0.5em;">
			<view style="background-color: #ddd;padding: 1em;">
				{{show_title}}会员特权
			</view>
			<view class="cu-form-group" v-for="(item,index) in priAllData" :key="index">
				<view class="title">{{item.title}}</view>
				<switch class='green radius' @change="SwitchD"  :checked="item.checked != undefined && item.checked == true" disabled=""></switch>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		httpUrl
	} from '@/js_sdk/tools/tool.js'
	export default {
		components: {},
		data() {
			return {
				show_title: '',
				balance: '0.00',
				record: [],
				userInfo:{},
				swiperList: [{
					id: 2,
					url: httpUrl + '/static/common_file/images/level_a_h.png'
				}, {
					id: 3,
					url:  httpUrl + '/static/common_file/images/level_b_l.png',
				}, {
					id: 4,
					url: httpUrl + '/static/common_file/images/level_c_l.png'
				}, {
					id: 5,
					url: httpUrl + '/static/common_file/images/level_d_l.png'
				}],
				dotStyle: true,
				towerStart: 0,
				direction: '',
				priAllData:{},
				array:[],
				key:0
			};
		},
		onLoad(option) {
			console.log(option)
			let _this = this;
			_this.getPageData(option);
		},
		methods: {
			getPageData() {
				var _this = this;
				let data = {
					'coupons_code': _this.code
				};
				uni.showLoading({
					title:"加载中..."
				})
				_this.$http.post('/api/score/getData', data).then(res => {
					console.log(res)
					if (res.data.code != 1) {
						uni.showToast({
							title: res.data.info,
							icon: 'none'
						});
					} else {
						var data = res.data.data
						_this.userInfo = data.userInfo
						_this.priAllData = data.priAllData
						_this.levelData = data.levelData;
						_this.show_title = _this.levelData[0].show_title
						_this.array = data.array;
						_this.record = data.record;
						_this.getChecked()
					}
					uni.hideLoading();
				}).catch(err => {
					console.log(err);
				})
				uni.hideLoading();
			},
			//立即报名
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			// cardSwiper
			cardSwiper(e) {
				let _this = this;
				_this.key = e.detail.current;
				_this.getChecked()
			},
			getChecked(){
				let _this = this;
				//会员等级显示
				_this.show_title = _this.levelData[_this.key].show_title
				//会员等级
				let key = _this.swiperList[_this.key].id
				let currentCard = _this.array[key].pri_id;
				let priAllData = _this.priAllData, pri_id;
				for(let i = 0; i < priAllData.length; i++){
					pri_id = priAllData[i].id;
					for(let j = 0; j < currentCard.length;j ++){
						if(currentCard[j] == pri_id){
							priAllData[i].checked = true;
							break;
						}else{
							priAllData[i].checked = false;
						}
					}
				}
				_this.priAllData = priAllData;
			}
		},
	}
</script>

<style>
	
</style>
