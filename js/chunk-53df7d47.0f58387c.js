(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-53df7d47"],{"21b6":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"page"},[r("div",{staticClass:"navbar-wrapper"},[r("NavBar",{attrs:{userInfo:e.userInfo}})],1),r("div",{staticClass:"edit-category"},[r("p",{staticClass:"title"},[e._v("自定义首页栏目")]),r("van-divider",[e._v("现有栏目")]),r("div",{staticClass:"selected-list category-list"},e._l(e.category,(function(t,a){return r("span",{key:a,on:{click:function(t){return e.selectedItemClick(a)}}},[e._v(e._s(t.name))])})),0),r("van-divider",[e._v("未选择栏目")]),r("div",{staticClass:"remove-list category-list"},e._l(e.removedList,(function(t,a){return r("span",{key:a,on:{click:function(t){return e.removedItemClick(a)}}},[e._v(e._s(t.name))])})),0)],1),r("div",{staticClass:"back-btn",on:{click:e.onBackClick}},[e._v("返回")])])},n=[],i=(r("a434"),r("96cf"),r("1da1")),c=r("2909"),o=r("d000"),s=r("18f5"),l={data:function(){return{category:[],removedList:[],userInfo:null}},components:{NavBar:o["a"]},methods:{onBackClick:function(){this.$router.back()},removedItemClick:function(e){var t,r=this.removedList.splice(e,1);(t=this.category).push.apply(t,Object(c["a"])(r))},selectedItemClick:function(e){var t;if(this.category.length<3)this.$toast.fail("请至少保留两个栏目");else{var r=this.category.splice(e,1);(t=this.removedList).push.apply(t,Object(c["a"])(r))}},initCategory:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(s["a"])();case 2:r=t.sent,e.category=r.data.category;case 4:case"end":return t.stop()}}),t)})))()},getCategory:function(){if(localStorage.getItem("category")&&localStorage.getItem("removedList"))return this.category=JSON.parse(localStorage.getItem("category")),void(this.removedList=JSON.parse(localStorage.getItem("removedList")));this.initCategory()},getUserInfo:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(s["l"])(localStorage.getItem("id"));case 2:r=t.sent,e.userInfo=r.data;case 4:case"end":return t.stop()}}),t)})))()}},created:function(){this.getCategory(),localStorage.getItem("token")&&localStorage.getItem("username")&&this.getUserInfo()},watch:{category:function(){localStorage.setItem("category",JSON.stringify(this.category))},removedList:function(){localStorage.setItem("removedList",JSON.stringify(this.removedList))}}},u=l,f=(r("befe"),r("2877")),g=Object(f["a"])(u,a,n,!1,null,"5b6ed598",null);t["default"]=g.exports},a434:function(e,t,r){"use strict";var a=r("23e7"),n=r("23cb"),i=r("a691"),c=r("50c4"),o=r("7b0b"),s=r("65f0"),l=r("8418"),u=r("1dde"),f=r("ae40"),g=u("splice"),d=f("splice",{ACCESSORS:!0,0:0,1:2}),v=Math.max,m=Math.min,h=9007199254740991,p="Maximum allowed length exceeded";a({target:"Array",proto:!0,forced:!g||!d},{splice:function(e,t){var r,a,u,f,g,d,y=o(this),b=c(y.length),C=n(e,b),S=arguments.length;if(0===S?r=a=0:1===S?(r=0,a=b-C):(r=S-2,a=m(v(i(t),0),b-C)),b+r-a>h)throw TypeError(p);for(u=s(y,a),f=0;f<a;f++)g=C+f,g in y&&l(u,f,y[g]);if(u.length=a,r<a){for(f=C;f<b-a;f++)g=f+a,d=f+r,g in y?y[d]=y[g]:delete y[d];for(f=b;f>b-a+r;f--)delete y[f-1]}else if(r>a)for(f=b-a;f>C;f--)g=f+a-1,d=f+r-1,g in y?y[d]=y[g]:delete y[d];for(f=0;f<r;f++)y[f+C]=arguments[f+2];return y.length=b-a+r,u}})},ae40:function(e,t,r){var a=r("83ab"),n=r("d039"),i=r("5135"),c=Object.defineProperty,o={},s=function(e){throw e};e.exports=function(e,t){if(i(o,e))return o[e];t||(t={});var r=[][e],l=!!i(t,"ACCESSORS")&&t.ACCESSORS,u=i(t,0)?t[0]:s,f=i(t,1)?t[1]:void 0;return o[e]=!!r&&!n((function(){if(l&&!a)return!0;var e={length:-1};l?c(e,1,{enumerable:!0,get:s}):e[1]=1,r.call(e,u,f)}))}},befe:function(e,t,r){"use strict";var a=r("efcc"),n=r.n(a);n.a},efcc:function(e,t,r){}}]);
//# sourceMappingURL=chunk-53df7d47.0f58387c.js.map