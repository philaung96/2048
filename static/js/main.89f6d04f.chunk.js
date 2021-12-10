(this.webpackJsonp2048=this.webpackJsonp2048||[]).push([[0],{13:function(r,e,t){},14:function(r,e,t){},16:function(r,e,t){"use strict";t.r(e);var n=t(1),c=t.n(n),o=t(6),i=t.n(o),a=(t(13),t(14),t(7)),s=t(8),f=t(0),l=function(r){var e=[];return r.tiles&&(e=r.tiles.map((function(r,e){return Object(f.jsx)("div",{className:"tile",children:Object(f.jsx)("h2",{children:r||""})},e)}))),Object(f.jsxs)(f.Fragment,{children:[Object(f.jsxs)("h3",{id:"score",children:["SCORE : ",r.score]}),Object(f.jsx)("div",{id:"grid",children:e&&e})]})},u=function(r){return Object(f.jsxs)("div",{id:"arrows",children:[Object(f.jsx)("div",{id:"arrow-top",onClick:function(){return r.up()},children:Object(f.jsx)("i",{class:"far fa-arrow-alt-circle-up fa-3x"})}),Object(f.jsx)("div",{id:"arrow-right",onClick:function(){return r.right()},children:Object(f.jsx)("i",{class:"far fa-arrow-alt-circle-right fa-3x"})}),Object(f.jsx)("div",{id:"arrow-bottom",onClick:function(){return r.down()},children:Object(f.jsx)("i",{class:"far fa-arrow-alt-circle-down fa-3x"})}),Object(f.jsx)("div",{id:"arrow-left",onClick:function(){return r.left()},children:Object(f.jsx)("i",{class:"far fa-arrow-alt-circle-left fa-3x"})})]})},j=function(){return Object(f.jsxs)("div",{id:"instruction",children:[Object(f.jsx)("h2",{children:"How To Play"}),Object(f.jsxs)("p",{children:["Use Arrow Keys To Move The Tiles",Object(f.jsx)("br",{}),"Tiles With The Same Number Will Combine Into One"]})]})},d=t(5),h=t.n(d),b=function(){var r=Object(n.useState)({tiles:[],score:0}),e=Object(s.a)(r,2),t=e[0],c=e[1],o=Object(a.a)(t.tiles),i=t.score,d=!1;Object(n.useEffect)((function(){b()}),[]);var b=function(){for(var r=Math.floor(16*Math.random()),e=[],t=0;t<16;t++)e[t]=t===r?2:0;c({tiles:e,score:0})},v=function(){for(var r=Math.floor(16*Math.random());o[r]>0;)r=Math.floor(16*Math.random());o[r]=2,o.every((function(r){return r>0}))?b():c({tiles:o,score:i})},O=function(r,e){return 4*r+e},x=function(r,e){var t=o[e]+o[r];o[e]===o[r]&&(i+=t),o[e]=t,o[r]=0,d=!0},w=function(r){for(var e=Math.floor(r/4),t=r-1,n=!1;!n;){if(o[t]>0)return t;(--t<0||Math.floor(t/4)!==e)&&(n=!0)}return-1},p=function(){for(var r=0;r<4;r++)for(var e=3;e>=1;e--){var t=O(r,e),n=w(t);-1!==n&&(0===o[t]?(x(n,t),e++):o[t]===o[n]?x(n,t):t-1!==n&&x(n,t-1))}d&&v()},m=function(r){for(var e=Math.floor(r/4),t=r+1,n=!1;!n;){if(o[t]>0)return t;(++t>15||Math.floor(t/4)!==e)&&(n=!0)}return-1},k=function(){for(var r=0;r<4;r++)for(var e=0;e<3;e++){var t=O(r,e),n=m(t);-1!==n&&(0===o[t]?(x(n,t),e--):o[t]===o[n]?x(n,t):t+1!==n&&x(n,t+1))}d&&v()},M=function(r){for(var e=r+4,t=!1;!t;){if(o[e]>0)return e;(e+=4)>15&&(t=!0)}return-1},y=function(){for(var r=0;r<4;r++)for(var e=0;e<3;e++){var t=O(e,r),n=M(t);-1!==n&&(0===o[t]?(x(n,t),e--):o[t]===o[n]?x(n,t):t+4!==n&&x(n,t+4))}d&&v()},g=function(r){for(var e=r-4,t=!1;!t;){if(o[e]>0)return e;(e-=4)<0&&(t=!0)}return-1},A=function(){for(var r=0;r<4;r++)for(var e=3;e>0;e--){var t=O(e,r),n=g(t);-1!==n&&(0===o[t]?(x(n,t),e++):o[t]===o[n]?x(n,t):t-4!==n&&x(n,t-4))}d&&v()},C=function(r){switch(r){case"ArrowLeft":k();break;case"ArrowUp":y();break;case"ArrowRight":p();break;case"ArrowDown":A()}};return h()("body").off("keyup"),h()("body").on("keyup",(function(r){r.preventDefault(),C(r.key)})),Object(f.jsxs)("div",{id:"game",children:[Object(f.jsx)("h1",{children:"2048"}),Object(f.jsx)(l,{tiles:t.tiles,score:t.score,handleKeyPress:C}),Object(f.jsx)(u,{up:y,right:p,down:A,left:k}),Object(f.jsx)(j,{})]})};var v=function(){return Object(f.jsx)("div",{id:"App",children:Object(f.jsx)(b,{})})};i.a.render(Object(f.jsx)(c.a.StrictMode,{children:Object(f.jsx)(v,{})}),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.89f6d04f.chunk.js.map