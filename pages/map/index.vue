<template>
	<view>
		<view class="map" v-if="mapShow.map">
			<view class="flex-style">
				<view :class="method == 1 ? 'flex-item active':'flex-item'" @click="getData(1)">自驾</view>
				<view :class="method == 2 ? 'flex-item active':'flex-item'" @click="getData(2)">步行</view>
				<view :class="method == 3 ? 'flex-item active':'flex-item'" @click="getData(3)">公交</view>
				<!-- <view class="flex-item" bindtouchstart="goToRide">骑行</view> -->
			</view>
			<view v-if="mapShow.map_box">
				<view class="map_box" >
					<map id="navi_map" :longitude="longitude" :latitude="latitude" scale="11" :markers="markers" :polyline="polyline"></map>
				</view>
				<view class="text_box">
					<view class="text">{{distance}}</view>
					<view class="text">{{cost}}</view>
					<view class="detail_button" @click="goDetail">详情</view>
				</view>
			</view>
		</view>
		<view class="detail" v-if="mapShow.detail">
			<view class="text_box2 map_detail" v-for="(item, key) in steps" :key="key">
				{{item.instruction}}
			</view>
			<button type="primary" @click="showMap()">返回</button>
		</view>
		<view v-if="mapShow.busShow">
			<view class="text_box3" v-for="(item, key) in transits" :key="key">
			  <text class="text_item" v-for="(vo, k) in item.transport" :key="k">
			    {{vo}}
			  </text>
			</view>
		</view>
	</view>
</template>
<script>
	import mapFile from "@/js_sdk/js-amap/amap-wx.js"
	export default {
		data() {
			return {
				method:1,
				mapShow: {
					map:true,
					detail:false,
					map_box:true,
					busShow:false
				},
				transits:{},
				steps:{},
				title: 'map',
				latitude: null,
				longitude: null,
				amapPlugin: null,
				key: this.mapSecret,
				distance: '',
				cost: '',
				polyline: [],
				origin: '',
				destination: '',
				markers: [{
					iconPath: "/static/common/mapicon_navi_s.png",
					id: 0,
					latitude: '',
					longitude: '',
					width: 23,
					height: 33
				}, {
					iconPath: "/static/common/mapicon_navi_e.png",
					id: 0,
					latitude: '',
					longitude: '',
					width: 24,
					height: 34
				}],
			}
		},
		methods: {
			showMap() {
				this.mapShow.map = true;
				this.mapShow.detail = false;
			},
			//自驾
			getCarRoute(){
				let that = this;
				that.amapPlugin.getDrivingRoute({
					origin: that.origin,
					destination: that.destination,
					success: function(data) {
						var points = [];
						if (data.paths && data.paths[0] && data.paths[0].steps) {
							var steps = data.paths[0].steps;
							for (var i = 0; i < steps.length; i++) {
								var poLen = steps[i].polyline.split(';');
								for (var j = 0; j < poLen.length; j++) {
									points.push({
										longitude: parseFloat(poLen[j].split(',')[0]),
										latitude: parseFloat(poLen[j].split(',')[1])
									})
								}
							}
							//详细路线
							that.steps = steps
						}
						let polyline = [{
							points: points,
							color: "#0091ff",
							width: 6
						}];
						that.polyline = polyline;
						console.log(that.polyline)
						if (data.paths[0] && data.paths[0].distance) {
							// that.setData({
							// 	distance: data.paths[0].distance + '米'
							// });
							that.distance = data.paths[0].distance + '米';
							console.log(that.distance)
						}
						if (data.taxi_cost) {
							// that.setData({
							// 	cost: '打车约' + parseInt(data.taxi_cost) + '元'
							// });
							that.cost = '打车约' + parseInt(data.taxi_cost) + '元';
						}
				
					}
				})
			},
			//步行
			getWalkRoute(){
				let that = this;
				that.amapPlugin.getWalkingRoute({
					origin: that.origin,
					destination: that.destination,
					success: function(data) {
						var points = [];
						if (data.paths && data.paths[0] && data.paths[0].steps) {
							var steps = data.paths[0].steps;
							for (var i = 0; i < steps.length; i++) {
								var poLen = steps[i].polyline.split(';');
								for (var j = 0; j < poLen.length; j++) {
									points.push({
										longitude: parseFloat(poLen[j].split(',')[0]),
										latitude: parseFloat(poLen[j].split(',')[1])
									})
								}
							}
							//详细路线
							that.steps = steps
						}
						let polyline = [{
							points: points,
							color: "#0091ff",
							width: 6
						}];
						that.polyline = polyline;
						console.log(222,that.polyline)
						if (data.paths[0] && data.paths[0].distance) {
							// that.setData({
							// 	distance: data.paths[0].distance + '米'
							// });
							that.distance = data.paths[0].distance + '米';
							console.log(that.distance)
						}
						if (data.taxi_cost) {
							// that.setData({
							// 	cost: '打车约' + parseInt(data.taxi_cost) + '元'
							// });
							that.cost = '打车约' + parseInt(data.taxi_cost) + '元';
						}
				
					}
				})
			},
			//公交
			getBusRoute(cityCode){
				let that = this;
				that.amapPlugin.getTransitRoute({
					origin: that.origin,
					destination: that.destination,
					city: cityCode,
					success: function(data) {
						if(data && data.transits){
						  var transits = data.transits;
						  for(var i = 0; i < transits.length; i++){
						    var segments = transits[i].segments;
						    transits[i].transport = [];
						    for(var j = 0; j < segments.length; j++){
						      if(segments[j].bus && segments[j].bus.buslines && segments[j].bus.buslines[0] && segments[j].bus.buslines[0].name){
						        var name = segments[j].bus.buslines[0].name
						        if(j!==0){
						          name = '--' + name;
						        }
						        transits[i].transport.push(name);
						      }
						    }
						  }
						}
						console.log(334,transits)
						that.transits = transits;
					}
				})
			},
			getRegeo(method) {
				var that = this;
				uni.showLoading({
					title: '获取信息中'
				});
				this.amapPlugin.getRegeo({
					// type: 'gcj02',
					success: (res) => {
						res = res[0]
						//设置起点位置
						this.origin = res.longitude + ',' + res.latitude;
						//
						that.longitude = res.longitude;
						that.latitude = res.latitude;
						console.log(that.longitude, that.longitude)
						uni.hideLoading();
						// let markers = [{
						// 	iconPath: "@/static/common/mapicon_navi_s.png",
						// 	id: 0,
						// 	latitude: that.origin.latitude,
						// 	longitude: that.origin.longitude,
						// 	width: 23,
						// 	height: 33
						// }, {
						// 	iconPath: "@/static/common/mapicon_navi_s.png",
						// 	id: 0,
						// 	latitude: that.destination.latitude,
						// 	longitude: that.destination.longitude,
						// 	width: 24,
						// 	height: 34
						// }];
						// //设置终点起点
						// tha
						//设置终点起点
						that.markers[0].latitude = res.latitude;
						that.markers[0].longitude = res.longitude;
						that.markers[1].latitude = that.destination.split(',')[1];
						that.markers[1].longitude = that.destination.split(',')[0];
						if(method == 1 || method ==undefined){
							that.getCarRoute();
						}else if(method == 2){
							that.getWalkRoute();
						}else if(method == 3){
							let cityCode = res.regeocodeData.addressComponent.citycode
							that.getBusRoute(cityCode);
						}
					}
				});
			},
			goDetail: function() {
				// wx.navigateTo({
				// 	url: '../navigation_car_detail/navigation'
				// })
				let that = this;
				that.mapShow.map = false;
				that.mapShow.detail = true;
				// this.amapPlugin.getDrivingRoute({
				// 	origin: that.origin,
				// 	destination: that.destination,
				// 	success: function(data) {
				// 		if (data.paths && data.paths[0] && data.paths[0].steps) {
				// 			// that.setData({
				// 			// 	steps: data.paths[0].steps
				// 			// });
				// 			that.steps = data.paths[0].steps
				// 		}
                        
				// 	},
				// 	fail: function(info) {

				// 	}
				// })
			},
			getData: function(e) {
				console.log(e)
				let that = this;
				that.method = e;
				if(e == 3){
					that.mapShow.busShow = true;
					that.mapShow.map_box = false;
				}else{
					that.mapShow.busShow = false;
					that.mapShow.map_box = true;
				}
				that.getRegeo(e);
				// wx.redirectTo({
				// 	url: "/pages/map/index?" + "longitude=" + that.destination.split(',')[0] + "&latitude="+ that.destination.split(',')[1] +'&type='+ e
				// })
			}
		},
		onLoad: function(option) {
			var that = this;
			if (option.latitude != undefined) {
				that.destination = option.longitude + ',' + option.latitude;
			} else {
				that.destination = '106.451653,29.579918';
			}
			that.amapPlugin = new mapFile.AMapWX({
				key: that.key
			})
			this.getRegeo()
		},
	}
</script>

<style>
	.text_box3{
	  margin: 0 15px;
	  padding: 15px 0;
	  border-bottom: 1px solid #c3c3c3;
	  font-size: 13px;
	}
	.text_box3 .text_item{display:inline-block;line-height: 8px;}
	
	.flex-style {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
	}

	.flex-item {
		height: 35px;
		line-height: 35px;
		text-align: center;
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		flex: 1
	}

	.flex-item.active {
		color: #0091ff;
	}

	.text_box2 {
		margin: 0 15px;
		padding: 15px 0;
		border-bottom: 1px solid #c3c3c3;
		font-size: 13px;
	}

	.text_box2 .text_item {
		display: inline-block;
		line-height: 8px;
	}
	

	.map_box {
		position: absolute;
		top: 35px;
		bottom: 90px;
		left: 0px;
		right: 0px;
	}

	#navi_map {
		width: 100%;
		height: 100%;
	}

	.text_box {
		position: absolute;
		height: 90px;
		bottom: 0px;
		left: 0px;
		right: 0px;
	}

	.text_box .text {
		margin: 15px;
	}

	.detail_button {
		position: absolute;
		bottom: 30px;
		right: 10px;
		padding: 3px 5px;
		color: #fff;
		background: #0091ff;
		width: 50px;
		text-align: center;
		border-radius: 5px;
	}
</style>
