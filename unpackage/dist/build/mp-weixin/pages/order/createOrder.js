(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/createOrder"],{"18dc":function(t,e,o){},"1ef8":function(t,e,o){"use strict";(function(t){o("4520"),o("921b");n(o("66fd"));var e=n(o("34f9"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,o("543d")["createPage"])},"34f9":function(t,e,o){"use strict";o.r(e);var n=o("6a17"),a=o("7d2a");for(var i in a)"default"!==i&&function(t){o.d(e,t,function(){return a[t]})}(i);o("e51a");var u,r=o("f0c5"),c=Object(r["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],u);e["default"]=c.exports},"6a17":function(t,e,o){"use strict";var n={"uni-number-box":()=>o.e("components/uni-number-box/uni-number-box").then(o.bind(null,"a7f4"))},a=function(){var t=this,e=t.$createElement;t._self._c},i=[];o.d(e,"b",function(){return a}),o.d(e,"c",function(){return i}),o.d(e,"a",function(){return n})},"7d2a":function(t,e,o){"use strict";o.r(e);var n=o("8a1b"),a=o.n(n);for(var i in n)"default"!==i&&function(t){o.d(e,t,function(){return n[t]})}(i);e["default"]=a.a},"8a1b":function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=function(){return o.e("components/uni-number-box/uni-number-box").then(o.bind(null,"a7f4"))},a={components:{uniNumberBox:n},data:function(){return{isClicked:!1,maskState:0,desc:"",payType:1,productData:{},choose_number:1,addressData:{},totalFee:0}},onLoad:function(e){var o=this;console.log(e);var n=this;t.showLoading({title:"加载中..."}),this.$http.post("/api/goods/index",e).then(function(e){if(1!=e.data.code)t.showToast({title:e.data.info,icon:"none"});else{var a=e.data.data;n.addressData=a.addressData,n.productData=a.data,n.productData.attr=a.attr,n.totalFee=o.productData.attr.price_selling,t.hideLoading()}}).catch(function(t){console.log(t,333)}),t.hideShareMenu()},methods:{chooseNumber:function(t){this.choose_number=t,this.calculateTotol()},calculateTotol:function(){if(this.productData.attr){console.log(221);var t=void 0!=this.productData.attr?this.productData.attr.price_selling:0;this.totalFee=(1*t*this.choose_number).toFixed(2)}},getPageData:function(t){console.log(t)},toggleMask:function(t){var e=this,o="show"===t?10:300,n="show"===t?1:0;this.maskState=2,setTimeout(function(){e.maskState=n},o)},numberChange:function(t){this.number=t.number},changePayType:function(t){this.payType=t},submit:function(){var t=this;t.doCommit()},doCommit:function(){var e=this,o={productData:e.productData,number:e.choose_number};return void 0==e.addressData?(t.showToast({title:"请添加收货地址！",icon:"none"}),!1):(o.express_address_id=e.addressData.id,1==e.isClicked?(t.showToast({title:"请不要重复提交！",icon:"none"}),!1):(e.isClicked=!0,void e.$http.post("/store/api.member.order/set",o).then(function(e){if(console.log(e),1!=e.data.code)t.showToast({title:e.data.info,icon:"none"});else{var o=e.data.data;t.showToast({title:e.data.info,icon:"success"}),setTimeout(function(){t.redirectTo({url:"/pages/money/goods_pay?orderId="+o})},1e3)}}).catch(function(t){console.log(t)})))},stopPrevent:function(){}}};e.default=a}).call(this,o("543d")["default"])},e51a:function(t,e,o){"use strict";var n=o("18dc"),a=o.n(n);a.a}},[["1ef8","common/runtime","common/vendor"]]]);