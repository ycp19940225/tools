(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/sign"],{"17fc":function(t,o,n){"use strict";(function(t){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;n("2f62");var e=function(){return n.e("components/mix-list-cell").then(n.bind(null,"be0b"))},i=function(){return Promise.all([n.e("common/vendor"),n.e("components/mescroll-uni/mescroll-uni")]).then(n.bind(null,"6600"))},a={components:{listCell:e,MescrollUni:i},data:function(){return{weekData:[0,1,2,3,4,5,6],check_sign:!0,signed_day:0,shareScore:0,videoAd:null,share:{title:"这里的水果都是免费的，赶紧来领取！",path:"/pages/index/index"},open:!1,img:""}},mounted:function(){},computed:{},onLoad:function(){this.getPageData(),this.getAd(),this.getAdvideo()},onHide:function(){this.videoAd.destroy()},methods:{showModal:function(){this.open=!0},hideModal:function(o){var n=this;this.open=!1,t.downloadFile({url:n.img,success:function(o){if(200===o.statusCode){var e=o.tempFilePath;t.saveImageToPhotosAlbum({filePath:e,success:function(){t.showToast({title:"保存成功！",icon:"none"})},fail:function(){console.log("图片失败"+n.img)},complete:function(){console.log(n.img)}})}}})},getQrCode:function(){var o=this;o.$tool.showLoading("海报生成中..."),this.$http.post("/api/user/getQrCode").then(function(n){var e=n.data.data;1!=n.data.code?t.showToast({title:n.data.info,icon:"none"}):(o.img=e,o.showModal(),o.$tool.hideLoading())}).catch(function(t){console.log(t)})},getAdvideo:function(){var o=this,n=this;wx.createRewardedVideoAd&&(n.videoAd=wx.createRewardedVideoAd({adUnitId:"adunit-5391fcd7c167fe67"}),n.videoAd.onLoad(function(){}),n.videoAd.onError(function(t){}),n.videoAd.onClose(function(e){if(o.videoAd){if(o.videoAd.offClose(),!(e&&e.isEnded||void 0===e))return console.log(n.getPrizeRecordId),void t.showModal({title:"已放弃签到！"});n.singed()}}))},getAd:function(){var t=this;wx.createInterstitialAd&&(t.screenAd=wx.createInterstitialAd({adUnitId:"adunit-56e68361b2b5333d"}),t.screenAd.onLoad(function(){}),t.screenAd.onError(function(t){})),t.screenAd&&setTimeout(function(){t.screenAd.show().catch(function(t){console.error(t)})},t.getRandom(15e3,3e4))},getRandom:function(t,o){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,e=o-t,i=Math.random();return(t+e*i).toFixed(n)},getSinged:function(){var t=this;t.$tool.showLoading("加载中..."),this.videoAd.show().then(function(){t.$tool.hideLoading()})},singed:function(){var o=this,n=this;n.$tool.showLoading("签到中..."),this.$http.post("/api/user/addSinged").then(function(e){var i=e.data.data;n.$tool.hideLoading(),1!=e.data.code?t.showToast({title:e.data.info,icon:"none"}):(n.signed_day=i.signed_day,n.get_score=i.get_score,n.show_day=i.show_day,n.check_sign=!1,o.$set(n.weekData[n.show_day],"checked",!0),console.log(n.weekData),t.showModal({content:"连续签到"+n.signed_day+"天，获得"+n.get_score+"积分"}))}).catch(function(t){console.log(t)})},couponsList:function(){t.navigateTo({url:"/pages/coupons/list"})},getCoupons:function(){t.navigateTo({url:"/pages/coupons/get"})},shareTo:function(){t.showToast({title:"请点击上方工具栏分享转发",icon:"none"})},tip:function(){this.$api.msg("暂未开通")},getPageData:function(){var o=this;o.$tool.showLoading("页面加载中..."),this.$http.post("/api/user/getSingInfo").then(function(n){var e=n.data.data;1!=n.data.code?t.showToast({title:n.data.info,icon:"none"}):(o.weekData=e.weekData,o.check_sign=e.check_sign,o.signed_day=e.signed_day,o.shareScore=e.shareScore,o.$tool.hideLoading())}).catch(function(t){console.log(t)}),o.$http.post("/api/user/getUserOpenId").then(function(n){var e=n.data.data;1!=n.data.code?t.showToast({title:n.data.info,icon:"none"}):o.share.path=o.share.path+"?shareCode="+e}).catch(function(t){})},navTo:function(o){this.userInfo||(o="/pages/public/login"),t.navigateTo({url:o})}}};o.default=a}).call(this,n("543d")["default"])},"22d1":function(t,o,n){"use strict";(function(t){n("4520"),n("921b");e(n("66fd"));var o=e(n("d8d3"));function e(t){return t&&t.__esModule?t:{default:t}}t(o.default)}).call(this,n("543d")["createPage"])},"447b":function(t,o,n){"use strict";n.r(o);var e=n("17fc"),i=n.n(e);for(var a in e)"default"!==a&&function(t){n.d(o,t,function(){return e[t]})}(a);o["default"]=i.a},"4baf":function(t,o,n){"use strict";var e=n("7aa6"),i=n.n(e);i.a},"5c0b":function(t,o,n){"use strict";var e,i=function(){var t=this,o=t.$createElement;t._self._c},a=[];n.d(o,"b",function(){return i}),n.d(o,"c",function(){return a}),n.d(o,"a",function(){return e})},"7aa6":function(t,o,n){},d8d3:function(t,o,n){"use strict";n.r(o);var e=n("5c0b"),i=n("447b");for(var a in i)"default"!==a&&function(t){n.d(o,t,function(){return i[t]})}(a);n("4baf");var d,c=n("f0c5"),s=Object(c["a"])(i["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],d);o["default"]=s.exports}},[["22d1","common/runtime","common/vendor"]]]);