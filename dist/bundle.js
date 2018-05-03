!function(t){var e={};function i(s){if(e[s])return e[s].exports;var n=e[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:s})},i.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/dist/",i(i.s=4)}([function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}();var n=window.innerWidth,r=window.innerHeight,a=function(){function t(e){var i=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.eraserBtn=document.getElementById("eraser"),this.clearBtn=document.getElementById("clear"),this.replayBtn=document.getElementById("replay"),this.loopBtn=document.getElementById("loop"),this.blissBtn=document.getElementById("bliss"),this.videoBtn=document.getElementById("videoBtn"),this.videoScrn=document.getElementById("video"),this.sizeUpBtn=document.getElementById("sizeUp"),this.sizeDownBtn=document.getElementById("sizeDown"),this.snapChat=document.getElementById("basicallySnapchat"),this.snapChatBtn=document.getElementById("snapBtn"),this.snapBlock=document.getElementById("snapBlock"),this.snapOffBtn=document.getElementById("snapOff"),this.eraserBtn.addEventListener("click",function(){return i.eraser()}),this.clearBtn.addEventListener("click",function(){return i.clear()}),this.replayBtn.addEventListener("click",function(){return i.replay()}),this.loopBtn.addEventListener("click",function(){return i.loop()}),this.blissBtn.addEventListener("click",function(){return i.bliss()}),this.videoBtn.addEventListener("click",function(){return i.video()}),this.snapChatBtn.addEventListener("click",function(){return i.snap()}),this.snapOffBtn.addEventListener("click",function(){return i.snapOff()}),this.sizeUpBtn.addEventListener("click",function(){return i.sizeUp()}),this.sizeDownBtn.addEventListener("click",function(){return i.sizeDown()}),this.eraser=this.eraser.bind(this),this.clear=this.clear.bind(this),this.replay=this.replay.bind(this),this.loop=this.loop.bind(this),this.brush=e,this.settings=this.brush.settings,this.videoScrn.width=this.snapChat.width=n,this.videoScrn.height=this.snapChat.height=r,this.sizeCounter=this.settings.size}return s(t,[{key:"video",value:function(){var t=this;if(this.videoBtn.classList.contains("active"))return this.videoBtn.classList.remove("active"),this.snapBlock.style="display: none",this.videoScrn.style="display: none",this.snapChat.style="display: none",!1;navigator.mediaDevices.getUserMedia({video:!0}).then(function(e){t.videoScrn.srcObject=e,t.videoScrn.setAttribute("autoplay",!0),t.videoScrn.style="display: block",t.snapBlock.style="display: block"}).catch(function(t){window.alert(t)}),this.videoBtn.classList.add("active")}},{key:"snap",value:function(){if(this.videoBtn.classList.contains("active")){var t=this.videoScrn,e=this.snapChat,i={width:t.videoWidth,height:t.videoHeight},s={width:e.width,height:e.height},n=(o=s,l=(a=i).width/a.height,o.width/o.height>l?{width:o.height*l,height:o.height}:{width:o.width,height:o.width/l}),r=(s.width-n.width)/2;e.style="display: block",e.getContext("2d").drawImage(t,r,0,n.width,n.height)}var a,o,l}},{key:"snapOff",value:function(){this.snapChat.style="display: none"}},{key:"clear",value:function(){var t=this.brush,e=this.loopBtn,i=this.eraserBtn;t.clear(),t.history=[t.initialHistory],t.reset(),e.classList.remove("active"),i.classList.remove("active")}},{key:"eraser",value:function(){var t=this.settings,e=this.eraserBtn;t.eraser=!t.eraser,t.x=-100,t.y=-100,t.lx=-100,t.ly=-100,e.classList.toggle("active")}},{key:"replay",value:function(){var t=this.brush,e=this.settings,i=this.eraserBtn;e.frame=0,e.x=-100,e.y=-100,e.lx=-100,e.ly=-100,e.replay||(t.clear(),e.eraser=!1,e.replay=!0,i.classList.remove("active"))}},{key:"loop",value:function(){var t=this.brush,e=this.settings,i=this.replayBtn,s=this.loopBtn,n=this.eraserBtn,r=this.clearBtn;e.frame=0,e.clean=!0,e.x=-100,e.y=-100,e.lx=-100,e.ly=-100,t.clear(),e.loop?(e.loop=!1,e.replay=!1,t.history=[t.initialHistory],t.reset(),i.disabled=!1,n.disabled=!1,r.disabled=!1):(e.loop=!0,e.replay=!0,i.disabled=!0,n.disabled=!0,r.disabled=!0),s.classList.toggle("active"),n.classList.remove("active")}},{key:"bliss",value:function(){document.body.classList.toggle("bliss"),this.blissBtn.classList.toggle("active")}},{key:"sizeUp",value:function(){this.brush.reset(),this.settings.size+=2,this.sizeCounter=this.settings.size,document.getElementById("size").innerHTML=this.settings.size}},{key:"sizeDown",value:function(){this.brush.reset(),this.settings.size-=2,this.sizeCounter=this.settings.size,document.getElementById("size").innerHTML=this.settings.size}}]),t}();e.default=a},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=["A","B","X","Y","LB","RB","LT","RT","SEL","STR","L3","R3","UP","DOWN","LEFT","RIGHT","SYNC"]},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),n=i(1);var r={x:-100,y:-100,lx:-100,ly:-100,prevX:-100,prevY:-100,frame:0,stall:0,r:2,g:0,b:4,speed:5,height:5,width:127,size:50,color:0,eraser:!1,replay:!1,loop:!1,clean:!0,gradient:""},a=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.settings=r,this.initialHistory={from:[-1e3,-1e3],to:[-1e3,-1e3],size:this.settings.size,color:this.settings.color},this.history=[this.initialHistory],this.controller={type:null,A:!1,B:!1,X:!1,Y:!1,RT:!1,LT:!1,RB:!1,LB:!1,UP:!1,DOWN:!1,LEFT:!1,RIGHT:!1,AXIS_X:0,AXIS_Y:1},this.draw=this.draw.bind(this),this.controllerPosition=this.controllerPosition.bind(this),this.canvas=e,this.context=i}return s(t,[{key:"colorPhase",value:function(t){var e=this.settings.width,i=2*Math.PI,s=this.settings.height,n=Math.sin(i/s+this.settings.r+t)*e+128,r=Math.sin(i/s+this.settings.g+t)*e+128,a=Math.sin(i/s+this.settings.b+t)*e+128;return"rgb("+Math.round(n)+","+Math.round(r)+","+Math.round(a)+")"}},{key:"line",value:function(t,e,i,s,n,r){var a=this.context;a.beginPath(),a.moveTo(t,e),a.lineTo(i,s),a.lineWidth=n,a.lineCap="round",a.lineJoin="round",a.strokeStyle=r,a.stroke()}},{key:"record",value:function(t){this.history.push(t)}},{key:"draw",value:function(t){var e=this.settings,i=e.lx,s=e.ly,n=e.x,r=e.y,a=e.size,o=e.eraser,l=e.frame,h=e.replay,c=this.colorPhase(this.settings.color/30);o&&(c="rgb(0,0,0)"),this.line(i,s,n,r,a,c),this.controllerPosition(t);var u={from:[i,s],to:[n,r],size:a,color:c};0!==l&&(h||this.record(u))}},{key:"replay",value:function(){var t=this.history.length-1,e=this.history[this.settings.frame],i=e.from[0],s=e.from[1],n=e.to[0],r=e.to[1],a=e.size,o=e.color;this.settings.frame<t?(this.settings.frame+=1,this.line(i,s,n,r,a,o)):this.settings.loop?(this.settings.stall+=1,this.settings.stall>=60&&(this.settings.stall=0,this.settings.frame=0,this.clear())):(this.settings.frame=0,this.settings.replay=!1)}},{key:"clear",value:function(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height)}},{key:"reset",value:function(){this.settings.x=-100,this.settings.y=-100,this.settings.lx=-100,this.settings.ly=-100,this.settings.prevX=-100,this.settings.prevY=-100,this.settings.frame=0,this.settings.stall=0,this.settings.speed=5,this.settings.height=5,this.settings.width=127,this.settings.eraser=!1,this.settings.replay=!1,this.settings.loop=!1,this.settings.clean=!0}},{key:"controllerPosition",value:function(t){var e=this.controller,i=this.settings;if(t&&!i.clean){(t.axes[e.AXIS_Y]<0||t.axes[e.AXIS_Y]>0||t.axes[e.AXIS_X]>0||t.axes[e.AXIS_X]<0)&&(i.xbox=!0,i.color+=1,i.frame+=1),0===t.axes[e.AXIS_Y]&&0===t.axes[e.AXIS_X]&&i.xbox&&(i.frame=0,i.xbox=!1);for(var s=0;s<t.buttons.length;s+=1)t.buttons[s].pressed?e[n.buttonList[s]]=!0:e[n.buttonList[s]]=!1;i.y+=t.axes[e.AXIS_Y]*e.speed,i.x+=t.axes[e.AXIS_X]*e.speed,e.B||(i.ly=i.prevY,i.lx=i.prevX),i.prevY+=t.axes[e.AXIS_Y]*e.speed,i.prevX+=t.axes[e.AXIS_X]*e.speed,e.LB?i.speed=2.5:e.RB?i.speed=10:i.speed=5,e.Y?(i.r=1,i.g=0,i.b=5):(i.r=2,i.g=0,i.b=4),i.size>=20?(e.RT&&(i.size+=1),e.LT&&(i.size-=1)):i.size=20}}}]),t}();e.default=a},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),n=a(i(2)),r=a(i(0));function a(t){return t&&t.__esModule?t:{default:t}}var o=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.canvas=document.getElementById(e),this.context=this.canvas.getContext("2d"),this.brush=new n.default(this.canvas,this.context),this.controls=new r.default(this.brush),this.resizeCanvas=this.resizeCanvas.bind(this)}return s(t,[{key:"resizeCanvas",value:function(){var t=this.canvas,e=this.context,i=window.devicePixelRatio;t.width=window.innerWidth*i,t.height=window.innerHeight*i,t.style.width=window.innerWidth,t.style.height=window.innerHeight,e.drawImage(t,0,0)}},{key:"initializeCanvas",value:function(){var t=this.canvas,e=this.brush,i=e.settings;function s(t){i.clean&&(i.clean=!1);var e=void 0,s=void 0;if("mousemove"!==t.type&&"mousedown"!==t.type||(e=t.clientX,s=t.clientY),"touchmove"===t.type||"touchstart"===t.type){var n=t.targetTouches;e=n[0].pageX,s=n[0].pageY,i.size=100*n[0].force}0===i.frame&&(i.prevX=e,i.prevY=s),i.x=e,i.y=s,i.lx=i.prevX,i.ly=i.prevY,i.color+=1,i.frame+=1,i.prevX=e,i.prevY=s}this.resizeCanvas(),window.addEventListener("resize",this.resizeCanvas,!1),t.addEventListener("mouseup",function(){i.frame=0,t.removeEventListener("mousemove",s,!1)},!1),t.addEventListener("touchend",function(){i.frame=0,t.removeEventListener("touchmove",s,!1)},!1),t.addEventListener("touchstart",function(e){i.frame=0,s(e),t.addEventListener("touchmove",s,!1)},!1),t.addEventListener("mousedown",function(e){i.frame=0,s(e),t.addEventListener("mousemove",s,!1)},!1);var n=navigator.getGamepads()[0];!function t(){window.requestAnimationFrame(t,1e3/60),n=null,i.replay?e.replay():e.draw(n)}()}}]),t}();e.default=o},function(t,e,i){"use strict";var s,n=i(3);new((s=n)&&s.__esModule?s:{default:s}).default("doodleCanvas").initializeCanvas()}]);