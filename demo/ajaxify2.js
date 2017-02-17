(function(lib, global) {
  
  if(typeof module === "object" && typeof exports === "object") {
    module.exports = lib();
  } else if(typeof define === "function" && define.amd) {
    return define([], lib);
  } else {
    global.ajaxify = lib();
  }

})(function() {
  "use strict";

  var HTTP_METHODS = ["GET", "POST", "PUT", "DELETE"];

  // Helpers
  
  function isString(arg) {
    return typeof arg === "string";
  }


  function isNumber(arg) {
    return typeof arg === "nuber";
  }


  function isBoolean(arg) {
    return typeof arg === "boolean";
  }


  function isObject(arg) {
    return typeof arg === "object";
  }


  function isFunction(arg) {
    return typeof arg === "function";
  }


  function isWriteMethod(method) {
    return (
        typeof method === "post" || 
        typeof method === "put"  ||
        typeof method === "delete"
    );
  }

  
  function formatQueryString(obj) {
    if(!isObject(obj)) return obj;
    var keys = Object.keys(obj);

    return keys.map(function(key) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
    }).join("&");
  }


  function formatData(obj) {
    return obj instanceof FormData ? data : formatQueryString(data);
  }

  
  function setHeaders(req, headers) {
    for(var header in headers) {
      if(headers.hasOwnProperty(header)) {
        req.setRequestHeader(header, headers[header]);
      }
    }
  }


  function setFormHeader(req, headers) {
    var defaultHeader = "application/x-www-form-urlencoded";
    headers["Content-Type"] = headers["Content-Type"] || defaultHeader;
    req.setRequestHeader("Content-Type", headers["Content-Type"]);
  }

  
  function createRequest(method) {
    method = method.toLowerCase();

    return function(url, opts) {
      var req = new XMLHttpRequest();
      var headers = opts.headers || null;
      var data = opts.data || null;
      var progressFns = [];

      var promise = new Promise(function(resolve, reject) {

        req.addEventListener("progress", function(e) {
          progressFns.forEach(function(fn) {
            fn(req);
          });
        });


        req.addEventListener("load", function(e) {
          var responseContent = isBoolean(opts) && opts ? 
                           JSON.parse(req.responseText) :
                           req.responseText;
          resolve(responseContent);
        });


        req.addEventListener("error", function(e) {
          reject(req.status, req.responseText);
        });
     
        if(headers) { setHeaders(req, headers); }
        if(isWriteMethod(method)) { setFormHeader(req, headers); }
        
        req.open(method, url);
        req.send(data ? formatData(data) : null);
      });

      promise.progress = function(cb) {
        if(isFunction(cb)) {
          progressFns.push(cb);
          return this;
        } else {
          throw new TypeError("expected function, instead got " + typeof cb);
        }
      }

     return promise;
    }
  }


  var API = {};

  HTTP_METHODS.forEach(function(method) {
    method = method.toLowerCase();
    API[method] = createRequest(method);
  });

  return API;
    
}, this);
