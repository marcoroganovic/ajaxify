(function(global) {

  "use strict";

  var HTTP_METHODS = ["GET", "POST", "PUT", "DELETE"];

  function isBool(arg) {
    return typeof arg === "boolean";
  }

  function isFunc(arg) {
    return typeof arg === "function";
  }

  function isWriteMethod(method) {
    return (
      typeof method === "post" || 
      typeof method === "put"  || 
      typeof method === "delete"
    );
  }

  function addProgressMethod(obj, arr) {
    obj.progress = function(cb) {
      if(isFunc(cb)) {
        arr.push(cb);
        return this;
      } else {
        throw new TypeError("Expected function, instead got " + typeof cb);
      }
    }
  }

  function handleProgress(req, progressFns) {
    progressFns.forEach(function(fn) {
      fn(req);
    });
  }

  function handleSuccess(req, resolve, opts) {
    return function(e) {
      resolve(
        isBool(opts) ? 
        JSON.parse(req.responseText) : 
        req.responseText
      );
    }
  }

  function handleError(req, reject) {
    return function(e) {
      reject(req.status, req.responseText);
    }
  }

  function setupListeners(xhr, opts, resolve, reject, progressArr) {
    xhr.addEventListener("progress", handleProgress(xhr, progressArr));
    xhr.addEventListener("load", handleSuccess(xhr, resolve, opts));
    xhr.addEventListener("error", handleError(reject));
  }

  function setDefaultHeaders(method, headers, opts) {
    headers["Content-Type"] = (
        isBool(opts) ? "application/json" :
        isWriteMethod(method) ? "application/x-www-form-urlencoded" : ""
      );
  }


  function setHeaders(req, headers) {
    for(var header in headers) {
      if(headers.hasOwnProperty(headers)) {
        req.setRequestHeader(header, headers[header]);
      }
    }
  }


  function createMethod(method) {
    var httpMethod = method.toLowerCase();
    var progressFns = [];

    return function(url, opts) {
      var xhr = new XMLHttpRequest(); xhr.open(method, url);
      var data = opts.data || null; var headers = opts.headers || {};

      var promise = new Promise(function(resolve, reject) {
        setupListeners(xhr, opts, resolve, reject, progressFns);
        setDefaultHeaders(method, headers,  opts); 
        setHeaders(xhr, headers);
        xhr.send(data);
      });

      addProgressMethod(promise, progressFns); 
      return promise;
    }
  }

  var ajaxify = {};

  HTTP_METHODS.forEach(function(method) {
    ajaxify[method.toLowerCase()] = createMethod(method);
  });

  global.ajaxify = ajaxify;

})(this);
