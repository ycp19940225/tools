(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/createOrder2"],{"1d51":function(t,e,o){"use strict";o.r(e);var n=o("5384"),a=o.n(n);for(var i in n)"default"!==i&&function(t){o.d(e,t,function(){return n[t]})}(i);e["default"]=a.a},5384:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=function(){return o.e("components/uni-number-box/uni-number-box").then(o.bind(null,"a7f4"))},a={components:{uniNumberBox:n},data:function(){return{isClicked:!1,maskState:0,desc:"",payType:1,productData:{},choose_number:1,addressData:{},totalFee:0}},onLoad:function(e){var o=this;console.log(e);var n=this;t.showLoading({title:"加载中..."}),this.$http.post("/api/goods/index",e).then(function(e){if(1!=e.data.code)t.showToast({title:e.data.info,icon:"none"});else{var a=e.data.data;n.addressData=a.addressData,n.productData=a.data,n.productData.attr=a.attr,n.totalFee=o.productData.attr.price_selling,t.hideLoading()}}).catch(function(t){console.log(t,333)}),t.hideShareMenu()},methods:{chooseNumber:function(t){this.choose_number=t,this.calculateTotol()},calculateTotol:function(){if(this.productData.attr){console.log(221);var t=void 0!=this.productData.attr?this.productData.attr.price_selling:0;this.totalFee=(1*t*this.choose_number).toFixed(2)}},getPageData:function(t){console.log(t)},toggleMask:function(t){var e=this,o="show"===t?10:300,n="show"===t?1:0;this.maskState=2,setTimeout(function(){e.maskState=n},o)},numberChange:function(t){this.number=t.number},changePayType:function(t){this.payType=t},submit:function(){var t=this;t.doCommit()},doCommit:function(){var e=this,o={productData:e.productData,number:e.choose_number,type:"vip"};return void 0==e.addressData?(t.showToast({title:"请添加收货地址！",icon:"none"}),!1):(o.express_address_id=e.addressData.id,1==e.isClicked?(t.showToast({title:"请不要重复提交！",icon:"none"}),!1):(e.isClicked=!0,void e.$http.post("/store/api.member.order/set",o).then(function(e){if(console.log(e),1!=e.data.code)t.showToast({title:e.data.info,icon:"none"});else{var o=e.data.data;t.showToast({title:e.data.info,icon:"success"}),setTimeout(function(){t.redirectTo({url:"/pages/money/goods_pay2?orderId="+o})},1e3)}}).catch(function(t){console.log(t)})))},stopPrevent:function(){}}};e.default=a}).call(this,o("543d")["default"])},"8fd3":function(t,e,o){"use strict";(function(t){o("4520"),o("921b");n(o("66fd"));var e=n(o("f239"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,o("543d")["createPage"])},a77e:function(t,e,o){"use strict";var n,a=function(){var t=this,e=t.$createElement;t._self._c},i=[];o.d(e,"b",function(){return a}),o.d(e,"c",function(){return i}),o.d(e,"a",function(){return n})},cbfa:function(t,e,o){"use strict";var n=o("f60e"),a=o.n(n);a.a},f239:function(t,e,o){"use strict";o.r(e);var n=o("a77e"),a=o("1d51");for(var i in a)"default"!==i&&function(t){o.d(e,t,function(){return a[t]})}(i);o("cbfa");var c,s=o("f0c5"),r=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],c);e["default"]=r.exports},f60e:function(t,e,o){}},[["8fd3","common/runtime","common/vendor"]]]);