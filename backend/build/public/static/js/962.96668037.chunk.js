"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[962],{8962:function(e,n,t){t.r(n),t.d(n,{default:function(){return _}});var r=t(8683),i=t(4165),o=t(5861),u=t(9439),c=t(6058),a=t(3433),s=t(9514),l=t(9735),d=t(4654),f=t.n(d),E=function(e,n){return n.filter((function(n){return n.value===e})).length},S=function(e,n){return E(e,n)*e},v=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:2,n=arguments.length>1?arguments[1]:void 0,t=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=!1,i=1;i<=6;i++){var o=E(i,n);if(r=t?o===e:o>=e)break}return r},O=function(e){for(var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:4,t=!1,r=(0,a.Z)(new Set(f()(e).map((function(e){return e.value})).sort((function(e,n){return e-n})))),i=1;;){if(!(i+(n-1)<=6))break;for(var o=0,u=0;u<n;u++)o+=r.includes(u+i)?1:0;if(i++,t=o===n)break}return t},y=function(e,n){return e.reduce((function(e,t){return e+t.score[n-1].value}),0)},T=function(e,n,t){var r=e.filter((function(e){return!e.score[n-1].isUsed})).map((function(e){return{index:e.index,score:e.score[n-1].temporal}})).sort((function(e,n){return t===l.C3.HARD?n.score-e.score:e.score-n.score})),i=r.filter((function(e){return 0!==e.score})),o=r.filter((function(e){return 0===e.score}));return(null===i||void 0===i?void 0:i[0])||(null===o||void 0===o?void 0:o[0])},I=function(){var e={value:0,temporal:0,isSelected:!1,isUsed:!1,isBonusYatzy:!1};return{UPPER_SECTION:new Array(6).fill(null).map((function(n,t){var r=[e,e];return{index:t,label:l._u[t],score:r,type:l.TG.UPPER_SECTION,value:t+1}})),LOWER_SECTION:l.aA.map((function(n,t){var r=[e,e];return{index:t,label:l.AA[t],score:r,type:l.TG.LOWER_SECTION,value:n}}))}},p=function(){return new Array(5).fill(null).map((function(e,n){return{index:n,value:0,selected:!1}}))},N=function(e){for(var n=f()(e),t=0;t<n.length;t++)n[t].selected||(n[t].value=(0,s.MH)(1,6));return n},R=function(e,n,t,r,i,o){var u=f()(e),c=f()(t),a=n.type,s=n.index,d=c[r-1].isBonusEarned,E=u[a][s].score[r-1].temporal,S=!1;if(o&&"YATZY"!==u[a][s].value){var v=u.LOWER_SECTION.findIndex((function(e){return"YATZY"===e.value}));S=u.LOWER_SECTION[v].score[r-1].isUsed}var O=E+(S?l.sF.YATZY:0);u[a][s].score[r-1].isSelected=!1,u[a][s].score[r-1].isUsed=!0,u[a][s].score[r-1].isBonusYatzy=!1,u[a][s].score[r-1].value=O;var T=y(u.UPPER_SECTION,r)+(d?l.IT:0);!d&&T>=l.a8&&(c[r-1].isBonusEarned=!0,T+=l.IT);var I=y(u.LOWER_SECTION,r);c[r-1].score=T+I,c[r-1].scoreBoard={UPPER_SECTION:T,LOWER_SECTION:I};var p=function(e,n){var t=n===l.SZ.SOLO?1:2;return Object.keys(l.TG).map((function(n){for(var r=e[n],i=r.length,o=0,u=0;u<i;u++){for(var c=0,a=0;a<t;a++)c+=r[u].score[a].isUsed?1:0;o+=c===t?1:0}return o===i})).every((function(e){return e}))}(u,i);return{copyBoardState:u,copyPlayers:c,isGameOver:p}},P=function(e,n){var t=f()(e),r=(0,s.MH)(0,4);if(n<l.kU&&r>0)for(var i=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,n=[];;){var t=(0,s.MH)(0,4);if(n.includes(t)||n.push(t),n.length===e)break}return n}(r),o=0;o<t.length;o++)t[o].selected=i.includes(o);return t},L=t(4832),Z=t(7313),x=t(3479),C=t(6417),U=function(e){var n=e.authUser,t=void 0===n?{}:n,a=e.difficulty,d=void 0===a?l.C3.EASY:a,E=e.initialTurn,y=void 0===E?2:E,U=e.opponent,_=void 0===U?{}:U,m=e.room,h=void 0===m?"":m,A=e.socket,Y=e.typeGame,H=void 0===Y?l.SZ.BOT:Y,g=(0,x.A4)(),B=(0,Z.useState)(I),k=(0,u.Z)(B,2),D=k[0],G=k[1],W=(0,Z.useState)((function(){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l.SZ.SOLO,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=e===l.SZ.SOLO?1:2,o={id:"",name:"",score:0,scoreBoard:{UPPER_SECTION:0,LOWER_SECTION:0},isBonusEarned:!1},u=new Array(i).fill(null).map((function(e,n){return(0,r.Z)((0,r.Z)({},o),{},{id:"player".concat(n+1),name:"Player ".concat(n+1)})}));return e!==l.SZ.SOLO&&e!==l.SZ.BOT||(u[0].name=l.ys.YOU),e===l.SZ.BOT&&(u[1].name=l.ys.BOT),u[0]=(0,r.Z)((0,r.Z)({},u[0]),n),e===l.SZ.ONLINE&&t&&(u[1]=(0,r.Z)((0,r.Z)({},u[1]),t)),u}(H,t,_)})),w=(0,u.Z)(W,2),b=w[0],z=w[1],F=(0,Z.useState)(H!==l.SZ.SOLO?y:1),j=(0,u.Z)(F,2),M=j[0],K=j[1],V=(0,Z.useState)((function(){return p()})),J=(0,u.Z)(V,2),$=J[0],q=J[1],Q=(0,Z.useState)(l.EU.HIDE),X=(0,u.Z)(Q,2),ee=X[0],ne=X[1],te=(0,Z.useState)(l.kU),re=(0,u.Z)(te,2),ie=re[0],oe=re[1],ue=(0,Z.useState)(!1),ce=(0,u.Z)(ue,2),ae=ce[0],se=ce[1],le=(0,Z.useState)(l.HI),de=(0,u.Z)(le,2),fe=de[0],Ee=de[1],Se=(0,Z.useState)(!1),ve=(0,u.Z)(Se,2),Oe=ve[0],ye=ve[1],Te=(0,Z.useState)({isYatzy:!1,value:H===l.SZ.FRIEND?"Player ".concat(M):"",counter:H===l.SZ.FRIEND?1:0}),Ie=(0,u.Z)(Te,2),pe=Ie[0],Ne=Ie[1],Re=(0,Z.useCallback)((function(e){if(e===l.yR.ROLL&&(fe.index>=0&&G((function(e){return function(e,n,t){var r=f()(e);return r[n.type][n.index].score[t-1].isSelected=!1,r[n.type][n.index].score[t-1].isBonusYatzy=!1,r}(e,fe,M)})),q((function(e){var n=N(e);return H===l.SZ.ONLINE&&(null===A||void 0===A||A.emit("ACTIONS",{room:h,diceValues:n,type:l.yR.ROLL})),n})),ne(l.EU.SPIN),oe((function(e){return e-1}))),e===l.yR.PLAY){var n=R(D,fe,b,M,H,ae),t=n.copyBoardState,r=n.copyPlayers,i=n.isGameOver;if(G(t),z(r),oe(l.kU),ne(l.EU.HIDE),q(p()),Ee(l.HI),ye(i),(0,L.H_)("click"),i&&(0,L.H_)("yatzy"),1===M&&H===l.SZ.ONLINE&&(null===A||void 0===A||A.emit("ACTIONS",{room:h,itemSelected:fe,isGameOver:i,type:l.yR.PLAY})),!i&&H!==l.SZ.SOLO){var o=1===M?2:1;K(o),H===l.SZ.FRIEND&&Ne((function(e){return{isYatzy:!1,value:"Player ".concat(o),counter:e.counter+1}}))}}}),[D,ae,fe,b,h,A,M,H]);(0,Z.useEffect)((function(){var e=H===l.SZ.BOT&&2===M,n=function(){var e=(0,o.Z)((0,i.Z)().mark((function e(){return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,s.gw)(1e3);case 2:q((function(e){return N(P(e,ie))})),ne(l.EU.SPIN),oe((function(e){return e-1}));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();if(!Oe&&e&&ee===l.EU.HIDE&&n(),e&&ee===l.EU.STOPPED){var t=function(e,n,t,r,i){var o=t===l.C3.MEDIUM?1===(0,s.MH)(0,1)?l.C3.HARD:l.C3.EASY:t,u=T(e.UPPER_SECTION,i,o),c=T(e.LOWER_SECTION,i,o),a=!1;(u||c)&&(u&&(a=0!==(null===u||void 0===u?void 0:u.score)),!a&&c&&(a=0!==(null===c||void 0===c?void 0:c.score)));var d=n>0&&!a&&!r,E=f()(l.HI);if(!d){if(r){var S=e.LOWER_SECTION.findIndex((function(e){return"YATZY"===e.value}));e.LOWER_SECTION[S].score[i-1].isUsed||(E.index=S,E.type=l.TG.LOWER_SECTION)}E.index<0&&(u&&c?E={HARD:u.score>c.score?{index:u.index,type:l.TG.UPPER_SECTION}:{index:c.index,type:l.TG.LOWER_SECTION},EASY:u.score<c.score?{index:u.index,type:l.TG.UPPER_SECTION}:{index:c.index,type:l.TG.LOWER_SECTION}}[o]:(u&&(E.index=u.index,E.type=l.TG.UPPER_SECTION),c&&(E.index=c.index,E.type=l.TG.LOWER_SECTION)))}return{rollAgain:d,itemSelected:E}}(D,ie,d,ae,M),r=t.rollAgain,u=void 0!==r&&r,c=t.itemSelected;u?n():Ee(c)}Oe||ee!==l.EU.SPIN||(0,L.H_)("dice")}),[D,ee,d,Oe,ae,ie,M,H]),(0,Z.useEffect)((function(){var e=H===l.SZ.BOT&&2===M,n=H===l.SZ.ONLINE&&2===M,t=function(){var e=(0,o.Z)((0,i.Z)().mark((function e(){return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,s.gw)(2e3);case 2:Re(l.yR.PLAY);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();(e||n)&&fe.index>=0&&(e?t():Re(l.yR.PLAY))}),[Re,fe,M,H]),(0,Z.useEffect)((function(){A&&(A.on("OPPONENT_LEAVE",(function(){g({message:{title:"Opponent offline \ud83d\ude2d",icon:"error",timer:5e3}})})),A.on(l.yR.ROLL,(function(e){q(e.diceValues),ne(l.EU.SPIN),oe((function(e){return e-1}))})),A.on(l.yR.PLAY,(function(e){Ee(e.itemSelected)})))}),[g,A]);var Pe=H===l.SZ.ONLINE?{stop:ee===l.EU.SPIN&&!Oe,onEndCountdown:function(e){1===e&&g({message:{title:"You've run out of time",icon:"info",timer:5e3}})}}:void 0,Le=1===M||H===l.SZ.FRIEND,Ze=!Oe&&(H===l.SZ.BOT||H===l.SZ.ONLINE)&&2===M,xe=Ze||Oe||ee===l.EU.SPIN||ie<=0||0===function(e){return e.filter((function(e){return!e.selected})).length}($),Ce=Ze||ee===l.EU.SPIN||fe.index<0,Ue=!Oe&&ee!==l.EU.HIDE&&Le,_e=l._B[Le?"WHITE":"RED"],me=Le&&ee===l.EU.STOPPED;return(0,C.jsxs)(c.sw,{blockContent:Ze,children:[Oe&&(0,C.jsx)(c.N0,{players:b}),(0,C.jsx)(c.xP,(0,r.Z)({},pe)),(0,C.jsx)(c.h4,{countdown:Pe,players:b,turn:M}),(0,C.jsx)(c.$l,{items:D,players:b,thrownDice:me,turn:M,typeGame:H,handleClick:function(e,n){var t=function(e,n,t,r){var i=arguments.length>4&&void 0!==arguments[4]&&arguments[4],o=f()(e),u=f()(l.HI),c=!1;if(!o[t.type][t.index].score[r-1].isUsed){if(n.index>=0&&(o[n.type][n.index].score[r-1].isSelected=!1,o[n.type][n.index].score[r-1].isBonusYatzy=!1),n.index!==t.index||n.type!==t.type){u.index=t.index,u.type=t.type,o[t.type][t.index].score[r-1].isSelected=!0;var a=0!==o.LOWER_SECTION.filter((function(e){return"YATZY"===e.value&&e.score[r-1].isUsed})).length;o[t.type][t.index].score[r-1].isBonusYatzy=a&&i}c=!0}return{changeState:c,copyBoardState:o,newItemSelected:u}}(D,fe,e,n,ae),r=t.changeState,i=t.copyBoardState,o=t.newItemSelected;r&&((0,L.H_)("click"),G(i),Ee(o))}}),(0,C.jsx)(c.WN,{dieState:ee,values:$,diceTheme:_e,handleDoneDices:function(){var e=function(e,n){for(var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,r=JSON.parse(JSON.stringify(e)),i=function(e){return e.reduce((function(e,n){return e+n.value}),0)}(n),o=v(3,n),u=v(4,n),c=v(3,n,!0)&&v(2,n,!0),a=O(n,4),s=O(n,5),d=v(5,n),f={THREE_KIND:o?i:0,FOUR_KIND:u?i:0,FULL_HOUSE:c?l.sF.FULLHOUSE:0,SMALL_STRAIGHT:a?l.sF.SMALL_STRAIGHT:0,LARGE_STRAIGHT:s?l.sF.LARGE_STRAIGHT:0,YATZY:d?l.sF.YATZY:0,CHANCE:i},E=0;E<r.UPPER_SECTION.length;E++){var y;if(null===(y=r.UPPER_SECTION[E].score[t-1])||void 0===y||!y.isUsed){var T=r.UPPER_SECTION[E].value,I=S(T,n);r.UPPER_SECTION[E].score[t-1].temporal=I}}for(var p=0;p<r.LOWER_SECTION.length;p++){var N,R=r.LOWER_SECTION[p].value;null!==(N=r.LOWER_SECTION[p].score[t-1])&&void 0!==N&&N.isUsed||(r.LOWER_SECTION[p].score[t-1].temporal=f[R])}return{isYatzy:d,copyBoardState:r}}(D,$,M),n=e.copyBoardState,t=e.isYatzy;G(n),se(t),ne(l.EU.STOPPED),Ee(l.HI),t&&(Ne((function(e){return{isYatzy:!0,value:"Yatzy",counter:e.counter+1}})),(0,L.H_)("yatzy"))},handleSelectDice:function(e){(0,L.H_)("click"),q(function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,t=f()(e);return t[n].selected=!t[n].selected,t}($,e))}}),(0,C.jsx)(c.EK,{disabledPlay:Ce,disabledRoll:xe,showPlay:Ue,throwing:ie,handleClick:Re})]})},_=Z.memo(U)}}]);