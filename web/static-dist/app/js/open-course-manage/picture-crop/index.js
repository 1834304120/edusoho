webpackJsonp(["app/js/open-course-manage/picture-crop/index"],{0:function(r,o){r.exports=jQuery},b15d5e658e0970f1ac54:function(r,o,t){"use strict";var e=t("cc3274d7f94eca8f853b");new(function(r){return r&&r.__esModule?r:{default:r}}(e).default)({cropImg:"#open-course-crop",saveBtn:"#save-btn",selectBtn:"#select-btn",group:"course",imgs:{large:[480,270],middle:[304,171],small:[96,54]}})},c962afacd3de715604c1:function(r,o,t){var e=t("c962afacd3de715604c6");"string"==typeof e&&(e=[[r.i,e,""]]);var a={insertAt:"top",hmr:!0};a.transform=void 0;t("3296c0d42e5b7cde21ad")(e,a);e.locals&&(r.exports=e.locals)},c962afacd3de715604c6:function(r,o,t){o=r.exports=t("e7f1add7f34e416618de")(void 0),o.push([r.i,"/*! Jcrop.min.css v2.0.4 - build: 20151117\n *  Copyright 2008-2015 Tapmodo Interactive LLC\n *  Free software under MIT License\n **/\n\n.jcrop-active{direction:ltr;text-align:left;box-sizing:border-box;-ms-touch-action:none}.jcrop-dragging{-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none}.jcrop-selection{z-index:2}.jcrop-selection.jcrop-current{z-index:4}.jcrop-border{background:#fff url("+t("186c8a0bf2732d1ea26a")+");line-height:1px!important;font-size:0!important;overflow:hidden;position:absolute;filter:alpha(opacity=50)!important;opacity:.5!important}.jcrop-border.ord-w,.jcrop-border.ord-e,.jcrop-border.ord-n{top:0}.jcrop-border.ord-n,.jcrop-border.ord-s{width:100%;height:1px!important}.jcrop-border.ord-w,.jcrop-border.ord-e{height:100%;width:1px!important}.jcrop-border.ord-e{right:-1px}.jcrop-border.ord-n{top:-1px}.jcrop-border.ord-w{left:-1px}.jcrop-border.ord-s{bottom:-1px}.jcrop-selection{position:absolute}.jcrop-box{z-index:2;display:block;background:0 0;border:0;padding:0;margin:0;font-size:0}.jcrop-box:hover{background:0 0}.jcrop-box:active{background:0 0}.jcrop-box:focus{outline:1px rgba(128,128,128,.65) dotted}.jcrop-active,.jcrop-box{position:relative}.jcrop-box{width:100%;height:100%;cursor:move}.jcrop-handle{z-index:4;background-color:rgba(49,28,28,.58);border:1px #eee solid;width:9px;height:9px;font-size:0;position:absolute;filter:alpha(opacity=80)!important;opacity:.8!important}.jcrop-handle.ord-n{left:50%;margin-left:-5px;margin-top:-5px;top:0;cursor:n-resize}.jcrop-handle.ord-s{bottom:0;left:50%;margin-bottom:-5px;margin-left:-5px;cursor:s-resize}.jcrop-handle.ord-e{margin-right:-5px;margin-top:-5px;right:0;top:50%;cursor:e-resize}.jcrop-handle.ord-w{left:0;margin-left:-5px;margin-top:-5px;top:50%;cursor:w-resize}.jcrop-handle.ord-nw{left:0;margin-left:-5px;margin-top:-5px;top:0;cursor:nw-resize}.jcrop-handle.ord-ne{margin-right:-5px;margin-top:-5px;right:0;top:0;cursor:ne-resize}.jcrop-handle.ord-se{bottom:0;margin-bottom:-5px;margin-right:-5px;right:0;cursor:se-resize}.jcrop-handle.ord-sw{bottom:0;left:0;margin-bottom:-5px;margin-left:-5px;cursor:sw-resize}.jcrop-touch .jcrop-handle{z-index:4;background-color:rgba(49,28,28,.58);border:1px #eee solid;width:18px;height:18px;font-size:0;position:absolute;filter:alpha(opacity=80)!important;opacity:.8!important}.jcrop-touch .jcrop-handle.ord-n{left:50%;margin-left:-10px;margin-top:-10px;top:0;cursor:n-resize}.jcrop-touch .jcrop-handle.ord-s{bottom:0;left:50%;margin-bottom:-10px;margin-left:-10px;cursor:s-resize}.jcrop-touch .jcrop-handle.ord-e{margin-right:-10px;margin-top:-10px;right:0;top:50%;cursor:e-resize}.jcrop-touch .jcrop-handle.ord-w{left:0;margin-left:-10px;margin-top:-10px;top:50%;cursor:w-resize}.jcrop-touch .jcrop-handle.ord-nw{left:0;margin-left:-10px;margin-top:-10px;top:0;cursor:nw-resize}.jcrop-touch .jcrop-handle.ord-ne{margin-right:-10px;margin-top:-10px;right:0;top:0;cursor:ne-resize}.jcrop-touch .jcrop-handle.ord-se{bottom:0;margin-bottom:-10px;margin-right:-10px;right:0;cursor:se-resize}.jcrop-touch .jcrop-handle.ord-sw{bottom:0;left:0;margin-bottom:-10px;margin-left:-10px;cursor:sw-resize}.jcrop-dragbar{font-size:0;position:absolute}.jcrop-dragbar.ord-n,.jcrop-dragbar.ord-s{height:9px!important;width:100%}.jcrop-dragbar.ord-e,.jcrop-dragbar.ord-w{top:0;height:100%;width:9px!important}.jcrop-dragbar.ord-n{margin-top:-5px;cursor:n-resize;top:0}.jcrop-dragbar.ord-s{bottom:0;margin-bottom:-5px;cursor:s-resize}.jcrop-dragbar.ord-e{margin-right:-5px;right:0;cursor:e-resize}.jcrop-dragbar.ord-w{margin-left:-5px;cursor:w-resize}.jcrop-shades{position:relative;top:0;left:0}.jcrop-shades div{cursor:crosshair}.jcrop-noresize .jcrop-dragbar,.jcrop-noresize .jcrop-handle{display:none}.jcrop-selection.jcrop-nodrag .jcrop-box,.jcrop-nodrag .jcrop-shades div{cursor:default}.jcrop-light .jcrop-border{background:#fff;filter:alpha(opacity=70)!important;opacity:.7!important}.jcrop-light .jcrop-handle{background-color:#000;border-color:#fff}.jcrop-dark .jcrop-border{background:#000;filter:alpha(opacity=70)!important;opacity:.7!important}.jcrop-dark .jcrop-handle{background-color:#fff;border-color:#000}.solid-line .jcrop-border{background:#fff}.jcrop-thumb{position:absolute;overflow:hidden;z-index:5}.jcrop-active img,.jcrop-thumb img,.jcrop-thumb canvas{min-width:none;min-height:none;max-width:none;max-height:none}.jcrop-hl-active .jcrop-border{filter:alpha(opacity=20)!important;opacity:.2!important}.jcrop-hl-active .jcrop-handle{filter:alpha(opacity=10)!important;opacity:.1!important}.jcrop-hl-active .jcrop-selection:hover{}.jcrop-hl-active .jcrop-selection:hover .jcrop-border{background-color:#ccc;filter:alpha(opacity=50)!important;opacity:.5!important}.jcrop-hl-active .jcrop-selection.jcrop-current .jcrop-border{background:gray url("+t("186c8a0bf2732d1ea26a")+");opacity:.35!important;filter:alpha(opacity=35)!important}.jcrop-hl-active .jcrop-selection.jcrop-current .jcrop-handle{filter:alpha(opacity=30)!important;opacity:.3!important}.jcrop-hl-active .jcrop-selection.jcrop-focus .jcrop-border{background:url("+t("186c8a0bf2732d1ea26a")+");opacity:.65!important;filter:alpha(opacity=65)!important}.jcrop-hl-active .jcrop-selection.jcrop-focus .jcrop-handle{filter:alpha(opacity=60)!important;opacity:.6!important}button.jcrop-box{background:0 0}",""])},cc3274d7f94eca8f853b:function(r,o,t){"use strict";function e(r){return r&&r.__esModule?r:{default:r}}function a(r,o){if(!(r instanceof o))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(o,"__esModule",{value:!0});var i=function(){function r(r,o){for(var t=0;t<o.length;t++){var e=o[t];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(r,e.key,e)}}return function(o,t,e){return t&&r(o.prototype,t),e&&r(o,e),o}}(),n=t("12695715cd021610570e"),c=e(n),p=t("b334fd7e4c5a19234db2"),d=e(p),s=function(){function r(o){a(this,r),this.cropImg=o.cropImg,this.saveBtn=o.saveBtn,this.selectBtn=o.selectBtn,this.imgs=o.imgs,this.group=o.group,this.uploadInput=o.uploadInput||".js-upload-input",this.modal=o.modal||"#modal",this.init()}return i(r,[{key:"init",value:function(){this.initImage();var r=this.imageCrop();this.initEvent(r)}},{key:"initImage",value:function(r){var o=JSON.parse(localStorage.getItem("crop_image_attr"));$(this.cropImg).attr({src:o.src,width:o.width,height:o.height,"data-natural-width":o["natural-width"],"data-natural-height":o["natural-height"]}),localStorage.removeItem("crop_image_attr")}},{key:"initEvent",value:function(r){var o=this;$(this.saveBtn).on("click",function(t){return o.saveEvent(t,r)}),$(this.selectBtn).on("click",function(r){return o.selectEvent(r)})}},{key:"saveEvent",value:function(r,o){r.stopPropagation();var t=$(r.currentTarget);o.crop({imgs:this.imgs,post:!1}),t.button("loading")}},{key:"selectEvent",value:function(r){$(this.uploadInput).click()}},{key:"imageCrop",value:function(){var r=this,o=new c.default({element:this.cropImg,cropedWidth:this.imgs.large[0],cropedHeight:this.imgs.large[1],group:this.group});return o.afterCrop=function(o){r.afterCrop(o)},o}},{key:"afterCrop",value:function(r){var o=new FormData,t=$(this.modal),e=$(this.uploadInput);o.append("token",e.data("token")),o.append("file",e[0].files[0]);var a=function(o){return new Promise(function(o,t){$.post(e.data("crop"),r,function(r){o(r)})})},i=function(r){return new Promise(function(o,a){$.post(e.data("saveUrl"),{images:r},function(r){r.image&&($(e.data("targetImg")).attr("src",r.image),(0,d.default)("success",Translator.trans("site.upload_success_hint")))}).error(function(){(0,d.default)("danger",Translator.trans("site.upload_fail_retry_hint"))}).always(function(){e.val(""),t.modal("hide")})})};(function(){return new Promise(function(r,t){$.ajax({url:e.data("fileUpload"),type:"POST",cache:!1,data:o,processData:!1,contentType:!1}).done(function(o){r(o)})})})().then(function(r){return a()}).then(function(r){return i(r)}).catch(function(r){})}}]),r}();o.default=s}},["b15d5e658e0970f1ac54"]);