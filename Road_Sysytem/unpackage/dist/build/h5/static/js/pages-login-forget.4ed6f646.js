(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-login-forget"],{"0316":function(t,i,e){t.exports=e.p+"static/img/bac.f37fbe5b.png"},"26df":function(t,i,e){"use strict";e.r(i);var n=e("5432"),a=e("4424");for(var o in a)"default"!==o&&function(t){e.d(i,t,(function(){return a[t]}))}(o);e("7714");var s,l=e("f0c5"),r=Object(l["a"])(a["default"],n["b"],n["c"],!1,null,"e2d29c3a",null,!1,n["a"],s);i["default"]=r.exports},4424:function(t,i,e){"use strict";e.r(i);var n=e("a9dd"),a=e.n(n);for(var o in n)"default"!==o&&function(t){e.d(i,t,(function(){return n[t]}))}(o);i["default"]=a.a},5432:function(t,i,e){"use strict";var n;e.d(i,"b",(function(){return a})),e.d(i,"c",(function(){return o})),e.d(i,"a",(function(){return n}));var a=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("v-uni-view",[n("v-uni-view",{staticStyle:{display:"flex","flex-direction":"row",width:"100%",height:"100%","align-items":"center"}},[t.show_image?n("v-uni-view",{staticStyle:{width:"41.5%","margin-left":"2.8%",height:"100%",padding:"40px 0 40px 0",display:"flex","flex-direction":"column"}},[n("v-uni-image",{staticStyle:{width:"100%",height:"100%"},attrs:{src:e("0316"),mode:"widthFix"}})],1):t._e(),n("v-uni-view",{class:{windows:t.show_image,phone:!t.show_image}},[t.show_image?t._e():n("v-uni-input",{staticStyle:{height:"200rpx"},attrs:{disabled:"true"}}),n("v-uni-text",{staticStyle:{"font-size":"13px"}},[t._v("道路裂纹检测系统")]),n("v-uni-view",{staticClass:"login_group"},[n("v-uni-view",{class:{login_s:t.is_login,login:!t.is_login},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.change_login(!0)}}},[n("v-uni-text",[t._v("邮箱找回")])],1),n("v-uni-view",{class:{login_s:!t.is_login,login:t.is_login},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.change_login(!1)}}},[n("v-uni-text",[t._v("密码找回")])],1)],1),t.is_login?n("v-uni-view",{staticStyle:{display:"flex","flex-direction":"column",width:"100%"}},[n("v-uni-view",{staticStyle:{width:"100%","text-align":"center","margin-top":"45rpx"}},[n("v-uni-text",{staticStyle:{"font-size":"13px"}},[t._v("我们专注于提供免费的道路裂纹检测系统")])],1),n("v-uni-view",{staticStyle:{width:"100%",display:"flex","flex-direction":"column","margin-top":"60rpx"}},[n("v-uni-text",{staticStyle:{"font-size":"13px"}},[t._v("邮 箱")]),n("v-uni-view",{staticStyle:{width:"100%","margin-top":"15rpx"}},[n("v-uni-input",{staticClass:"input_group",attrs:{placeholder:"请 输 入 您 的 邮 箱"},model:{value:t.email,callback:function(i){t.email=i},expression:"email"}})],1),n("v-uni-text",{staticStyle:{"font-size":"13px","margin-top":"50rpx"}},[t._v("验 证 码")]),n("v-uni-view",{staticClass:"input_group",staticStyle:{width:"100%","margin-top":"15rpx",display:"flex","flex-direction":"row","align-items":"center"}},[n("v-uni-input",{staticStyle:{width:"70%","font-size":"13px"},attrs:{placeholder:"请 输 入 您 的 验 证 码",maxlength:"6"},model:{value:t.code,callback:function(i){t.code=i},expression:"code"}}),t.is_send?n("v-uni-view",{staticClass:"timedown"},[t._v(t._s(t.time_dowm))]):n("v-uni-view",{staticClass:"fasongemail",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.send()}}},[t._v("发送")])],1),n("v-uni-text",{staticStyle:{"font-size":"13px","margin-top":"37.5rpx"}},[t._v("新 密 码")]),n("v-uni-view",{staticStyle:{width:"100%","margin-top":"15rpx"}},[n("v-uni-input",{staticClass:"input_group",attrs:{placeholder:"请 输 入 您 的 密 码",password:"true"},model:{value:t.password,callback:function(i){t.password=i},expression:"password"}})],1),n("v-uni-view",{staticStyle:{display:"flex","flex-direction":"row-reverse",width:"100%","margin-top":"97.5rpx"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.login()}}},[n("v-uni-view",{staticClass:"button_login"},[t._v("重 置")])],1)],1)],1):n("v-uni-view",{staticStyle:{display:"flex","flex-direction":"column",width:"100%"}},[n("v-uni-view",{staticStyle:{width:"100%","text-align":"center","margin-top":"45rpx"}},[n("v-uni-text",{staticStyle:{"font-size":"13px"}},[t._v("我们专注于提供免费的道路裂纹检测系统")])],1),n("v-uni-text",{staticStyle:{"font-size":"13px","margin-top":"60rpx"}},[t._v("邮 箱")]),n("v-uni-view",{staticStyle:{width:"100%","margin-top":"15rpx"}},[n("v-uni-input",{staticClass:"input_group",attrs:{placeholder:"请 输 入 您 的 邮 箱"},model:{value:t.email,callback:function(i){t.email=i},expression:"email"}})],1),n("v-uni-text",{staticStyle:{"font-size":"13px","margin-top":"37.5rpx"}},[t._v("旧 密 码")]),n("v-uni-view",{staticStyle:{width:"100%","margin-top":"15rpx"}},[n("v-uni-input",{staticClass:"input_group",attrs:{placeholder:"请 输 入 您 的 旧 密 码",password:"true"},model:{value:t.oldpassword,callback:function(i){t.oldpassword=i},expression:"oldpassword"}})],1),n("v-uni-text",{staticStyle:{"font-size":"13px","margin-top":"37.5rpx"}},[t._v("新 密 码")]),n("v-uni-view",{staticStyle:{width:"100%","margin-top":"15rpx"}},[n("v-uni-input",{staticClass:"input_group",attrs:{placeholder:"密码必须大于八位同时包含字母和数字",password:"true"},model:{value:t.password,callback:function(i){t.password=i},expression:"password"}})],1),n("v-uni-view",{staticStyle:{display:"flex","flex-direction":"row-reverse",width:"100%","margin-top":"97.5rpx"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.register()}}},[n("v-uni-view",{staticClass:"button_login"},[t._v("注 册")])],1)],1)],1)],1),t.show_image?n("v-uni-view",{staticStyle:{position:"fixed",top:"40rpx",right:"50px"}},[n("v-uni-image",{staticStyle:{width:"130rpx","border-radius":"20upx"},attrs:{src:e("a425"),mode:"widthFix"}})],1):n("v-uni-view",{staticStyle:{position:"fixed",top:"40rpx",left:"50px"}},[n("v-uni-image",{staticStyle:{width:"130rpx","border-radius":"20upx"},attrs:{src:e("a425"),mode:"widthFix"}})],1)],1)},o=[]},7714:function(t,i,e){"use strict";var n=e("e0b8"),a=e.n(n);a.a},a425:function(t,i,e){t.exports=e.p+"static/img/logo.d2174cde.png"},a9dd:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n={data:function(){return{is_login:!0,email:"",password:"",rember_password:!0,is_send:!1,time_dowm:60,code:"",show_image:!0,oldpassword:""}},onLoad:function(){var t=this;setInterval((function(){uni.getSystemInfoSync().windowWidth<uni.getSystemInfoSync().windowHeight?t.show_image=!1:t.show_image=!0}),300)},methods:{send:function(){if(""!=this.email)if(0!=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email)){this.is_send=!0;var t=this;setInterval((function(){t.is_send&&t.time_dowm--,0==t.time_dowm&&(t.is_send=!1)}),1e3)}else uni.showToast({title:"邮箱格式不正确",icon:"none"});else uni.showToast({title:"邮箱未填写",icon:"none"})},register:function(){""!=this.email&&""!=this.oldpassword&&""!=this.password?/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(this.password)||uni.showToast({title:"密码必须同时包含字母和数字且大于八位",icon:"none"}):uni.showToast({title:"未填写完整",icon:"none"})},login:function(){""==this.email||""==this.password||this.oldpassword?uni.showToast({title:"未填写完整",icon:"none"}):/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(this.password)||uni.showToast({title:"密码必须同时包含字母和数字且大于八位",icon:"none"})},change_login:function(t){this.is_login=t}}};i.default=n},d8c9:function(t,i,e){var n=e("24fb");i=n(!1),i.push([t.i,"uni-input[data-v-e2d29c3a]::input-placeholder{color:#acacac}uni-page-body[data-v-e2d29c3a]{width:100%;height:100%}.windows[data-v-e2d29c3a]{margin-left:14%;width:27.7%;display:flex;flex-direction:column;align-items:center;flex-shrink:0}.phone[data-v-e2d29c3a]{margin-left:10%;width:76%;display:flex;flex-direction:column;align-items:center;flex-shrink:0}.fasongemail[data-v-e2d29c3a]{color:#fff;width:15%;display:flex;flex-direction:column;align-items:center;justify-content:center;background-color:#9e896a;border-radius:36px;height:30px}.timedown[data-v-e2d29c3a]{width:15%;display:flex;flex-direction:column;align-items:center;justify-content:center;border:thin solid #9e896a;border-radius:36px;height:30px;margin-left:%?15?%;color:#9e896a}.button_login[data-v-e2d29c3a]{width:50%;height:38px;opacity:1;border-radius:36px;background:#9e896a;display:flex;flex-direction:column;justify-content:center;text-align:center;align-items:center;color:#fff}.login_group[data-v-e2d29c3a]{width:260px;height:44.25px;opacity:1;border-radius:33px;background:#f8eddd;display:flex;flex-direction:row;align-items:center;margin-top:%?45?%;font-size:13px}.login_s[data-v-e2d29c3a]{margin-left:13px;\n\t/* top: 203px; */width:110px;height:30px;opacity:1;border-radius:33px;background:#9e896a;text-align:center;display:flex;flex-direction:column;justify-content:center;color:#fff;font-size:13px}.login[data-v-e2d29c3a]{margin-left:13px;\n\t/* top: 203px; */width:110px;height:30px;opacity:1;border-radius:33px;text-align:center;display:flex;flex-direction:column;justify-content:center;color:#9e896a;font-size:13px}.youxiang[data-v-e2d29c3a]{font-size:16px}.input_group[data-v-e2d29c3a]{width:100%;height:40px;opacity:1;border-radius:40px;background:#fff;padding:0 %?0?% 0 %?60?%;border:.5px solid #9e896a;color:#acacac;font-size:13px}",""]),t.exports=i},e0b8:function(t,i,e){var n=e("d8c9");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=e("4f06").default;a("69bddf7c",n,!0,{sourceMap:!1,shadowMode:!1})}}]);