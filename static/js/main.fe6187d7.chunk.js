(this.webpackJsonp2048=this.webpackJsonp2048||[]).push([[0],{13:function(e,r,t){},14:function(e,r,t){},16:function(e,r,t){"use strict";t.r(r);var c=t(1),a=t.n(c),n=t(7),o=t.n(n),i=(t(13),t(14),t(3)),s=t(8),l=t(0),f=function(e){var r=[];return e.tiles&&(r=e.tiles.map((function(e,r){return Object(l.jsx)("div",{className:"tile",children:Object(l.jsx)("h2",{children:e||""})},r)}))),Object(l.jsx)("div",{id:"grid",children:r&&r})},j=function(e){return Object(l.jsxs)("div",{id:"arrows",children:[Object(l.jsx)("div",{id:"arrow-top",onClick:function(){return e.up()},children:Object(l.jsx)("i",{className:"far fa-arrow-alt-circle-up fa-3x"})}),Object(l.jsx)("div",{id:"arrow-right",onClick:function(){return e.right()},children:Object(l.jsx)("i",{className:"far fa-arrow-alt-circle-right fa-3x"})}),Object(l.jsx)("div",{id:"arrow-bottom",onClick:function(){return e.down()},children:Object(l.jsx)("i",{className:"far fa-arrow-alt-circle-down fa-3x"})}),Object(l.jsx)("div",{id:"arrow-left",onClick:function(){return e.left()},children:Object(l.jsx)("i",{className:"far fa-arrow-alt-circle-left fa-3x"})})]})},u=function(){return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("h2",{children:"How To Play"}),Object(l.jsxs)("p",{children:["Use ",Object(l.jsx)("i",{children:"Arrow Keys"}),", Or ",Object(l.jsx)("i",{children:"Arrow Buttons"})," To Move The Tiles. Tiles With The Same Number Will Combine Into One.",Object(l.jsx)("br",{}),"Check Out The Git Hub Repo",Object(l.jsx)("br",{}),Object(l.jsx)("a",{href:"https://github.com/philaung96/2048",target:"_blank",rel:"noreferrer",children:Object(l.jsx)("i",{children:"HERE"})})]})]})},d=t(6),b=t.n(d),h=function(){var e=Object(c.useState)(null),r=Object(s.a)(e,2),t=r[0],a=r[1],n=[],o=0,d=!1;t&&(n=Object(i.a)(t.tiles),o=t.score),Object(c.useEffect)((function(){if(localStorage.data){var e=JSON.parse(localStorage.getItem("data"));a({tiles:Object(i.a)(e.localTiles),best:e.localBest,score:e.localScore})}else h()}),[]);var h=function(){for(var e=Math.floor(16*Math.random()),r=[],t=0;t<16;t++)r[t]=t===e?2:0;var c=JSON.parse(localStorage.getItem("data")),s=0;c&&(s=c.localBest),localStorage.setItem("data",JSON.stringify({localTiles:Object(i.a)(n),localBest:s,localScore:o})),a({tiles:r,best:s,score:0})},O=function(){for(var e=Math.floor(16*Math.random());n[e]>0;)e=Math.floor(16*Math.random());n[e]=2;var r=JSON.parse(localStorage.getItem("data")),t=0;t=o>r.localBest?o:r.localBest,localStorage.setItem("data",JSON.stringify({localTiles:Object(i.a)(n),localBest:t,localScore:o})),n.every((function(e){return e>0}))&&!function(){for(var e=!1,r=function(e){return e+4<15&&n[e]===n[e+4]},t=function(e){return(e+1)/4===e/4&&n[e]===n[e+1]},c=0;c<15;c++)if(r(c)||t(c)){e=!0;break}return e}()?(console.log("game over"),h()):a({tiles:n,best:t,score:o})},v=function(e,r){return 4*e+r},x=function(e,r){var t=n[r]+n[e];n[r]===n[e]&&(o+=t),n[r]=t,n[e]=0,d=!0},m=function(e){for(var r=Math.floor(e/4),t=e-1,c=!1;!c;){if(n[t]>0)return t;(--t<0||Math.floor(t/4)!==r)&&(c=!0)}return-1},g=function(){for(var e=0;e<4;e++)for(var r=3;r>=1;r--){var t=v(e,r),c=m(t);-1!==c&&(0===n[t]?(x(c,t),r++):n[t]===n[c]?x(c,t):t-1!==c&&x(c,t-1))}d&&O()},p=function(e){for(var r=Math.floor(e/4),t=e+1,c=!1;!c;){if(n[t]>0)return t;(++t>15||Math.floor(t/4)!==r)&&(c=!0)}return-1},w=function(){for(var e=0;e<4;e++)for(var r=0;r<3;r++){var t=v(e,r),c=p(t);-1!==c&&(0===n[t]?(x(c,t),r--):n[t]===n[c]?x(c,t):t+1!==c&&x(c,t+1))}d&&O()},S=function(e){for(var r=e+4,t=!1;!t;){if(n[r]>0)return r;(r+=4)>15&&(t=!0)}return-1},k=function(){for(var e=0;e<4;e++)for(var r=0;r<3;r++){var t=v(r,e),c=S(t);-1!==c&&(0===n[t]?(x(c,t),r--):n[t]===n[c]?x(c,t):t+4!==c&&x(c,t+4))}d&&O()},N=function(e){for(var r=e-4,t=!1;!t;){if(n[r]>0)return r;(r-=4)<0&&(t=!0)}return-1},y=function(){for(var e=0;e<4;e++)for(var r=3;r>0;r--){var t=v(r,e),c=N(t);-1!==c&&(0===n[t]?(x(c,t),r++):n[t]===n[c]?x(c,t):t-4!==c&&x(c,t-4))}d&&O()},M=function(e){switch(e){case"ArrowLeft":w();break;case"ArrowUp":k();break;case"ArrowRight":g();break;case"ArrowDown":y()}};return b()("body").off("keyup"),b()("body").on("keyup",(function(e){e.preventDefault(),M(e.key)})),Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("h1",{children:"2048"}),Object(l.jsxs)("main",{children:[Object(l.jsxs)("section",{children:[t&&Object(l.jsxs)("div",{id:"scores",children:[Object(l.jsxs)("h3",{className:"score",children:["BEST : ",t.best]}),Object(l.jsxs)("h3",{className:"score",children:["SCORE : ",t.score]})]}),Object(l.jsx)("div",{id:"game",children:t&&Object(l.jsx)(f,{tiles:t.tiles,handleKeyPress:M})}),t&&Object(l.jsx)(j,{up:k,right:g,down:y,left:w})]}),Object(l.jsx)("aside",{id:"instruction",children:Object(l.jsx)(u,{})})]})]})};var O=function(){return Object(l.jsx)("div",{id:"App",children:Object(l.jsx)(h,{})})};o.a.render(Object(l.jsx)(a.a.StrictMode,{children:Object(l.jsx)(O,{})}),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.fe6187d7.chunk.js.map