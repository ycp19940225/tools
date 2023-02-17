<template>
	<view class="container">
		
	</view>
</template>
<script>
	//搜索
	import swiper from '@/components/colorui/components/swiper.vue';
	export default {
		components: {
			swiper,
		},
		data() {
			return {
				PageCur: 'home',
				activityList: [],
				swiperList: {},
				navList: {},

				bannerList: {}
			}
		},
		methods: {
			//获取页面数据
			getPageData: function() {
				
			},
		},
		mounted: function() {
			this.getPageData()
		},
	}
</script>

<style>
	.input_search_box {
		height: 2em;
		background-color: #f2f2f2;
		margin: 6px 6px;
	}

	.search_box {
		height: 2em;
		text-align: center;
		background-color: white;
		border-radius: 0.5em;
		width: 94%;
		margin: 0 auto;
		padding-top: 3px;
	}

	.serach_text {
		color: #888888;
		font-size: 1.1em;
		margin-left: 8px;
	}

	.base_nav {
		display: flex;
		flex: 1;
		flex-direction: row;
		padding: 0 auto;
		/* height: 31vh; */
		background: white;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0.5em 0.5em 0.5em 0.5em;
	}

	.nav_pic_2 {
		flex: 1;
		/* height: 6em; */
		/* min-height: 6em; */
		max-width: 50%;
		padding: 0.4em 0.4em 0.4em 0.4em;
		/* justify-content: space-between; */
	}

	.nav_pic {
		height: 6em;
		/* min-height: 6em; */
		/* max-width: 45%; */

	}

	.banner_pic {
		display: flex;
		margin: 8px 4px 4px 4px;
		flex-direction: column;
	}

	.banner_image {
		flex: 1;
		height: 15vh;
		width: 100%;
		padding: 0 auto;
	}

	.activity {
		background: white;
		margin: 16px 8px;
		box-shadow: h-shadow v-shadow blur spread color inset;
		margin-bottom: 0;
	}

	.doings_img image {
		height: 20vh;
		width: 100%;
	}

	.content {
		padding: 8px 8px;
	}

	.title text {
		font-size: 1rem;
		color: #333333;
		line-height: 1.8rem;
		padding-top: 1.1rem;
		font-weight: bold;
		padding-left: 1em;
	}

	.doings_date {
		position: absolute;
		/* width: 100%; */
		/* height: 100%; */
		/* z-index: 1000; */
		margin-top: 16vh;
		position: absolute;
		/* right: 2.5em; */
		z-index: 1000;
		color: #FFFFFF;
	}

	.doings_date text {
		color: white;
	}

	.doings_date text:first-child {
		background: url(../../static/common/date.png) no-repeat;
		float: left;
		margin-right: 0.2em;
		width: 1rem;
		height: 1rem;
		background-size: 100%;
		margin-left: 1em;
		vertical-align: middle;
	}

	.doings_date text:nth-child(2) {
		height: 1rem;
		vertical-align: middle;
		font-weight: bold;
	}

	.doings_location {
		margin-top: 16vh;
		position: absolute;
		right: 2.5em;
		z-index: 1000;
		color: #FFFFFF;
	}

	.doings_location text:first-child {
		background: url(../../static/common/location.png) no-repeat;
		float: left;
		margin-right: 0.2em;
		width: 1rem;
		height: 1rem;
		background-size: 100%;
		margin-left: 1em;
		vertical-align: middle;
	}

	.doings_location text:nth-child(2) {
		height: 1rem;
		vertical-align: middle;
		font-weight: bold;
	}

	.time {
		display: flex;
		justify-content: space-between;
		margin: 4px 8px;
		/* padding: 4px 8px; */
	}

	.price {
		right: 0;
		color: #007AFF;
	}

	.price text:nth-child(1) {
		font-size: 2em;
	}

	.doing_time text {
		height: 2em;
		display: table-cell;
		vertical-align: middle;
	}

	/* .doing_time text:nth-child(even){
		padding: 0rem 0.3rem;
		background: #333333;
		border-radius: 3px;
		color: #FFFFFF;
		margin: 0 0.1rem;
		margin-top: 0;
	} */
</style>
