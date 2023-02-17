<template>
	<view class="swiper-box">
		<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="400">
			<swiper-item v-for="(item,index) in swiperList" :key="index" @click="goTo(swiperList[index].url)">
				<image :src="item.pic" mode="aspectFill" v-if="item.type=='image'" lazy-load="true"></image>
				<video :src="item.pic" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props:["swiperList"],
		data() {
			return {
				cardCur: 0,
				// swiperList: [{
				// 	id: 0,
				// 	type: 'image',
				// 	url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				// }, {
				// 	id: 1,
				// 	type: 'image',
				// 	url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				// }, {
				// 	id: 2,
				// 	type: 'image',
				// 	url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				// }, {
				// 	id: 3,
				// 	type: 'image',
				// 	url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				// }, {
				// 	id: 4,
				// 	type: 'image',
				// 	url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				// }, {
				// 	id: 5,
				// 	type: 'image',
				// 	url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				// }, {
				// 	id: 6,
				// 	type: 'image',
				// 	url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				// }],
				dotStyle: false,
				towerStart: 0,
				direction: ''
			};
		},
		onLoad() {
			this.TowerSwiper('swiperList');
			// 初始化towerSwiper 传已有的数组名即可
		},
		methods: {
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			goTo(url){
				console.log(url)
				// uni.navigateTo({
				// 	url: '/pages/product/index?id=' + 5,
				// 	// url: `/pages/product/index?id=${id}`
				// })
				uni.navigateTo({
					url: url
				});
			},
			// towerSwiper
			// 初始化towerSwiper
			TowerSwiper(name) {
				let list = this[name];
				for (let i = 0; i < list.length; i++) {
					list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
					list[i].mLeft = i - parseInt(list.length / 2)
				}
				this.swiperList = list
			},

			// towerSwiper触摸开始
			TowerStart(e) {
				this.towerStart = e.touches[0].pageX
			},

			// towerSwiper计算方向
			TowerMove(e) {
				this.direction = e.touches[0].pageX - this.towerStart > 0 ? 'right' : 'left'
			},

			// towerSwiper计算滚动
			TowerEnd(e) {
				let direction = this.direction;
				let list = this.swiperList;
				if (direction == 'right') {
					let mLeft = list[0].mLeft;
					let zIndex = list[0].zIndex;
					for (let i = 1; i < this.swiperList.length; i++) {
						this.swiperList[i - 1].mLeft = this.swiperList[i].mLeft
						this.swiperList[i - 1].zIndex = this.swiperList[i].zIndex
					}
					this.swiperList[list.length - 1].mLeft = mLeft;
					this.swiperList[list.length - 1].zIndex = zIndex;
				} else {
					let mLeft = list[list.length - 1].mLeft;
					let zIndex = list[list.length - 1].zIndex;
					for (let i = this.swiperList.length - 1; i > 0; i--) {
						this.swiperList[i].mLeft = this.swiperList[i - 1].mLeft
						this.swiperList[i].zIndex = this.swiperList[i - 1].zIndex
					}
					this.swiperList[0].mLeft = mLeft;
					this.swiperList[0].zIndex = zIndex;
				}
				this.direction = ""
				this.swiperList = this.swiperList
			},
		}
	}
</script>

<style>
	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100upx - 150upx);
		z-index: var(--index);
	}
	.screen-swiper{
		min-height: 100px;
		height: 150px;
	}
</style>
