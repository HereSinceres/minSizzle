!function(e){function n(n){return null!=n&&n.window==e}function t(e){return null!=e&&e.nodeType&&9==e.nodeType}function r(e){return"[object Array]"==Object.prototype.toString.call(e)}function o(e){return"[object Function]"==Object.prototype.toString.call(e)}function c(e){var t=[],r=e.length;if(null==r||"string"==typeof e||o(e)||n(e))t[0]=e;else for(;r;)t[--r]=e[r];return t}function l(e,n){console.log(n);var t,o=[];n=r(n)?n:[n];for(var i=null!==e.match(/^\w+/)&&e.match(/^\w+/)[0]||"*",a=0,u=n.length;a<u;a++)o=o.concat(c(n[a].getElementsByTagName(i.toUpperCase())));if("*"!==i&&(e=e.replace(new RegExp("^"+i,""),"")),/^#/.test(e)){var f=e.match(p.ID)[0].replace("#","");e=e.replace(new RegExp("^#"+f,""),"");for(var s=0,u=o.length;s<u;s++)t=o[s],t.id!=f&&(o.splice(s,1),u--,--s)}if(/^\./.test(e))for(var g=e.match(p.CLASS)[0].replace(".",""),e=e.replace(new RegExp("^."+g,""),""),s=0,u=o.length;s<u;s++){t=o[s],className=" "+t.className+" ";var m=new RegExp(g,"");m.test(className)||(o.splice(s,1),u--,--s)}return e=e.replace(/^\s+/,""),e?l(e,o):o}function i(e,r){var o,c=[];if(e=e||document,r=r&&1===r.nodeType?r:document,t(e)||n(e))return e;if(1===e.nodeType)return e;if("string"==typeof e){if(e=e.replace(/^\s+|\s+$/g,""),p.ID.test(e))return document.getElementById(e.replace("#",""));o=e.split(",");for(var i=0,a=o.length;i<a;i++){var u=o[i].replace(/^\s+|\s+$/g,"");u&&(c=c.concat(l(u,r)))}}return c}var a="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",p={ID:new RegExp("^#("+a+")"),CLASS:new RegExp("^\\.("+a+")"),TAG:new RegExp("^("+a+"|[*])")},u=e.minSizzle;i.noConflict=function(){return e.minSizzle===i&&(e.minSizzle=u),i},"function"==typeof define&&define.amd?define(function(){return i}):"undefined"!=typeof module&&module.exports?module.exports=i:e.minSizzle=i}(window);
//# sourceMappingURL=minSizzle.js.map
