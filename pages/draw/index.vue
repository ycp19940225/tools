<template>
	<view class="content-box">
		<view style="display: flex;">
			<view style="text-align: left;flex:1;padding: 2em;">
				<text style="border-radius: 1em;border: #DDDDDD 1px solid;padding: 0.5em;font-weight: bold;">
					{{name}}
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	import LotteryDraw from '../../components/SJ-LotteryDraw/SJ-LotteryDraw.vue';
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue';
	import uParse from '@/components/gaoyia-parse/parse.vue';
	import {
		httpUrl
	} from '@/js_sdk/tools/tool.js'
	export default {
		components: {
			LotteryDraw,
			uniNoticeBar,
			uParse
		},
		props: {
			
		},
		data() {
			return {
				name : "22"
			};
		},
		onLoad(options) {
			
		},
		mounted() {
		},
		beforeDestroy() {
			
		},
		onHide() {
			
		},
		methods: {
			
			
		}
	};
</script>


<style scoped>
	
</style>
