(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/commit/goods_attr"],{"2fe9":function(t,e,n){},"3fec":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=function(){return n.e("components/uni-popup/uni-popup").then(n.bind(null,"1240"))},o={components:{uniPopup:i},data:function(){return{res:{},productData:[{name:"VITARGO唯它高国家队专用 德国原产",item_open:!1,item:[{item_name:"颜色",item_value:{21:"紫/玫红",32:"黑/绿"}},{item_name:"尺码",item_value:{1:"S（35-38）",3:"M（39-42）",7:"L（43-46）"}}]},{name:"VITARGO唯它高",item_open:!1,item:[{item_name:"颜色",item_value:{21:"紫/玫红",32:"黑/绿"}},{item_name:"尺码",item_value:{1:"S（35-38）",3:"M（39-42）",7:"L（43-46）"}}]}]}},mounted:function(){},onLoad:function(t){var e=this;e.getPageData(t)},methods:{radioChange:function(t){for(var e,n=t.target.value,i=t.currentTarget.id,o=t.currentTarget.dataset.key,c=this.productData,a=0;a<c.length;a++)if(e=c[a],e.id==i){this.$set(e.item[o],"checked",n);break}console.log(e),this.calculate_price()},calculate_price:function(){for(var t,e,n,i,o=this.productData,c=[],a=0;a<o.length;a++)if(n=o[a],c=[],1==n.item_open&&1==n.checked){t=n.item;for(var u=0;u<t.length;u++)void 0!=t[u].checked&&c.push(t[u].checked);void 0!=c&&c.length>0&&(e=c.join(";;"),e in n.list&&(i=n.list[e],this.$set(n,"price",i.price_selling),this.$set(n,"checked_attr",e)))}},getPageData:function(e){var n=this;t.showLoading({title:"加载中...",mask:!0}),this.$http.post("/api/Activity/getGoodsAttr",e).then(function(e){if(console.log(e),1!=e.data.code)t.showToast({title:e.data.info,icon:"none"});else{var i=e.data.data;n.productData=i,t.hideLoading()}}).catch(function(t){console.log(t)})},openDetail:function(){var t,e,n=this;t=n.product.package[n.pickerPackageRes.index],e=n.product.group[n.pickerGroupRes.index],n.pickerDetail=[],void 0!=n.product.package&&n.product.package.length>0&&n.pickerDetail.push(t),n.pickerDetail.push(e),this.$refs.detail.open(),this.hide=!1},openItem:function(t){var e=this.productData,n=t.detail.value;console.log(n);for(var i=0,o=e.length;i<o;++i){var c=e[i];n.includes(c.id+"")?(this.$set(c,"checked",!0),this.$set(c,"item_open",!0)):(this.$set(c,"checked",!1),this.$set(c,"item_open",!1))}this.calculate_price()},tabSelect:function(){console.log(1)},openPopup:function(){this.$refs.popup.open()},closePopup:function(){for(var e=this.productData,n=0,i=0,o=e.length;i<o;++i){var c=e[i];if((1==c.check||1==c.item_open)&&void 0==c.price)return console.log(c),t.showToast({title:"请选择"+c.name+"的属性！",icon:"none"}),!1;1!=c.check&&1!=c.item_open||void 0==c.price||n++}var a=getCurrentPages(),u=(a[a.length-1],a[a.length-2]);u.$vm.product.goods=e,n>0&&(u.$vm.product.attr_checked=n),t.navigateBack({delta:1,function:function(){u.calculatePrice()}})}}};e.default=o}).call(this,n("543d")["default"])},8342:function(t,e,n){"use strict";n.r(e);var i=n("3fec"),o=n.n(i);for(var c in i)"default"!==c&&function(t){n.d(e,t,function(){return i[t]})}(c);e["default"]=o.a},b609:function(t,e,n){"use strict";var i=n("2fe9"),o=n.n(i);o.a},cdb6:function(t,e,n){"use strict";var i,o=function(){var t=this,e=t.$createElement;t._self._c},c=[];n.d(e,"b",function(){return o}),n.d(e,"c",function(){return c}),n.d(e,"a",function(){return i})},dc294:function(t,e,n){"use strict";(function(t){n("4520"),n("921b");i(n("66fd"));var e=i(n("f12f"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},f12f:function(t,e,n){"use strict";n.r(e);var i=n("cdb6"),o=n("8342");for(var c in o)"default"!==c&&function(t){n.d(e,t,function(){return o[t]})}(c);n("b609");var a,u=n("f0c5"),r=Object(u["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],a);e["default"]=r.exports}},[["dc294","common/runtime","common/vendor"]]]);