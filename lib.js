var Ajaxify = (function() {
  
  var methods = ["GET", "POST", "PUT", "DELETE"];

  function isFunction(arg) {
    return typeof arg === "function";
  }

  function createRequest(method) {

    var httpMethod = method;

    return function(opts) {
      opts.request = new XMLHttpRequest();
      setStateChange(opts.request, opts.success, opts.failure);

      var config = getConfig(method, opts);
      
      if(opts.doSend) {
        sendRequest(config);
      } else {
        opts.send = function() { sendRequest(config); }
      }

      return opts;
    }
  }

  function setStateChange(request, success, fail) {
    request.onreadystatechange = function() {
      if(isSuccessfulRequest(request)) {
        handleSuccess(request, success);
      } else {
        handleFailure(request, fail);
      }
    }
  }

  function getConfig(httpMethod, opts) {
    return {
      request: opts.request, 
      headers: opts.headers,
      method: httpMethod, 
      data: opts.data, 
      url: opts.url
    }
  }

  function isSuccessfulRequest(request) {
    return (request.readyState === XMLHttpRequest.DONE && 
            request.status === 200 || request.status === 201);
  }

  function handleSuccess(request, callback) {
    if(isFunction(callback)) {
      callback(request.responseText);
    }
  }

  function handleFailure(request, callback) {
    if(isFunction(callback)) {
      callback(request.responseText, request.status);
    } else {
      console.log("AJAX error: unhandled error with reponse " + request.status + " and body: " + request.responseText);
    }
  }

  function sendRequest(opts) {
    opts.request.open(opts.method, opts.url);
    setHeaders(opts.request, opts.headers);
    if(opts.data) {
      opts.request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      opts.request.send(getQueryString(opts.data));
    } else {
      opts.request.send();
    }
  }

  function setHeaders(request, headers) {
    if(headers) {
      for(let header in headers) {
        request.setRequestHeader(header, headers[header]);
      }
    }
  }

  function addData(data) {
    return data instanceof FormData ? data : getQueryString(data);
  }

  function getQueryString(obj) {
    return typeof obj === "string" ? obj : 
           Object.keys(obj).map(function(key) {
             return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
           }).join("&");
  }


  var API = {};

  methods.forEach(function(method) {
    API[method.toLowerCase()] = createRequest(method);
  });

  return API;

})();
