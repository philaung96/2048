(this.webpackJsonp2048=this.webpackJsonp2048||[]).push([[0],{13:function(e,t,r){},14:function(e,t,r){},16:function(e,t,r){"use strict";r.r(t);var c=r(1),n=r.n(c),a=r(8),o=r.n(a),i=(r(13),r(5)),s=(r(14),r(3)),l=r(0),j=function(e){var t,r=Object(s.a)(e.leaders);return r.length>10&&r.splice(10,e.leaders.length-10),t=r.map((function(e,t){return Object(l.jsx)("li",{className:"user-info",children:Object(l.jsxs)("p",{children:[t+1," - ",e.name," : ",e.score]})},t)})),Object(l.jsxs)("section",{id:"leaderboard",children:[Object(l.jsx)("h2",{children:"TOP 10"}),Object(l.jsx)("ul",{id:"top-ten",children:t})]})},u=function(){return Object(l.jsxs)("aside",{id:"instruction",children:[Object(l.jsx)("h2",{children:"How To Play"}),Object(l.jsxs)("p",{children:["- Use ",Object(l.jsx)("i",{children:"Arrow Keys"}),Object(l.jsxs)("span",{id:"arrows-p",children:[", Or ",Object(l.jsx)("i",{children:"Arrow Buttons"})]})," ","To Move The Tiles.",Object(l.jsx)("br",{}),"- Tiles With The Same Number Will Combine Into One.",Object(l.jsx)("br",{}),"- Check Out The Git Hub Repo",Object(l.jsx)("br",{}),Object(l.jsx)("a",{href:"https://github.com/philaung96/2048",target:"_blank",rel:"noreferrer",children:Object(l.jsx)("i",{children:"HERE"})}),Object(l.jsx)("br",{}),"- Check Out My Portfolio",Object(l.jsx)("br",{}),Object(l.jsx)("a",{href:"https://philaung96.github.io/",target:"_blank",rel:"noreferrer",children:Object(l.jsx)("i",{children:"HERE"})})]})]})},f=function(e){var t=[];return e.tiles&&(t=e.tiles.map((function(e,t){return Object(l.jsx)("div",{className:"tile",children:Object(l.jsx)("h4",{children:e||""})},t)}))),Object(l.jsx)("div",{id:"grid",children:t&&t})},d=function(e){return Object(l.jsxs)("div",{id:"arrows",children:[Object(l.jsx)("div",{id:"arrow-top",onClick:function(){return e.up()},children:Object(l.jsx)("i",{className:"far fa-arrow-alt-circle-up fa-4x"})}),Object(l.jsx)("div",{id:"arrow-right",onClick:function(){return e.right()},children:Object(l.jsx)("i",{className:"far fa-arrow-alt-circle-right fa-4x"})}),Object(l.jsx)("div",{id:"arrow-bottom",onClick:function(){return e.down()},children:Object(l.jsx)("i",{className:"far fa-arrow-alt-circle-down fa-4x"})}),Object(l.jsx)("div",{id:"arrow-left",onClick:function(){return e.left()},children:Object(l.jsx)("i",{className:"far fa-arrow-alt-circle-left fa-4x"})})]})},h=r(2),b=r.n(h),O=function(e){var t=Object(c.useState)(),r=Object(i.a)(t,2),n=r[0],a=r[1],o=Object(c.useState)([]),j=Object(i.a)(o,2),u=j[0],h=j[1],O=[],p=0,v=!1;n&&(O=Object(s.a)(n.tiles),p=n.score),Object(c.useEffect)((function(){if(localStorage.data){var e=JSON.parse(localStorage.getItem("data"));a({tiles:Object(s.a)(e.localTiles),best:e.localBest,score:e.localScore})}else x()}),[]);var x=function(){for(var e=[],t=0;t<16;t++)e[t]=0;var r=Math.floor(16*Math.random());e[r]=2;var c=r;do{r=Math.floor(16*Math.random())}while(r===c);e[r]=4;var n=JSON.parse(localStorage.getItem("data")),o=0;n&&(o=n.localBest),localStorage.setItem("data",JSON.stringify({localTiles:[].concat(e),localBest:o,localScore:p})),a({tiles:e,best:o,score:0})};Object(c.useEffect)((function(){O.every((function(e){return e>0}))&&!function(){for(var e=!1,t=function(e){return e+4<=15&&O[e]===O[e+4]},r=function(e){var t=Math.floor(e/4);return Math.floor((e+1)/4)===t&&O[e]===O[e+1]},c=0;c<15;c++)if(t(c)||r(c)){e=!0;break}return e}()&&function(){b()("#game-over").slideDown();var t=["!!! GAME OVER !!!"],r=e.leaders.findIndex((function(e){return p>e.score}));if(r>-1&&r<=9)t.push("Congratulations! you place ".concat(r+1," on Top 10")),b()("#restart").slideUp();else{b()("#game-over form").slideUp();var c=0;e.leaders[9]&&(c=e.leaders[9].score-p),t.push("You are ".concat(c," points off from top 10"))}h(t)}()}),[n,e]);var m=function(){b()("#game-over").fadeOut(),p=0,x()},g=function(){for(var e=Math.floor(16*Math.random());O[e]>0;)e=Math.floor(16*Math.random());var t=Math.ceil(1e3*Math.random());O[e]=t<=800?2:4;var r=JSON.parse(localStorage.getItem("data")),c=0;c=p>r.localBest?p:r.localBest,localStorage.setItem("data",JSON.stringify({localTiles:Object(s.a)(O),localBest:c,localScore:p})),a({tiles:O,best:c,score:p})},w=function(e,t){return 4*e+t},S=function(e,t){var r=O[t]+O[e];O[t]===O[e]&&(p+=r),O[t]=r,O[e]=0,v=!0},k=function(e){for(var t=Math.floor(e/4),r=e-1,c=!1;!c;){if(O[r]>0)return r;(--r<0||Math.floor(r/4)!==t)&&(c=!0)}return-1},M=function(){for(var e=0;e<4;e++)for(var t=3;t>=1;t--){var r=w(e,t),c=k(r);-1!==c&&(0===O[r]?(S(c,r),t++):O[r]===O[c]?S(c,r):r-1!==c&&S(c,r-1))}v&&g()},y=function(e){for(var t=Math.floor(e/4),r=e+1,c=!1;!c;){if(O[r]>0)return r;(++r>15||Math.floor(r/4)!==t)&&(c=!0)}return-1},N=function(){for(var e=0;e<4;e++)for(var t=0;t<3;t++){var r=w(e,t),c=y(r);-1!==c&&(0===O[r]?(S(c,r),t--):O[r]===O[c]?S(c,r):r+1!==c&&S(c,r+1))}v&&g()},T=function(e){for(var t=e+4,r=!1;!r;){if(O[t]>0)return t;(t+=4)>15&&(r=!0)}return-1},C=function(){for(var e=0;e<4;e++)for(var t=0;t<3;t++){var r=w(t,e),c=T(r);-1!==c&&(0===O[r]?(S(c,r),t--):O[r]===O[c]?S(c,r):r+4!==c&&S(c,r+4))}v&&g()},A=function(e){for(var t=e-4,r=!1;!r;){if(O[t]>0)return t;(t-=4)<0&&(r=!0)}return-1},E=function(){for(var e=0;e<4;e++)for(var t=3;t>0;t--){var r=w(t,e),c=A(r);-1!==c&&(0===O[r]?(S(c,r),t++):O[r]===O[c]?S(c,r):r-4!==c&&S(c,r-4))}v&&g()},J=function(e){switch(e){case"ArrowLeft":N();break;case"ArrowUp":C();break;case"ArrowRight":M();break;case"ArrowDown":E()}};b()("body").off("keyup"),b()("body").on("keyup",(function(e){e.preventDefault(),J(e.key)}));var B=u.map((function(e,t){return Object(l.jsx)("h3",{children:e},t)}));return Object(l.jsxs)("section",{id:"game",children:[Object(l.jsxs)("div",{id:"game-over",children:[B,Object(l.jsx)("form",{onSubmit:function(e){e.preventDefault();var t=b()("#input-name").val();t?(b()("#restart").slideDown(),fetch("https://clone48.herokuapp.com",{headers:{Accept:"application/json","Content-Type":"application/json"},method:"POST",body:JSON.stringify({admin:"-v7J&wUN2K55vdzX#x%#C5#uk",user:{name:t,score:p}})}),m()):(b()("#input-name").attr("placeholder","please enter a name!"),b()("#input-name").addClass("red-placeholder"))},children:Object(l.jsxs)("fieldset",{children:[Object(l.jsx)("legend",{children:"Add Your Name To Leaderboard"}),Object(l.jsx)("input",{type:"text",placeholder:"name",id:"input-name"}),Object(l.jsx)("button",{type:"submit",children:"submit"})]})})]}),n&&Object(l.jsxs)("div",{id:"scores",children:[Object(l.jsxs)("h4",{className:"score",children:["best : ",n.best]}),Object(l.jsxs)("h4",{className:"score",children:["score : ",n.score]}),Object(l.jsx)("button",{id:"restart",onClick:m,children:"restart"})]}),n&&Object(l.jsx)(f,{tiles:n.tiles,latest:n.latest,handleKeyPress:J}),n&&Object(l.jsx)(d,{up:C,right:M,down:E,left:N})]})};var p=function(){var e=Object(c.useState)([]),t=Object(i.a)(e,2),r=t[0],n=t[1];return Object(c.useEffect)((function(){fetch("https://clone48.herokuapp.com").then((function(e){return e.json()})).then((function(e){var t=e.users;t.sort((function(e,t){return t.score-e.score})),n(t)}))}),[]),Object(l.jsxs)("div",{id:"App",children:[Object(l.jsx)("h1",{children:"2048"}),Object(l.jsxs)("main",{children:[Object(l.jsx)(O,{leaders:r}),Object(l.jsx)(j,{leaders:r}),Object(l.jsx)(u,{})]})]})};o.a.render(Object(l.jsx)(n.a.StrictMode,{children:Object(l.jsx)(p,{})}),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.d0678267.chunk.js.map