"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[665],{665:function(e,n,t){t.r(n),t.d(n,{default:function(){return m}});var i=t(9439),u=t(9735),l=t(9514),s=t(8467),r=t(5610),c=t(7698),a=t(7313),f=t(6417),o=function(e){var n=e.handleDifficulty;return(0,f.jsx)(r.FE,{children:(0,f.jsxs)("div",{className:"game-difficulty",children:[(0,f.jsx)(c.Z,{}),(0,f.jsx)(r.hE,{label:"Difficulty",children:(0,f.jsx)("div",{className:"game-difficulty-buttons",children:Object.keys(u.C3).map((function(e){return(0,f.jsx)("button",{className:"button orange",title:e,onClick:function(){return n(e)},children:e},e)}))})})]})})},d=a.memo(o),h=t(8195),O=t(4663),S=(0,a.lazy)((function(){return Promise.all([t.e(654),t.e(962)]).then(t.bind(t,8962))})),j=function(){var e=(0,a.useState)(void 0),n=(0,i.Z)(e,2),t=n[0],r=n[1],c=(0,a.useContext)(O.ZP),o=(0,s.UO)().type,j=(null===o||void 0===o?void 0:o.toUpperCase())||u.SZ.SOLO,m=Object.keys(u.SZ).includes(j)?j:u.SZ.SOLO,x=m!==u.SZ.ONLINE?m:u.SZ.SOLO,y=x!==u.SZ.SOLO?(0,l.MH)(1,2):1,Z=null!==c&&void 0!==c&&c.isAuth&&c.user||{};return t||x!==u.SZ.BOT?(0,f.jsx)(a.Suspense,{fallback:(0,f.jsx)(h.Z,{}),children:(0,f.jsx)(S,{authUser:Z,difficulty:t,initialTurn:y,typeGame:x})}):(0,f.jsx)(d,{handleDifficulty:function(e){return r(e)}})},m=a.memo(j)}}]);