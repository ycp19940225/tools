(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/set/set"],{1481:function(t,e,n){"use strict";var o=n("6671"),c=n.n(o);c.a},"1a45":function(t,e,n){"use strict";n.r(e);var o=n("204d"),c=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,function(){return o[t]})}(r);e["default"]=c.a},"204d":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n("2f62");function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),o.forEach(function(e){r(t,e,n[e])})}return t}function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var u={data:function(){return{}},methods:c({},(0,o.mapMutations)(["logout"]),{navTo:function(e){switch(e){case 1:t.redirectTo({url:"/pages/user/personal"});break;case 2:t.clearStorage(),t.showModal({title:"提示",content:"缓存清除成功,请删除小程序重新打开!",success:function(t){t.confirm?console.log("用户点击确定"):t.cancel&&console.log("用户点击取消")}});break;default:t.redirectTo({url:e});break}},toLogout:function(){var e=this;t.showModal({content:"确定要退出登录么",success:function(n){n.confirm&&(t.clearStorage(),e.logout(),setTimeout(function(){t.navigateBack()},200))}})},switchChange:function(t){var e=t.detail.value?"打开":"关闭";this.$api.msg("".concat(e,"消息推送"))}})};e.default=u}).call(this,n("543d")["default"])},"2e72":function(t,e,n){"use strict";n.r(e);var o=n("e8bc"),c=n("1a45");for(var r in c)"default"!==r&&function(t){n.d(e,t,function(){return c[t]})}(r);n("1481");var u,a=n("f0c5"),i=Object(a["a"])(c["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);e["default"]=i.exports},6671:function(t,e,n){},"68ec":function(t,e,n){"use strict";(function(t){n("4520"),n("921b");o(n("66fd"));var e=o(n("2e72"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},e8bc:function(t,e,n){"use strict";var o,c=function(){var t=this,e=t.$createElement;t._self._c},r=[];n.d(e,"b",function(){return c}),n.d(e,"c",function(){return r}),n.d(e,"a",function(){return o})}},[["68ec","common/runtime","common/vendor"]]]);