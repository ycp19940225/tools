(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/gaoyia-parse/components/wxParseTemplate3"],{"0a57":function(e,n,t){"use strict";t.r(n);var a=t("bdb8"),r=t("3d2c");for(var o in r)"default"!==o&&function(e){t.d(n,e,function(){return r[e]})}(o);var u,c=t("f0c5"),s=Object(c["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],u);n["default"]=s.exports},"3d2c":function(e,n,t){"use strict";t.r(n);var a=t("dc32"),r=t.n(a);for(var o in a)"default"!==o&&function(e){t.d(n,e,function(){return a[e]})}(o);n["default"]=r.a},bdb8:function(e,n,t){"use strict";var a,r=function(){var e=this,n=e.$createElement;e._self._c},o=[];t.d(n,"b",function(){return r}),t.d(n,"c",function(){return o}),t.d(n,"a",function(){return a})},dc32:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=function(){return t.e("components/gaoyia-parse/components/wxParseTemplate4").then(t.bind(null,"fec9"))},r=function(){return t.e("components/gaoyia-parse/components/wxParseImg").then(t.bind(null,"4ee3"))},o=function(){return t.e("components/gaoyia-parse/components/wxParseVideo").then(t.bind(null,"2695"))},u=function(){return t.e("components/gaoyia-parse/components/wxParseAudio").then(t.bind(null,"8e17"))},c=function(){return t.e("components/gaoyia-parse/components/wxParseTable").then(t.bind(null,"ac9b"))},s={name:"wxParseTemplate3",props:{node:{}},components:{wxParseTemplate:a,wxParseImg:r,wxParseVideo:o,wxParseAudio:u,wxParseTable:c},methods:{wxParseATap:function(e,n){var t=n.currentTarget.dataset.href;if(t){var a=this.$parent;while(!a.preview||"function"!==typeof a.preview)a=a.$parent;a.navigate(t,n,e)}}}};n.default=s}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/gaoyia-parse/components/wxParseTemplate3-create-component',
    {
        'components/gaoyia-parse/components/wxParseTemplate3-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("0a57"))
        })
    },
    [['components/gaoyia-parse/components/wxParseTemplate3-create-component']]
]);
