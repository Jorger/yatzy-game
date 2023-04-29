"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[392],{392:function(o,n,t){t.r(n),t.d(n,{default:function(){return y}});var e=t(5610),a=t(2135),l=t(7313),s=t(6417),i=[{label:"Solo",path:"/game/solo"},{label:"Online",path:"/online"},{label:"Vs a Friend",path:"/game/friend"},{label:"VS a Bot",path:"/game/bot"}],r=function(o){var n=o.state;return(0,s.jsx)("div",{className:"lobby-game-links",children:(0,s.jsx)(e.hE,{label:"Play",children:(0,s.jsx)("div",{className:"lobby-game-links-link",children:i.map((function(o,t){var e=o.label,l=o.path;return("Online"===e&&!!n||"Online"!==e)&&(0,s.jsx)(a.rU,{className:"button orange",to:l,children:e},t)}))})})})},d=l.memo(r),u=t(5117),c=t(7374),A={title:"Yatzy ReactJS",text:"Play Yatzy ReactJS, a game developed by Jorge Rubiano @ostjh",url:window.location.origin},h=function(o){var n=o.isAuth,t=void 0!==n&&n;return(0,s.jsxs)("div",{className:"lobby-game-options",children:[(0,s.jsx)(c.Z,{data:A,children:(0,s.jsx)("button",{className:"lobby-game-options-button",title:"Share",children:(0,s.jsx)(u.Z,{type:"share"})})}),(0,s.jsx)(a.rU,{to:"/about",className:"lobby-game-options-button",title:"About",children:(0,s.jsx)(u.Z,{type:"info"})}),t&&(0,s.jsx)("a",{href:"/api/logout",className:"lobby-game-options-button",title:"Log out",children:(0,s.jsx)(u.Z,{type:"logout"})})]})},m=l.memo(h),g=t(8920),x="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAAFABAMAAAA/vriZAAAAJFBMVEXk5OT////o6Oj8/Pz09PT6+vrq6ur29vbv7+/4+Pju7u7x8fFtJpWJAAAEXUlEQVR42u3cSc8MURQG4KPQpo1XaY1Vi5mNMkWsNIKw0USwa0NErBASYmMWVkjEtDFFiI2IRPh1xq/r69L9dZVT1ffF+/yCk657T52695w2ERERERERERERERERERGhd3LngwTx4XM3jVF0K8GY+ELT2KxuY7z6B+NyG1mPjEjUwu/m8jzm7/FRR9hCf3ONw0sMsskYrMRg9y28mZjIMwuuhR9ol+GPB0z8kKMEE4ubFtQxDLPRQqphuI4FdATDzTMf/wokXoWLkcdaC+Ye8lhgoUxBPlsskOfIZ6GFESGvpgUxA3ndtSCuIK/5FkSCvGJz8O1h5n28CPnNsQBayK9hDp4kw5xopgDci3ASiphtDr4sSJsJ2yiibg7OPUK6S7p7hHWXTEUxe83B9x4hfZdcAbi38RmMIX3ZJRhDWnGhKHPwn3nwnYBMR1GXzcGdp/ky9TQUddoc3J+cfJ+ek1HUGpvI/xfgJGSR1dQK8J8PkH6T0AdIn6jpX3X0xQJ9uUVfsNKX/PwfTfSfnfQf7vRHH/SHR/THbxHGIUyD/EfA/Ifo9NcQ9Bc59Fdhv152pC+6v+I6lv5Cm74lgL+pgr4thb6xh741ir+5jL49j7/Bkb5FlL7Jlr9Nmb7Rm79Vnn7YgH9cg3/ghX5kyOwa+dAV/9jaoMG/RtNYsI9OfnMDWYeMy/HM+O4OY8M+AM0/Qi4iIuSWvdn+YP86YN2Gx9vvHDUyqz610aN+6YXxeHUPfSzYbRx6Ci2+mmvFGUygcdUCe4shnlhItTMYqtGxYGYlyCF+b4EsQU5bLYjlyO2sOTjio47w1/OlfcqzUNCId0qtjYLqjmzjaAdg7Qp4iT+w2QrzXyJytqaMLUDaZXgFvdg6A348YOaHfA/98NwcL4XDPnNwX85x3B0vxiAct+9RAlD/hIsB6p8wasOp3jQHV/c0RUP1GWSQVTWz0AdT6XoEDoPaVIhyjCvT+BsGCboJM3UWXdUVYTCKpupp8MvOAPLtYdc+9g9oBJ3dmInSPLMU1Xu42vfxc/hl24I5l2BFi7CGEnWsi+FzeDQfyJNQlnTEiXWP9OwSpmI61bDyoVT2E+sm7m5j1k2cbmO6ahroqapZs0w3zzAWg0hLQt40WEUibKFUc82MOE+nmZriZPo36Wk1ZzVYTUWYoFTx/xcgSqYAFaACVIAKUAEqQAWoABWgAlSAClABKkAFqAAVoAJUgAqQJkCdUf/zvyD9TdMVlCftwuS90F5jZZuOUl22b4gXYXcJcrYPjm8gZBqE+CUzEkHZmHLXUoxtC3OtGrUEpYg7Nh5fe9QWq8xyOGXHyRkjPGuVWgKnrVax6W041C9b5aJt+GPrmzYKx9sobLT/7hLdwh8Y6T/q1T6joKcdG63arQS5xRc6FsDJ88jl4E0LJXp3fmh0X5oW1qnrFxP0FT/c9do4RCfefNx58cD+dQkQr9tw4OG5PXdONE1EREREREREREREREQknK/sA4wh322NuwAAAABJRU5ErkJggg==",b=function(o){var n=o.photo,t=void 0===n?"":n,e=o.name,a=void 0===e?"":e;return(0,s.jsx)("img",{alt:"Avatar",className:"avatar-image",src:t||x,title:a,onError:function(o){var n=o.currentTarget;n.onerror=null,n.src=x}})},f=l.memo(b),j=t(2433),v=t(7698),E=t(4663),p=function(){var o,n,t,a=(0,g.C5)(),i=a.withSound,r=a.toggleSound,u=(0,l.useContext)(E.ZP);return(0,s.jsx)(e.FE,{showBack:!1,children:(0,s.jsxs)("div",{className:"lobby-game",children:[(null===u||void 0===u?void 0:u.isAuth)&&(0,s.jsx)(f,{photo:(null===(o=u.user)||void 0===o?void 0:o.photo)||"",name:(null===(n=u.user)||void 0===n?void 0:n.name)||""}),(0,s.jsx)(j.Z,{type:i?"sound-on":"sound-off",onClick:r}),(0,s.jsx)(v.Z,{}),(0,s.jsx)(d,{state:u}),(0,s.jsx)(m,{isAuth:null!==(t=null===u||void 0===u?void 0:u.isAuth)&&void 0!==t&&t})]})})},R=l.memo(p),U=function(){return(0,s.jsx)(R,{})},y=l.memo(U)}}]);