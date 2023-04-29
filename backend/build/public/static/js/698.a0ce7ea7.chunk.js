"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[698],{744:function(e,n,r){r.d(n,{rx:function(){return s},CZ:function(){return m},pN:function(){return x},DX:function(){return w},MK:function(){return S},s3:function(){return T}});var t=r(9735),o=r(7313),a=r(6417),i=function(e){var n=e.label,r=void 0===n?"":n,o=e.typeGame,i=void 0===o?t.SZ.SOLO:o;return(0,a.jsx)("div",{className:"board-header-panel",children:i===t.SZ.SOLO?r:(0,a.jsxs)("div",{className:"board-header-panel-player",children:[(0,a.jsx)("div",{children:t.ys[i===t.SZ.BOT||i===t.SZ.ONLINE?"YOU":"PLAYER1"]}),(0,a.jsx)("div",{children:i===t.SZ.BOT?t.ys.BOT:i===t.SZ.ONLINE?t.ys.THEM:t.ys.PLAYER2})]})})},c=function(e){var n=e.typeGame,r=void 0===n?t.SZ.SOLO:n;return(0,a.jsx)("div",{className:"board-header",children:t.XW.map((function(e,n){return(0,a.jsx)(i,{label:e,typeGame:r},n)}))})},s=o.memo(c),l=r(5117),d={THREE_KIND:"3x",FOUR_KIND:"4x",FULL_HOUSE:(0,a.jsx)(l.Z,{type:"full-house",fill:"white"}),SMALL_STRAIGHT:(0,a.jsxs)("div",{className:"board-item-straight",children:[(0,a.jsx)(l.Z,{type:"cards",fill:"white"}),(0,a.jsx)("div",{children:"Small"})]}),LARGE_STRAIGHT:(0,a.jsxs)("div",{className:"board-item-straight",children:[(0,a.jsx)(l.Z,{type:"cards",fill:"white"}),(0,a.jsx)("div",{children:"Large"})]}),YATZY:(0,a.jsx)("div",{className:"board-item-yatzy",children:"Yatzy"}),CHANCE:"?"},u=function(e){var n=e.label,r=void 0===n?"":n,o=e.size,i=void 0===o?50:o,c=e.type,s=void 0===c?t.TG.UPPER_SECTION:c,l=e.value,u=void 0===l?1:l;return(0,a.jsx)("div",{className:"board-item ".concat(s.toLowerCase()," ").concat(s===t.TG.UPPER_SECTION?"dice-".concat(u):""),style:{width:i,height:i},title:r||u.toString(),children:s===t.TG.LOWER_SECTION&&d[u]})},m=o.memo(u),h=r(8683),v=function(e){var n=e.item,r=e.thrownDice,o=void 0!==r&&r,i=e.turn,c=void 0===i?1:i,s=e.player,l=void 0===s?1:s,d=e.handleClick,u=n.score[l-1],m=u.isSelected,h=u.isUsed,v=u.temporal,f=u.value,x=u.isBonusYatzy,j=!(c===l&&o&&!h),p=o&&c===l||h?h?f:v:"",b=n.label+(""!==p?" = ".concat(p):""),N=h?"used-score":c===l?"turn":"",y=c===l&&o?h?"used":"active":"",w=m?"selected":"";return(0,a.jsxs)("button",{title:b,disabled:j,className:"board-panel-row-score-button ".concat(N," ").concat(y," ").concat(w),onClick:function(){return d(n,l)},children:[p,x&&(0,a.jsx)("span",{children:t.sF.YATZY})]})},f=function(e){var n=e.item,r=e.thrownDice,o=void 0!==r&&r,i=e.typeGame,c=void 0===i?t.SZ.SOLO:i,s=e.turn,l={item:n,thrownDice:o,turn:void 0===s?1:s,handleClick:e.handleClick};return(0,a.jsxs)("div",{className:"board-panel-row-category",children:[(0,a.jsx)("div",{className:"board-panel-row-item",children:(0,a.jsx)(m,{type:n.type,value:n.value,label:n.label})}),(0,a.jsxs)("div",{className:"board-panel-row-score",children:[(0,a.jsx)(v,(0,h.Z)((0,h.Z)({},l),{},{player:1})),c===t.SZ.SOLO?(0,a.jsx)("div",{className:"board-panel-row-score-label",children:n.label}):(0,a.jsx)(v,(0,h.Z)((0,h.Z)({},l),{},{player:2}))]})]})},x=o.memo(f),j=r(6058),p=function(){return(0,a.jsxs)("div",{className:"board-panel-score-bonus",children:[(0,a.jsx)("div",{children:t.ys.BONUS}),(0,a.jsxs)("div",{children:["+",t.IT]})]})},b=function(e){var n=e.value,r=void 0===n?0:n;return(0,a.jsxs)("div",{className:"board-panel-score-item",children:[(0,a.jsx)(j.gZ,{score:r,className:"board-panel-score-item-score"}),(0,a.jsxs)("div",{className:"board-panel-score-item-bonus",children:["/",t.a8]})]})},N=function(){return(0,a.jsxs)("div",{className:"board-panel-score-bonus-earned",children:[(0,a.jsxs)("span",{children:["+",t.IT]}),(0,a.jsx)(l.Z,{type:"check",fill:"#fdb823"})]})},y=function(e){var n=e.players;return(0,a.jsxs)("div",{className:"board-panel-score",children:[(0,a.jsx)(p,{}),(0,a.jsx)("div",{className:"board-panel-score-items",children:n.map((function(e){var n,r=e.id,t=e.isBonusEarned,o=e.scoreBoard;return t?(0,a.jsx)(N,{},r):(0,a.jsx)(b,{value:null!==(n=o.UPPER_SECTION)&&void 0!==n?n:0},r)}))})]})},w=o.memo(y),E=function(e){var n=e.items,r=e.players,o=e.thrownDice,i=void 0!==o&&o,c=e.turn,s=void 0===c?1:c,l=e.typeGame,d=void 0===l?t.SZ.SOLO:l,u=e.handleClick;return(0,a.jsx)("div",{className:"board-table-row-wrapper",children:new Array(7).fill(null).map((function(e,t){return(0,a.jsxs)("div",{className:"board-table-row",children:[(0,a.jsx)("div",{className:"board-table-row-item",children:t<6?(0,a.jsx)(x,{item:n.UPPER_SECTION[t],thrownDice:i,turn:s,typeGame:d,handleClick:u}):(0,a.jsx)(w,{players:r})}),(0,a.jsx)("div",{className:"board-table-row-item",children:(0,a.jsx)(x,{item:n.LOWER_SECTION[t],thrownDice:i,turn:s,typeGame:d,handleClick:u})})]},t)}))})},S=o.memo(E),C=function(e){var n=e.children;return(0,a.jsx)("div",{className:"board-wrapper",children:n})},T=o.memo(C)},6058:function(e,n,r){r.d(n,{$l:function(){return s},EK:function(){return u},WN:function(){return y},xP:function(){return S},sw:function(){return T},h4:function(){return H},gZ:function(){return z},N0:function(){return J}});var t=r(8683),o=r(744),a=r(7313),i=r(6417),c=function(e){return(0,i.jsxs)(o.s3,{children:[(0,i.jsx)(o.rx,{typeGame:e.typeGame}),(0,i.jsx)(o.MK,(0,t.Z)({},e))]})},s=a.memo(c),l=r(9735),d=function(e){var n=e.disabledPlay,r=void 0!==n&&n,t=e.disabledRoll,o=void 0!==t&&t,a=e.showPlay,c=void 0!==a&&a,s=e.throwing,d=void 0===s?l.kU:s,u=e.handleClick;return(0,i.jsxs)("div",{className:"game-buttons",children:[(0,i.jsxs)("button",{className:"button game-buttons-roll",disabled:o,onClick:function(){return u(l.yR.ROLL)},children:[l.ys.ROLL,(0,i.jsx)("span",{children:d})]}),c&&(0,i.jsx)("button",{className:"button orange",disabled:r,onClick:function(){return u(l.yR.PLAY)},children:l.ys.PLAY})]})},u=a.memo(d),m=r(1249),h=r.n(m),v={WHITE:{dotColor:"black",faceColor:"white"},RED:{dotColor:"white",faceColor:"red"}},f=function(e){var n=e.dice,r=void 0===n?{index:0,value:0,selected:!1}:n,t=e.diceTheme,o=void 0===t?l._B.WHITE:t,c=e.dieState,s=void 0===c?l.EU.HIDE:c,d=e.handleDone,u=e.handleSelectDice,m=(0,a.useRef)(null),f=s!==l.EU.SPIN||r.selected?0:.5+.15*r.index,x="Dice ".concat(r.index+1)+(s===l.EU.STOPPED?" = ".concat(r.value):""),j="dices-button ".concat(r.selected?"selected":""," ").concat(s===l.EU.HIDE?"hide":""),p=!(s===l.EU.STOPPED)||o===l._B.RED,b=v[o],N=b.dotColor,y=b.faceColor;return(0,a.useEffect)((function(){var e,n=r.value,t=r.selected;0===n||t||(null===(e=m.current)||void 0===e||e.rollAll([n]))}),[m,r]),(0,i.jsx)("button",{className:j,disabled:p,title:x,onClick:function(){return u(r.index)},children:(0,i.jsx)(h(),{dieSize:52,disableIndividual:!0,dotColor:N,faceColor:y,numDice:1,outline:!0,outlineColor:"white",rollDone:d,rollTime:f,ref:m})})},x=a.memo(f),j=function(e){var n=e.children;return(0,i.jsx)("div",{className:"dices-wrapper",children:n})},p=a.memo(j),b=[],N=function(e){var n=e.diceTheme,r=void 0===n?l._B.WHITE:n,t=e.dieState,o=void 0===t?l.EU.HIDE:t,a=e.values,c=void 0===a?[]:a,s=e.handleDoneDices,d=e.handleSelectDice;return(0,i.jsx)(p,{children:c.map((function(e){return(0,i.jsx)(x,{dice:e,diceTheme:r,dieState:o,handleSelectDice:d,handleDone:function(){return o===l.EU.SPIN&&function(e,n,r){if(!b.includes(e)){b.push(e);var t=n.filter((function(e){return!e.selected})).length;0!==t&&b.length===t&&(b=[],r())}}(e.index+1,c,s)}},"dice-".concat(e.index))}))})},y=a.memo(N),w=r(9439),E=function(e){var n=e.isYatzy,r=void 0!==n&&n,t=e.value,o=void 0===t?"":t,c=e.counter,s=void 0===c?0:c,l=(0,a.useState)(!1),d=(0,w.Z)(l,2),u=d[0],m=d[1];(0,a.useEffect)((function(){var e;return 0!==s&&(m(!0),e=setTimeout((function(){m(!1)}),1500)),function(){e&&clearTimeout(e)}}),[s]);var h=r?"game-messages-wrapper-yatzy":"game-messages-wrapper";return(0,i.jsx)("div",{className:"game-messages ".concat(u?"show":"hide"),children:(0,i.jsx)("div",{className:h,children:o})})},S=a.memo(E),C=function(e){var n=e.blockContent,r=void 0!==n&&n,t=e.children;return(0,i.jsxs)("div",{className:"game-wrapper",children:[r&&(0,i.jsx)("div",{className:"game-wrapper-block-content"}),t]})},T=a.memo(C),g=r(4621),Z=r.n(g),k=r(8920),O=function(e){var n=e.initialValue,r=void 0===n?l.Ze:n,t=e.intervalTime,o=void 0===t?l.fM:t,c=e.stopCounter,s=void 0!==c&&c,d=e.handleEndCountdown,u=(0,a.useState)(r),m=(0,w.Z)(u,2),h=m[0],v=m[1],f=(0,a.useState)(!0),x=(0,w.Z)(f,2),j=x[0],p=x[1];return(0,a.useEffect)((function(){return p(!s)}),[s]),(0,k.Yz)((function(){var e=h-1;e>=0&&v(e),0===e&&(p(!1),d())}),j?o:null),(0,i.jsx)("div",{className:"header-players-countdown ".concat(h<=10?"end-time":""),children:"".concat(h<=9?"0".concat(h):h)})},A=a.memo(O),D=function(e){var n=e.children;return(0,i.jsx)("div",{className:"header-wrapper",children:n})},L=a.memo(D),I=function(e){var n=e.countdown,r=e.players,t=e.turn,o=void 0===t?1:t;return(0,i.jsx)("div",{className:"header-players",children:r.map((function(e,r){return(0,i.jsx)(P,{countdown:n,isSelected:o===r+1,player:e,turn:o},e.id)}))})},R=a.memo(I),_=function(e){var n=e.countdown,r=e.isSelected,t=void 0!==r&&r,o=e.player,a=o.name,c=o.score,s=e.turn,l=void 0===s?1:s;return(0,i.jsxs)("div",{className:"header-players-item",children:[(0,i.jsx)(z,{score:c,className:"header-players-item-score ".concat(t?"selected":"")}),(0,i.jsx)("div",{className:"header-players-item-name",children:a}),t&&n&&(0,i.jsx)("div",{className:"header-players-item-countdown",children:(0,i.jsx)(A,{stopCounter:n.stop,handleEndCountdown:function(){return n.onEndCountdown(l)}})})]})},P=a.memo(_),U=r(8467),Y=r(2433),G=function(e){var n=(0,k.C5)(),r=n.withSound,o=n.toggleSound,a=(0,U.s0)();return(0,i.jsxs)(L,{children:[(0,i.jsx)(Y.Z,{type:"back",onClick:function(){return e=function(e){return e&&a("/")},void Z()({title:"Exit",text:"Are you sure you want to quit the game?",icon:"info",closeOnClickOutside:!1,closeOnEsc:!1,buttons:["NO","YES"]}).then((function(n){return e(!!n)}));var e}}),(0,i.jsx)(R,(0,t.Z)({},e)),(0,i.jsx)(Y.Z,{type:r?"sound-on":"sound-off",onClick:o})]})},H=a.memo(G),M=function(e){var n=e.score,r=void 0===n?0:n,t=e.className,o=void 0===t?"":t,c=e.index,s=void 0===c?0:c,l=e.intervalTime,d=void 0===l?50:l,u=e.handleEndTimer,m=(0,a.useState)(0),h=(0,w.Z)(m,2),v=h[0],f=h[1],x=(0,a.useState)(0),j=(0,w.Z)(x,2),p=j[0],b=j[1],N=(0,a.useState)(!1),y=(0,w.Z)(N,2),E=y[0],S=y[1];return(0,a.useEffect)((function(){r!==v&&(f(r),S(!0))}),[v,r]),(0,k.Yz)((function(){var e=p+1;b(e),e===v&&(S(!1),u&&u(s))}),E?d:null),(0,i.jsx)("div",{className:"".concat(o," ").concat(E?"score-counter":""),children:p})},z=a.memo(M),B=function(e){var n=e.index,r=void 0===n?0:n,t=e.score,o=void 0===t?0:t,a=e.name,c=void 0===a?"":a,s=e.handleShowScore;return(0,i.jsxs)("div",{className:"score-game-value-item item-".concat(r),children:[(0,i.jsx)(z,{className:"score-game-value-value",index:r,intervalTime:10,score:o,handleEndTimer:s}),c&&(0,i.jsx)("div",{className:"score-game-value-name",children:c})]})},W=a.memo(B),$=r(8187),F=r.n($),K=r(5117),X=r(7374),q=function(e){var n=e.players,r=(0,U.s0)(),t=(0,a.useState)(0),o=(0,w.Z)(t,2),c=o[0],s=o[1],d=(0,a.useState)(!1),u=(0,w.Z)(d,2),m=u[0],h=u[1];(0,a.useEffect)((function(){return h(c===n.length)}),[c,n]);var v=1===n.length?l.ys.AMAZING_SCORE:n[0].score===n[1].score?l.ys.TIE:n[0].score>n[1].score?l.ys.WON:l.ys.LOSE,f={title:"Yatzy ReactJS",text:"I got a score of ".concat(n[0].score," points in Yatzy ReactJS."),url:window.location.origin};return(0,i.jsx)(F(),{children:(0,i.jsx)("div",{className:"score-game",children:(0,i.jsxs)("div",{className:"score-game-wrapper ".concat(m?"show":""),children:[(0,i.jsx)(Y.Z,{onClick:function(){return r("/")}}),(0,i.jsx)("div",{className:"score-game-value",children:n.map((function(e,r){var t=e.id,o=e.score,a=e.name;return(0,i.jsx)(W,{index:r+1,name:2===n.length?a:"",score:o,handleShowScore:function(){return s((function(e){return e+1}))}},t)}))}),(0,i.jsx)("div",{className:"score-game-message",children:v}),(0,i.jsxs)("div",{className:"score-game-buttons",children:[(0,i.jsx)("button",{className:"button orange score-game-buttons-play",onClick:function(){return r("/")},children:"Play Again"}),(0,i.jsxs)("div",{className:"score-game-buttons-bottom",children:[(0,i.jsx)("button",{title:"Return to lobby",onClick:function(){return r("/")},children:(0,i.jsx)(K.Z,{type:"full-house",fill:"white"})}),(0,i.jsx)(X.Z,{data:f,children:(0,i.jsx)("button",{title:"Share",children:(0,i.jsx)(K.Z,{type:"share",fill:"white"})})})]})]})]})})})},J=a.memo(q)},7698:function(e,n,r){r.d(n,{Z:function(){return l}});var t=r(9439),o=r(744),a=r(9514),i=r(7313),c=r(6417),s=function(){var e=(0,i.useState)((0,a.MH)(1,6)),n=(0,t.Z)(e,1)[0];return(0,c.jsxs)("div",{className:"logo",children:[(0,c.jsx)("h1",{className:"logo-label",children:"YATZY"}),(0,c.jsx)("div",{className:"logo-dices",children:new Array(5).fill(null).map((function(e,r){return(0,c.jsx)(o.CZ,{value:n},r)}))})]})},l=i.memo(s)},7374:function(e,n,r){r.d(n,{Z:function(){return C}});var t=r(9439),o=r(4621),a=r.n(o),i=function(){a()({title:"Thanks for sharing!",closeOnEsc:!1,icon:"success",timer:3e3})},c=r(8683),s=r(9514),l=r(1168),d=r(5117),u=r(7313),m=r(6417),h=[{icon:"copy",label:"Copy",action:"copy"},{icon:"twitter",label:"Twitter",action:"twitter",url:"https://twitter.com/intent/tweet?text=DATA_TEXT&url=DATA_URL"},{icon:"facebook",label:"Facebook",action:"facebook",url:"https://www.facebook.com/sharer/sharer.php?u=DATA_URL&quote=DATA_TEXT"},{icon:"linkedin",label:"Linkedin",action:"linkedin",url:"https://www.linkedin.com/shareArticle?mini=true&url=DATA_URL&title=DATA_TITLE&summary=DATA_TEXT&source=LinkedIn"}],v=function(e){var n=e.data,r=e.onCloseModal;return(0,m.jsx)("div",{className:"modal-share-buttons",children:h.map((function(e){return(0,m.jsxs)("div",{className:"modal-share-button",children:[(0,m.jsx)("button",{onClick:function(){return function(e){if("copy"===e.action)(0,s.vQ)("".concat(n.text," ").concat(n.url));else{var t=e.url;Object.keys(n).forEach((function(e){var r;return t=null===(r=t)||void 0===r?void 0:r.replace("DATA_".concat(e.toUpperCase()),encodeURIComponent(n[e]))})),window.open(t,"_blank")}r&&r(!0)}(e)},children:(0,m.jsx)(d.Z,{type:e.icon,fill:"black"})}),(0,m.jsx)("span",{children:e.label})]},e.icon)}))})},f=u.memo(v),x=function(e){var n=e.label,r=void 0===n?"Share...":n,t=e.onCloseModal;return(0,m.jsxs)("div",{className:"modal-share-header",children:[(0,m.jsx)("h4",{children:r}),(0,m.jsx)("button",{onClick:function(){return t()},children:(0,m.jsx)(d.Z,{type:"close",fill:"black"})})]})},j=u.memo(x),p=r(8187),b=r.n(p),N="overlay-share",y=function(e){var n=(0,u.useState)(),r=(0,t.Z)(n,2),o=r[0],a=r[1];return(0,u.useEffect)((function(){if(!o)if((0,s.$)("#".concat(N)))a((0,s.$)("#".concat(N)));else{var e,n=document.createElement("div");n.id=N,null===(e=(0,s.$)(".screen"))||void 0===e||e.appendChild(n),a(n)}return function(){var e;o&&(0,s.$)(".screen")&&(null===(e=(0,s.$)(".screen"))||void 0===e||e.removeChild(o))}}),[o]),o?(0,l.createPortal)((0,m.jsx)(b(),{children:(0,m.jsxs)("div",{className:"modal-share-wrapper",children:[(0,m.jsx)(j,{onCloseModal:e.onCloseModal}),(0,m.jsx)(f,(0,c.Z)({},e))]})}),o):null},w=u.memo(y),E="share"in navigator,S=function(e){var n=e.children,r=e.data,o=e.useNativeOption,c=void 0===o||o,s=(0,u.useState)(!1),l=(0,t.Z)(s,2),d=l[0],h=l[1];return(0,m.jsxs)(u.Fragment,{children:[u.cloneElement(n,{onClick:function(){E&&c?function(e){navigator.share(e).then((function(e){return i()})).catch((function(){a()({title:"Error",text:"Sharing failed :(",closeOnEsc:!1,icon:"error"})}))}(r):h(!0)}}),d&&(0,m.jsx)(w,{data:r,onCloseModal:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0]&&i(),h(!1)}})]})},C=u.memo(S)}}]);