(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/gaoyia-parse/components/wxParseTemplate8"],{"325b":function(e,n,t){"use strict";var a,r=function(){var e=this,n=e.$createElement;e._self._c},o=[];t.d(n,"b",function(){return r}),t.d(n,"c",function(){return o}),t.d(n,"a",function(){return a})},"3ed1":function(e,n,t){"use strict";t.r(n);var a=t("325b"),r=t("6ccc");for(var o in r)"default"!==o&&function(e){t.d(n,e,function(){return r[e]})}(o);var u,c=t("f0c5"),s=Object(c["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],u);n["default"]=s.exports},"4dbe":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=function(){return t.e("components/gaoyia-parse/components/wxParseTemplate9").then(t.bind(null,"2677"))},r=function(){return t.e("components/gaoyia-parse/components/wxParseImg").then(t.bind(null,"4ee3"))},o=function(){return t.e("components/gaoyia-parse/components/wxParseVideo").then(t.bind(null,"2695"))},u=function(){return t.e("components/gaoyia-parse/components/wxParseAudio").then(t.bind(null,"8e17"))},c=function(){return t.e("components/gaoyia-parse/components/wxParseTable").then(t.bind(null,"ac9b"))},s={name:"wxParseTemplate8",props:{node:{}},components:{wxParseTemplate:a,wxParseImg:r,wxParseVideo:o,wxParseAudio:u,wxParseTable:c},methods:{wxParseATap:function(e,n){var t=n.currentTarget.dataset.href;if(t){var a=this.$parent;while(!a.preview||"function"!==typeof a.preview)a=a.$parent;a.navigate(t,n,e)}}}};n.default=s},"6ccc":function(e,n,t){"use strict";t.r(n);var a=t("4dbe"),r=t.n(a);for(var o in a)"default"!==o&&function(e){t.d(n,e,function(){return a[e]})}(o);n["default"]=r.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/gaoyia-parse/components/wxParseTemplate8-create-component',
    {
        'components/gaoyia-parse/components/wxParseTemplate8-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("3ed1"))
        })
    },
    [['components/gaoyia-parse/components/wxParseTemplate8-create-component']]
]);