## jQuery's API inspired AJAX library

### Example usage

If configuration object contains 'doSend' property equal to true it will
automatically send request otherwise it will return object with 'send' method
that can be called on some event or such.

```javascript
var collection;

var getPosts = ajaxify.get({
  url: "http://jsonplaceholder.typicode.com/posts/",

  success: (data) => {
    collection = JSON.parse(data);
  },

  failure: (data, statusCode) => {
    console.log(data);
  }
});

getPosts.send();

// after some time

console.log(collection); // should result in
[Object, Object, Object ...]
```
