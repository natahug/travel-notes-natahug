parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"fRxd":[function(require,module,exports) {
var e=function(){document.body.style.border="1px solid pink",console.log(document.body.childNodes[1].childNodes[1].childNodes[0].nodeType);var e=document.getElementById("the-heading");e.innerHTML="HELLO WORLD",e.style.border="50px solid magenta";var o=document.querySelector(".first-item");o.style.border="1px solid white";var d=document.createElement("li");d.innerText="Four",o.parentElement.appendChild(d);var l=document.querySelectorAll("li");console.log(l)};alert("Hello"),window.addEventListener("load",e);var o=function e(o){if(0===o.childNodes.length)return 1;for(var d=1,l=0;l<o.childNodes.length;l++)d+=e(o.childNodes[l]);return d};console.log(o(document.body));
},{}]},{},["fRxd"], null)
//# sourceMappingURL=/dom.1c847865.js.map