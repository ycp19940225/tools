(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/goods_order"],{"1aed":function(t,e,n){"use strict";(function(t){n("4520"),n("921b");a(n("66fd"));var e=a(n("dc45"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"6e5a":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;a(n("9ca5"));function a(t){return t&&t.__esModule?t:{default:t}}var o=function(){return n.e("components/uni-load-more/uni-load-more").then(n.bind(null,"0c79"))},r=function(){return n.e("components/empty").then(n.bind(null,"d5fd"))},i={components:{uniLoadMore:o,empty:r},data:function(){return{tabCurrentIndex:0,tabCurrentPage:1,navList:[{state:0,text:"全部",loadingType:"more",orderList:[]},{state:3,text:"待发货",loadingType:"more",orderList:[]},{state:4,text:"已发货",loadingType:"more",orderList:[]}]}},onLoad:function(t){this.tabCurrentIndex=+t.state,0==t.state&&this.loadData()},methods:{show:function(e,n){var a={order_id:n};a.type=1==e?1:2,this.$http.post("/api/order/getInfo",a).then(function(n){if(1!=n.data.code)t.showToast({title:n.data.info,icon:"none"});else{var a=n.data.data;1==e?(console.log(a),t.showModal({title:"查看物流",content:"物流公司："+a.express_company_title+";\n快递单号："+a.express_send_no})):t.showModal({title:"订单详情",content:a})}}).catch(function(t){console.log(t)})},loadData:function(e){var n,a=this,o=this,r=this.tabCurrentIndex,i=this.navList[r],s=i.state;if(n=void 0!=i.tabCurrentPage?i.tabCurrentPage:1,("tabChange"!==e||!0!==i.loaded)&&"loading"!==i.loadingType&&"noMore"!==i.loadingType){i.loadingType="loading";var d={status:s,pageNum:void 0!=i.tabCurrentPage?i.tabCurrentPage:1};this.$http.post("/api/order/goods_order_list",d).then(function(e){if(console.log(e),1!=e.data.code)t.showToast({title:e.data.info,icon:"none"});else{var r=e.data.data,d=r.list,u=r.page;setTimeout(function(){var t=d.filter(function(t){return t=Object.assign(t,a.orderStateExp(t.state)),0===s?t:t.state===s});t.forEach(function(t){i.orderList.push(t)}),a.$set(i,"loaded",!0),n<u.pageSize?(i.loadingType="more",i.tabCurrentPage=n+1):i.loadingType="noMore",console.log(n,o.tabCurrentPage,i)},600)}}).catch(function(t){console.log(t)})}},changeTab:function(t){this.tabCurrentIndex=t.target.current,this.loadData("tabChange")},tabClick:function(t){this.tabCurrentIndex=t},deleteOrder:function(e){var n=this;t.showLoading({title:"请稍后"}),setTimeout(function(){n.navList[n.tabCurrentIndex].orderList.splice(e,1),t.hideLoading()},600)},editInfo:function(){t.redirectTo({url:"/pages/user/personal"})},cancelOrder:function(e){var n=this;t.showLoading({title:"请稍后"}),setTimeout(function(){var a=n.orderStateExp(9),o=a.stateTip,r=a.stateTipColor;e=Object.assign(e,{state:9,stateTip:o,stateTipColor:r});var i=n.navList[1].orderList,s=i.findIndex(function(t){return t.id===e.id});-1!==s&&i.splice(s,1),t.hideLoading()},600)},orderStateExp:function(t){var e="",n="#fa436a";switch(+t){case 0:e="已取消",n="#909399";break;case 1:e="待补全",n="#909399";break;case 3:e="待发货";break;case 2:e="待兑换";break;case 4:e="已发货";break;case 5:e="已完成",n="#909399";break}return{stateTip:e,stateTipColor:n}}}};e.default=i}).call(this,n("543d")["default"])},"8f3f":function(t,e,n){},ce00:function(t,e,n){"use strict";n.r(e);var a=n("6e5a"),o=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);e["default"]=o.a},dc45:function(t,e,n){"use strict";n.r(e);var a=n("e2ad"),o=n("ce00");for(var r in o)"default"!==r&&function(t){n.d(e,t,function(){return o[t]})}(r);n("f0f7");var i,s=n("f0c5"),d=Object(s["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],i);e["default"]=d.exports},e2ad:function(t,e,n){"use strict";var a={"uni-load-more":()=>n.e("components/uni-load-more/uni-load-more").then(n.bind(null,"0c79"))},o=function(){var t=this,e=t.$createElement;t._self._c},r=[];n.d(e,"b",function(){return o}),n.d(e,"c",function(){return r}),n.d(e,"a",function(){return a})},f0f7:function(t,e,n){"use strict";var a=n("8f3f"),o=n.n(a);o.a}},[["1aed","common/runtime","common/vendor"]]]);