webpackJsonp(["app/js/upload-image/index"],{fbfa32e7971416e5ccfc:function(e,a,t){"use strict";cd.upload({el:".js-upload-input"}).on("error",function(e){"FILE_SIZE_LIMIT"===e?cd.message({type:"danger",message:Translator.trans("uploader.size_2m_limit_hint")}):"FLIE_TYPE_LIMIT"===e&&cd.message({type:"danger",message:Translator.trans("uploader.type_denied_limit_hint")})}).on("success",function(e,a,t){cd.crop({event:e,src:t}).on("success",function(a){var t=$(e.currentTarget);localStorage.setItem("crop_image_attr",JSON.stringify(a));var s=cd.loading({isFixed:!0});$("#modal").html(s).modal({backdrop:"static",keyboard:!1}).load(t.data("saveUrl"))})})}},["fbfa32e7971416e5ccfc"]);