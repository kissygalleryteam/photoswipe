/*! photoswipe - v1.0 - 2013-06-05 5:21:30 PM
* Copyright (c) 2013 bachi; Licensed  */
KISSY.add("mobile/photoswipe/1.0/index",function(a,b,c,d){"use strict";function e(a){return this instanceof e?(e.superclass.constructor.call(this,a),this.init(),void 0):new e(a)}return e.ATTRS={imgPadding:{value:0},id:{value:"PhotoSwip-"+a.now()},slideOptimize:{value:!0},currentIndex:{value:0},overflow:{value:!1},zoom:{value:!1},page:{value:0},caches:{value:{}},data:{value:{items:[]}},nextAtlas:{value:!1},getNextAtlas:{value:function(){}},itemHtml:{value:['<div class="ps-pal ${placeholder}">','<div class="ps-pic-wrapper" style="overflow:hidden;">','<img src="${pic}" class="ps-pic" />',"</div>",'	<!--img class="ps-loading" src="http://img03.taobaocdn.com/tps/i3/T1Ou9TXCFdXXaPT2Hb-24-24.gif" /-->',"</div>"].join("")},wrapperHtml:{value:['<div id="${id}">','	<div class="ps-con">',"		$${items}","	</div>","</div>"].join("")},loadMoreHtml:{value:['<div class="ps-loadmore ps-pal">','<div class="ps-loadmore-img">',"</div>","</div>"].join("")},conClass:{value:""}},a.extend(e,a.Base,{init:function(){var a=this;a.initParam(),a.createHtml(),a.slide=new b(a.id,{conClass:a.conClass,autoSlide:!1,effect:"hSlide",carousel:!1,touchmove:!0,adaptive_fixed_width:!0,contentClass:"ps-con",speed:250,pannelClass:"ps-pal",animWrapperAutoHeightSetting:!1,webkitOptimize:!0,adaptive_width:function(){return window.innerWidth},adaptive_height:function(){return window.innerHeight}}),a.mask=c({opacity:.6}),a.bindEvent()},handleImgMarginTop:function(a){var b=this,c=a;c&&(c.attr("data-ready","true"),setTimeout(function(){b.overflow===!1&&(c.width()>window.innerWidth&&c.width(window.innerWidth-b.imgPadding),c.height()>window.innerHeight&&c.height(window.innerHeight-b.imgPadding));var a=c.height(),d=(window.innerHeight-a)/2;c.css({"margin-top":d+"px"})},100))},isVisiable:function(){var a=this;return"none"==a.con.css("display")?!1:!0},addData:function(a){var b=this,c=!1;c=0==b.data.items.length?!0:!1,b.data.items=b.data.items.concat(a),b.set("data",b.data),b.page++,b.set("page",b.page),b.isVisiable()&&b.resetImgAlign(),c||b.renderAltlasLastPic()},slipperFilter:function(){for(var b=this,c=b.slide.pannels,d=0;d<b.slide.length;d++){var e=a.one(c[d]);e.hasClass("ps-loadmore")||(0!=e.children().length&&b._rememberPannel(d),d<b.slide.currentTab-1||d>b.slide.currentTab+1?b._emptyPannel(d):b._recallPannel(d))}},_rememberPannel:function(b){var c=this,d=a.one(c.slide.pannels[b]);c.caches["c"+b]=d.html(),c.set("caches",c.caches)},_emptyPannel:function(b){var c=this,d=a.one(c.slide.pannels[b]);0!=d.children().length&&c._rememberPannel(b),d.empty()},_recallPannel:function(b){var c=this,d=a.one(c.slide.pannels[b]),e=c.caches["c"+b];e&&(d.html(e),c.slide.currentTab!==b&&c.handleImgMarginTop(d.one(".ps-pic")))},prev:function(a){var b=this;b.slide.previous.call(b.slide,a)},next:function(a){var b=this;b.slide.next.call(b.slide,a)},createHtml:function(){var b=this,c=d(b.itemHtml,{pic:"",placeholder:"ps-placeholder"}),e=d(b.wrapperHtml,{id:b.id,items:c});b.con=a.Node(e),b.con.css({display:"none",left:0,top:0,width:window.innerWidth,height:window.innerHeight,position:"fixed","z-index":10001}),a.one("body").append(b.con)},getIndex:function(){var a=this;return a.get("currentIndex")},setIndex:function(a){var b=this;b.set("currentIndex",a)},initParam:function(){var b=this;a.mix(b,b.getAttrVals())},show:function(){var a=this;if("block"!=a.con.css("display")){a.con.css({display:"block"}),a.renderImg(0),a.mask.addMask();try{a.mask.getMask().css({height:window.innerHeight+"px"})}catch(b){}a.resetImgAlign(),"true"!==a.con.attr("data-ps")&&(a.bindExitEvent(),a.con.attr("data-ps","true"))}},renderImg:function(a,b){var c=this,e=c.con.one(".ps-placeholder");e&&(c.slide.add(d(c.itemHtml,c.data.items[0])),e.remove()),c.renderOneImg(a,b)},renderAltlasLastPic:function(){var a=this;a.renderOneImg(a.getIndex(),"right")},renderOneImg:function(b,c){var e=this;a.isUndefined(c)&&(c="right");var f=e.getIndex();if(e.doAfterSwitch=null,"right"==c){if(!!e.itemHtml,e.data.items[f+1]){var g=d(e.itemHtml,e.data.items[f+1]);e.slide.add(a.Node(g))}e._replaceLoadMore(),e._removeOthers()}else a.log("left:"+f),0===b?e.slide.remove(e.slide.length-2):b==e.data.items.length-1||(e.doAfterSwitch=!1,e.slide.switch_to(1,!1),e.slide.add(a.Node(d(e.itemHtml,e.data.items[b-1])),0),e.slide.con.all("img.ps-pic").each(function(a){e.handleImgMarginTop(a)}),e.resetImgAlign(),e._replaceLoadMore(),e._removeOthers());e.resetImgAlign()},stamp:function(b){var c=this,d=a.one(c.slide.pannels[c.slide.currentTab]);d.attr("data-index",b)},paddingImg:function(){},_removeOthers:function(){var a=this,b=a.getIndex();b>=2&&a.slide.currentTab>1&&a.slide.remove(0),a.slide.length>=5&&a.hasNextAtlas()&&a.slide.remove(a.slide.length-2),a.slide.length>=4&&!a.hasNextAtlas()&&a.slide.removeLast()},resetImgAlign:function(){var a=this;a.slide.con.all("img.ps-pic").each(function(b){b.on("load",function(){"true"!=b.attr("data-ready")&&(a.handleImgMarginTop(b),a.fire("imgLoaded",{img:b}))})})},hide:function(){var a=this;a.con.css({display:"none"}),a.mask.removeMask()},bindExitEvent:function(){var b=this;b.slide.con.on("click",function(c){a.one(c.target).hasClass("ps-pic")||b.hide()})},bindEvent:function(){var b=this;b.slide.on("beforeSwitch",function(){if(!b.slide.is_last())for(var c=b.slide.currentTab;c<b.slide.length;c++){var d=a.one(b.slide.pannels[c]).one("img.ps-pic");d&&b.handleImgMarginTop(d)}return b.slide.currentTab==b.slide.length-2&&b.hasNextAtlas()?(b.fire("edgeSwipe",{page:b.page}),setTimeout(function(){b.hasNextAtlas()||b.next()},30),!1):void 0}),b.slideOptimize&&b.slide.on("afterSwitch",function(){}),b.slide.on("afterSwitch",function(c){var d="right";return a.log("===="+c.index),c.index>0?b.setIndex(b.getIndex()+1):(b.setIndex(b.getIndex()-1),d="left"),b.doAfterSwitch===!1?(b.setIndex(b.getIndex()+1),b.doAfterSwitch=null,void 0):(b.renderImg(b.getIndex(),d),void 0)})},_detachEvent:function(){},hasNextAtlas:function(b){var c=this;return a.isUndefined(b)?c.nextAtlas:(c.set("nextAtlas",b),c.nextAtlas=b,c._replaceLoadMore(),void 0)},_replaceLoadMore:function(){var a=this,b=a.con.one(".ps-loadmore");a.hasNextAtlas()?b?a._moveLoadMore():(a.slide.add(a.loadMoreHtml),a.handleImgMarginTop(a.con.one(".ps-loadmore-img"))):!!b&&a.slide.remove(a.slide.currentTab)},_moveLoadMore:function(){var a=this,b=a.con.one(".ps-loadmore");b.css({visibility:"hidden"}),b.appendTo("body").appendTo(a.slide.animwrap),b.css({visibility:"visible"})},destory:function(){}}),e},{requires:["gallery/slide/1.1/","mobile/simple-mask/1.0/","gallery/juicer/1.3/","base","node"]});