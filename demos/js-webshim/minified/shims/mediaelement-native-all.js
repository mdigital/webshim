jQuery.webshims.register("mediaelement-swf",function(c,g,r,m,k,l){var i=g.mediaelement,s=r.swfobject,o=Modernizr.audio&&Modernizr.video,t=s.hasFlashPlayerVersion("9.0.115"),u,v={paused:!0,ended:!1,currentSrc:"",duration:r.NaN,readyState:0,networkState:0,videoHeight:0,videoWidth:0,error:null,buffered:k},n=Object.keys(v),w={currentTime:0,volume:1,muted:!1};Object.keys(w);var y=c.extend({isActive:"html5",activating:"html5",wasSwfReady:!1,_bufferedEnd:0,_bufferedStart:0,_metadata:!1,currentTime:0,_ppFlag:k},
v,w),d=/^jwplayer-/,e=function(b){if(b=m.getElementById(b.replace(d,"")))return b=g.data(b,"mediaelement"),b.isActive=="flash"?b:null},h=function(b){return(b=g.data(b,"mediaelement"))&&b.isActive=="flash"?b:null},f=function(b,a){a=c.Event(a);a.preventDefault();c.event.trigger(a,k,b)},p,x=g.loader.basePath+"swf/jwwebshims.swf",D=g.loader.basePath+"jwplayer/player.swf";t&&g.ready("WINDOWLOAD",function(){u||c.ajax(x,c.extend({complete:function(){c.ajax(x,g.xhrPreloadOption)}},g.xhrPreloadOption))});
g.extendUNDEFProp(l.jwParams,{allowscriptaccess:"always",allowfullscreen:"true",wmode:"transparent"});g.extendUNDEFProp(l.jwVars,{screencolor:"ffffffff",controlbar:"over"});g.extendUNDEFProp(l.jwAttrs,{bgcolor:"#000000"});i.jwEvents={View:{PLAY:function(b){var a=e(b.id);if(a&&!a.stopPlayPause&&(a._ppFlag=!0,a.paused==b.state)){a.paused=!b.state;if(a.ended)a.ended=!1;f(a._elem,b.state?"play":"pause")}}},Model:{BUFFER:function(b){var a=e(b.id);if(a&&a._bufferEnd!=b.percentage){a.networkState=b.percentage==
100?1:2;if(!a.duration){try{if(a.duration=a.jwapi.getPlaylist()[0].duration,a.duration<=0)a.duration=r.NaN}catch(d){}a.duration&&(f(a._elem,"durationchange"),a._elemNodeName=="audio"&&this.META(c.extend({duration:a.duration},b),a))}if(a.ended)a.ended=!1;if(a.duration){a._bufferedEnd=b.percentage;a.buffered.length=1;if(b.percentage==100)a.networkState=1,a.readyState=4;c.event.trigger("progress",k,a._elem,!0)}}},META:function(b,a){if("duration"in b&&(a=a&&a.networkState?a:e(b.id))&&!a._metadata){a._metadata=
!0;var c=a.duration;a.duration=b.duration;a.videoHeight=b.height||0;a.videoWidth=b.width||0;if(!a.networkState)a.networkState=2;if(a.readyState<1)a.readyState=1;c!==a.duration&&f(a._elem,"durationchange");f(a._elem,"loadedmetadata")}},TIME:function(b){var a=e(b.id);if(a&&a.currentTime!==b.position){a.currentTime=b.position;if(a.readyState<2)a.readyState=2;if(a.ended)a.ended=!1;f(a._elem,"timeupdate")}},STATE:function(b){var a=e(b.id);if(a)switch(b.newstate){case "BUFFERING":if(a.readyState>1)a.readyState=
1;if(a.ended)a.ended=!1;f(a._elem,"waiting");break;case "PLAYING":a.paused=!1;a._ppFlag=!0;if(a.readyState<3)a.readyState=3,f(a._elem,"canplay");if(a.ended)a.ended=!1;f(a._elem,"playing");break;case "PAUSED":if(!a.paused&&!a.stopPlayPause)a.paused=!0,a._ppFlag=!0,f(a._elem,"pause");break;case "COMPLETED":if(a.readyState<4)a.readyState=4;a.ended=!0;f(a._elem,"ended")}}},Controller:{ERROR:function(b){e(b.id)&&i.setError(elem,b.message)},VOLUME:function(b){var a=e(b.id);if(a&&(b=b.percentage/100,a.volume!=
b))a.volume=b,f(a._elem,"volumechange")},MUTE:function(b){if(!p||!b.state){var a=e(b.id);if(a&&a.muted!=b.state)a.muted=b.state,f(a._elem,"volumechange")}}}};var E=function(b){c.each(i.jwEvents,function(a,d){c.each(d,function(c){b.jwapi["add"+a+"Listener"](c,"jQuery.webshims.mediaelement.jwEvents."+a+"."+c)})})},A=function(b){b&&(b._ppFlag===k&&c.prop(b._elem,"autoplay")||!b.paused)&&setTimeout(function(){if(b.isActive=="flash"&&(b._ppFlag===k||!b.paused))try{c(b._elem).play()}catch(a){}},1)},F=function(b){if(b&&
b._elemNodeName=="video"){var a,d,e,g,f=function(j,f){a&&(a.remove(),a=!1);if(f&&j&&!(f<1||j<1||b.isActive!="flash"))if(d=b._elem.style.width=="auto",e=b._elem.style.height=="auto",d||e){g=g||c(b._elem).getShadowElement();var h;d&&!e?(h=c(b._elem).height(),j*=h/f,f=h):!d&&e&&(h=c(b._elem).width(),f*=h/j,j=h);g.css({width:j,height:f})}},j=function(){if(!(b.isActive!="flash"||c.prop(b._elem,"readyState"))){var j=c.prop(b._elem,"poster");if(j&&(d=b._elem.style.width=="auto",e=b._elem.style.height=="auto",
d||e))a&&(a.remove(),a=!1),a=c('<img style="position: absolute; height: 1px; width: 1px; top: 0px; left: 0px; visibility: hidden;" />').bind("load error alreadycomplete",function(){c(this).css({width:"auto",height:"auto"}).unbind();f(this.naturalWidth||this.width,this.naturalHeight||this.height)}).prop("src",j).appendTo("body").each(function(){this.complete&&c(this).triggerHandler("alreadycomplete")})}};c(b._elem).bind("loadedmetadata",function(){f(c.prop(this,"videoWidth"),c.prop(this,"videoHeight"))}).bind("emptied",
j).each(function(){c.prop(b._elem,"readyState")?f(c.prop(this,"videoWidth"),c.prop(this,"videoHeight")):j()})}};c(m).bind("emptied",function(b){b=h(b.target);A(b)});i.jwPlayerReady=function(b){var a=e(b.id);if(a&&a.jwapi){a.jwData=b;if(a.wasSwfReady){var b=a.actionQueue.length,d=0,f;if(b&&a.isActive=="flash")for(;a.actionQueue.length&&b>d;)d++,f=a.actionQueue.shift(),a.jwapi[f.fn].apply(a.jwapi,f.args);if(a.actionQueue.length)a.actionQueue=[]}else b=parseFloat(b.version,10),(b<5.6||b>=6)&&g.warn("mediaelement-swf is only testet with jwplayer 5.6+"),
c.prop(a._elem,"volume",a.volume),c.prop(a._elem,"muted",a.muted),E(a);a.wasSwfReady=!0;A(a)}};var B=c.noop;if(o){var G={play:1,playing:1},z=["play","pause","playing","canplay","progress","waiting","ended","loadedmetadata","durationchange","emptied"].map(function(b){return b+".webshimspolyfill"}).join(" "),C=function(b){var a=g.data(b.target,"mediaelement");a&&(b.originalEvent&&b.originalEvent.type===b.type)==(a.activating=="flash")&&(b.stopImmediatePropagation(),G[b.type]&&a.isActive!=a.activating&&
c(b.target).pause())};c(m).bind(z,C);B=function(b){c(b).unbind(z).bind(z,C)}}i.setActive=function(b,a,d){d||(d=g.data(b,"mediaelement"));if(d&&d.isActive!=a)a!="html5"&&a!="flash"&&g.warn("wrong type for mediaelement activating: "+a),d.activating=a,c(b).pause(),g.data(b,"mediaelementError",!1),d.isActive=a,a=="flash"?c(b).hide().getShadowElement().show():c(b).show().getShadowElement().hide()};var H=function(){return function(b){if(b){for(var a=12,d=b.networkState;--a;)delete b[a];b.actionQueue=[];
b.buffered.length=0;d&&f(b._elem,"emptied")}}}();i.createSWF=function(b,a,d){if(t){u=!0;var e=c.extend({},l.jwVars,{image:c.prop(b,"poster")||"",file:a.srcProp}),f=c(b).data("jwvars")||{};if(d)i.setActive(b,"flash",d),H(d),d.currentSrc=a.srcProp,c.extend(e,f),l.changeJW(e,b,a,d,"load"),q(b,"sendEvent",["LOAD",e]);else{var h=c.prop(b,"controls"),j="jwplayer-"+g.getID(b),p=c.extend({},l.jwParams,c(b).data("jwparams")),k=b.nodeName.toLowerCase(),m=c.extend({},l.jwAttrs,{name:j,id:j},c(b).data("jwattrs")),
n=c('<div class="polyfill-'+k+'" id="wrapper-'+j+'"><div id="'+j+'"></div>').css({width:b.style.width||c(b).width(),height:b.style.height||c(b).height(),position:"relative"}).insertBefore(b),d=g.data(b,"mediaelement",g.objectCreate(y,{actionQueue:{value:[]},_elemNodeName:{value:k},_elem:{value:b},currentSrc:{value:a.srcProp},buffered:{value:{start:function(a){if(a>=d.buffered.length)g.error("buffered index size error");else return 0},end:function(a){if(a>=d.buffered.length)g.error("buffered index size error");
else return d.duration*d._bufferedEnd/100+d._bufferedStart},length:0}}}));o&&c.extend(d,{volume:c.prop(b,"volume"),muted:c.prop(b,"muted")});c.extend(e,{id:j,controlbar:h?l.jwVars.controlbar||"over":"none",icons:""+h},f,{playerready:"jQuery.webshims.mediaelement.jwPlayerReady"});e.plugins?e.plugins+=","+x:e.plugins=x;g.addShadowDom(b,n);B(b);i.setActive(b,"flash",d);l.changeJW(e,b,a,d,"embed");F(d);s.embedSWF(D,j,"100%","100%","9.0.0",!1,e,p,m,function(a){if(a.success)d.jwapi=a.ref,h||c(a.ref).attr("tabindex",
"-1").css("outline","none")})}}else setTimeout(function(){c(b).mediaLoad()},1)};var q=function(b,a,d,c){return(c=c||h(b))?(c.jwapi&&c.jwapi[a]?c.jwapi[a].apply(c.jwapi,d||[]):(c.actionQueue.push({fn:a,args:d}),c.actionQueue.length>10&&setTimeout(function(){c.actionQueue.length>5&&c.actionQueue.shift()},99)),c):!1};["audio","video"].forEach(function(b){var a={},d,c=function(c){b=="audio"&&(c=="videoHeight"||c=="videoWidth")||(a[c]={get:function(){var a=h(this);if(a)return a[c];else if(d[c].prop._supget)return d[c].prop._supget.apply(this)},
writeable:!1})},e=function(b,d){c(b);delete a[b].writeable;a[b].set=d};e("volume",function(a){var b=h(this);if(b){if(a*=100,!isNaN(a)){(a<0||a>100)&&g.error("volume greater or less than allowed "+a/100);b.muted&&(p=!0);q(this,"sendEvent",["VOLUME",a],b);if(p){try{b.jwapi.sendEvent("mute","true")}catch(c){}p=!1}setTimeout(function(){if(!(b.volume==a||b.isActive!="flash"))b.volume=a,f(b._elem,"volumechange"),b=null},1)}}else if(d.volume.prop._supset)return d.volume.prop._supset.apply(this,arguments)});
e("muted",function(a){var b=h(this);if(b)a=!!a,q(this,"sendEvent",["mute",""+a],b),setTimeout(function(){if(!(b.muted==a||b.isActive!="flash"))b.muted=a,f(b._elem,"volumechange"),b=null},1);else if(d.muted.prop._supset)return d.muted.prop._supset.apply(this,arguments)});e("currentTime",function(a){var b=h(this);if(b){if(a*=1,!isNaN(a)){if(b.paused)clearTimeout(b.stopPlayPause),b.stopPlayPause=setTimeout(function(){b.paused=!0;b.stopPlayPause=!1},50);q(this,"sendEvent",["SEEK",""+a],b);if(b.paused){if(b.readyState>
0)b.currentTime=a,f(b._elem,"timeupdate");try{b.jwapi.sendEvent("play","false")}catch(c){}}}}else if(d.currentTime.prop._supset)return d.currentTime.prop._supset.apply(this,arguments)});["play","pause"].forEach(function(b){a[b]={value:function(){var a=h(this);if(a)a.stopPlayPause&&clearTimeout(a.stopPlayPause),q(this,"sendEvent",["play",b=="play"],a),setTimeout(function(){if(a.isActive=="flash"&&(a._ppFlag=!0,a.paused!=(b!="play")))a.paused=b!="play",f(a._elem,b)},1);else if(d[b].prop._supvalue)return d[b].prop._supvalue.apply(this,
arguments)}}});n.forEach(c);g.onNodeNamesPropertyModify(b,"controls",function(a,b){q(this,b?"showControls":"hideControls")});d=g.defineNodeNameProperties(b,a,"prop")})});
jQuery.webshims.ready("dom-support",function(c,g,r,m,k){var l=g.cfg.mediaelement,i=g.mediaelement,s=!r.swfobject||swfobject.hasFlashPlayerVersion("9.0.115"),o=Modernizr.audio&&Modernizr.video,t=function(){g.ready("mediaelement-swf",function(){if(!i.createSWF)g.modules["mediaelement-swf"].test=!1,delete c.event.special["mediaelement-swfReady"],g.loader.loadList(["mediaelement-swf"])})},u=function(d,e){var d=c(d),h={src:d.attr("src")||"",elem:d,srcProp:d.prop("src")};if(!h.src)return h;var f=d.attr("type");
if(f)h.type=f,h.container=c.trim(f.split(";")[0]);else if(e||(e=d[0].nodeName.toLowerCase(),e=="source"&&(e=(d.closest("video, audio")[0]||{nodeName:"video"}).nodeName.toLowerCase())),f=i.getTypeForSrc(h.src,e))h.type=f,h.container=f,c.nodeName(d[0],"source")&&(g.warn("you should always provide a proper mime-type. "+h.src+" detected as: "+f),d.attr("type",f));if(f=d.attr("media"))h.media=f;return h};g.ready("WINDOWLOAD",function(){g.loader.loadList(["swfobject"])});g.ready("swfobject",function(){(s=
swfobject.hasFlashPlayerVersion("9.0.115"))&&g.ready("WINDOWLOAD",t)});o&&g.capturingEvents(["play","playing","waiting","paused","ended","durationchange","loadedmetadata","canplay","volumechange"]);i.mimeTypes={audio:{"audio/ogg":["ogg","oga","ogm"],"audio/mpeg":["mp2","mp3","mpga","mpega"],"audio/mp4":["mp4","mpg4","m4r"],"audio/wav":["wav"],"audio/x-m4a":["m4a"],"audio/x-m4p":["m4p"],"audio/3gpp":["3gp","3gpp"],"audio/webm":["webm"]},video:{"video/ogg":["ogg","ogv","ogm"],"video/mpeg":["mpg","mpeg",
"mpe"],"video/mp4":["mp4","mpg4","m4v"],"video/quicktime":["mov","qt"],"video/x-msvideo":["avi"],"video/x-ms-asf":["asf","asx"],"video/flv":["flv","f4v"],"video/3gpp":["3gp","3gpp"],"video/webm":["webm"]}};i.mimeTypes.source=c.extend({},i.mimeTypes.audio,i.mimeTypes.video);i.getTypeForSrc=function(d,e){if(d.indexOf("youtube.com/watch?")!=-1)return"video/youtube";var d=d.split("?")[0].split("."),d=d[d.length-1],h;c.each(i.mimeTypes[e],function(c,e){if(e.indexOf(d)!==-1)return h=c,!1});return h};i.srces=
function(d,e){d=c(d);if(e)d.removeAttr("src").removeAttr("type").find("source").remove(),c.isArray(e)||(e=[e]),e.forEach(function(c){var e=m.createElement("source");typeof c=="string"&&(c={src:c});e.setAttribute("src",c.src);c.type&&e.setAttribute("type",c.type);c.media&&e.setAttribute("media",c.media);d.append(e)});else{var e=[],h=d[0].nodeName.toLowerCase(),f=u(d,h);f.src?e.push(f):c("source",d).each(function(){f=u(this,h);f.src&&e.push(f)});return e}};c.fn.loadMediaSrc=function(d,e){return this.each(function(){e!==
k&&(c(this).removeAttr("poster"),e&&c.attr(this,"poster",e));i.srces(this,d);c(this).mediaLoad()})};i.swfMimeTypes=["video/3gpp","video/x-msvideo","video/quicktime","video/x-m4v","video/mp4","video/m4p","video/x-flv","video/flv","audio/mpeg","audio/aac","audio/mp4","audio/x-m4a","audio/m4a","audio/mp3","audio/x-fla","audio/fla","youtube/flv","jwplayer/jwplayer","video/youtube"];i.canSwfPlaySrces=function(d,e){var h="";s&&(d=c(d),e=e||i.srces(d),c.each(e,function(d,c){if(c.container&&c.src&&i.swfMimeTypes.indexOf(c.container)!=
-1)return h=c,!1}));return h};i.canNativePlaySrces=function(d,e){var h="";o&&(d=c(d),e=e||i.srces(d),c.each(e,function(c,e){if(e.type&&d.canPlayType(e.type))return h=e,!1}));return h};i.setError=function(d,e){e||(e="can't play sources");g.data(d,"mediaelementError",e);g.warn("mediaelementError: "+e);setTimeout(function(){g.data(d,"mediaelementError")&&c(d).trigger("mediaerror")},1)};var v=function(){var c;return function(e,h,f){g.ready("mediaelement-swf",function(){i.createSWF?i.createSWF(e,h,f):
c||(c=!0,t(),v(e,h,f))})}}(),n=function(c,e,h,f,k){f=f||i.srces(c);g.data(c,"mediaelementError",!1);h||h!==!1&&e&&e.isActive=="flash"?(h=i.canSwfPlaySrces(c,f))?v(c,h,e):k?i.setError(c):n(c,e,!1,f,!0):(h=i.canNativePlaySrces(c))?e&&e.isActive=="flash"&&i.setActive(c,"html5",e):k?i.setError(c):n(c,e,!0,f,!0)},w=/^(?:embed|object)$/i;g.addReady(function(d,e){c("video, audio",d).add(e.filter("video, audio")).each(function(){var c=this.parentNode;if(!c||!w.test(c.nodeName||""))n(this,!1,l.preferFlash||
k)})});["audio","video"].forEach(function(c){var e=g.defineNodeNameProperty(c,"load",{prop:{value:function(){var c=g.data(this,"mediaelement");n(this,c);o&&(!c||c.isActive=="html5")&&e.prop._supvalue&&e.prop._supvalue.apply(this,arguments)}}})});var y=o&&"loop"in m.createElement("video");c(m).bind("ended",function(d){var e=g.data(d.target,"mediaelement");(!y||e&&e.isActive!="html5"||c.prop(d.target,"autoplay"))&&setTimeout(function(){!c.prop(d.target,"paused")&&c.prop(d.target,"autoplay")&&c(d.target).prop("currentTime",
0).play()},1)});g.isReady("mediaelement-core",!0)});