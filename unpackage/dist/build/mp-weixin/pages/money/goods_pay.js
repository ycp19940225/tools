(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/money/goods_pay"],{"221e":function(t,o,e){"use strict";var n,i=function(){var t=this,o=t.$createElement;t._self._c},a=[];e.d(o,"b",function(){return i}),e.d(o,"c",function(){return a}),e.d(o,"a",function(){return n})},"28b9":function(t,o,e){},"33cf":function(t,o,e){"use strict";var n=e("28b9"),i=e.n(n);i.a},8447:function(t,o,e){"use strict";e.r(o);var n=e("221e"),i=e("dc7b");for(var a in i)"default"!==a&&function(t){e.d(o,t,function(){return i[t]})}(a);e("33cf");var c,r=e("f0c5"),d=Object(r["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],c);o["default"]=d.exports},ae57:function(t,o,e){"use strict";(function(t){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var e={data:function(){return{payType:1,orderInfo:{},timeId:"",modalName:null,coupons_id:-1,totalFee:0,selectTitle:"点击选择优惠券"}},computed:{},onLoad:function(t){console.log(t);var o=this;o.getPageData(t)},methods:{calculateTotol:function(t){if(-1!=t){var o=this.orderInfo.couponsList[t];this.totalFee=(this.orderInfo.price_total-o.reduced_price).toFixed(2),this.selectTitle="选择:"+o.name+"  优惠金额:￥"+o.reduced_price}else this.totalFee=(1*this.orderInfo.price_total).toFixed(2),this.selectTitle="请选择优惠券"},selectCoupons:function(t){this.coupons_id==t?this.coupons_id=-1:this.coupons_id=t,this.calculateTotol(this.coupons_id)},RadioChange:function(t){this.radio=t.detail.value},showModal:function(t){this.modalName=t.currentTarget.dataset.target},hideModal:function(t){this.modalName=null},checkPay:function(o){var e=this,n={id:o};this.$http.post("/store/api.member.order/checkPay",n).then(function(o){if(console.log(o),1!=o.data.code)t.showToast({title:o.data.info,icon:"none"});else{var n=o.data.data;1==n.paySuccess&&(clearInterval(e.timeId),t.showToast({title:"兑换成功！",icon:"success"}),setTimeout(function(){t.redirectTo({url:"/pages/order/goods_order?state=2"})},1e3))}}).catch(function(t){console.log(t)})},getPageData:function(o){var e=this;t.showLoading({title:"加载中..."}),this.$http.post("/store/api.member.order/get",o).then(function(o){if(console.log(o),1!=o.data.code)t.showToast({title:o.data.info,icon:"none"});else{var n=o.data.data;if(e.orderInfo=n,e.totalFee=e.orderInfo.price_total,t.hideLoading(),void 0!=e.orderInfo.couponsList&&0!=e.orderInfo.couponsList.length){var i=e.orderInfo.couponsList;e.coupons_id=e.get_object_first_attribute(i),e.calculateTotol(e.coupons_id)}}}).catch(function(t){console.log(t)})},get_object_first_attribute:function(t){for(var o in t)return o},changePayType:function(t){this.payType=t},confirm:function(){var o=this;if(1!=o.payType)return t.showToast({title:"暂不支持该种支付方式！",icon:"none"}),!1;if(o.orderInfo.back_score<o.totalFee)return t.showToast({title:"余额不足！",icon:"none"}),!1;var e={order_id:o.orderInfo.id};o.coupons_id>-1&&(e.couponsRecordId=o.orderInfo.couponsList[o.coupons_id].id,e.reduced_price=o.orderInfo.couponsList[o.coupons_id].reduced_price),this.$http.post("/store/api.member.order/doPay",e).then(function(e){if(console.log(19==e.data.code),1!=e.data.code&&19!=e.data.code)t.showToast({title:e.data.info,icon:"none"});else if(19==e.data.code)o.timeId=setInterval(function(){o.checkPay(o.orderInfo.id)},500);else{e.data.data;o.timeId=setInterval(function(){o.checkPay(o.orderInfo.id)},500)}}).catch(function(t){console.log(t)})}}};o.default=e}).call(this,e("543d")["default"])},dc29:function(t,o,e){"use strict";(function(t){e("4520"),e("921b");n(e("66fd"));var o=n(e("8447"));function n(t){return t&&t.__esModule?t:{default:t}}t(o.default)}).call(this,e("543d")["createPage"])},dc7b:function(t,o,e){"use strict";e.r(o);var n=e("ae57"),i=e.n(n);for(var a in n)"default"!==a&&function(t){e.d(o,t,function(){return n[t]})}(a);o["default"]=i.a}},[["dc29","common/runtime","common/vendor"]]]);