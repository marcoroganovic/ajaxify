## Promise based AJAX library

### GET Method

If second arguments is boolean `true` the browser will send request for data in
JSON format. If arguments remain empty it will just return text.

Also to set custom headers you can pass it an `object` with headers attribute
that also should be an `object`.

### Sample usage

```javascript

ajaxify.get("http://jsonplaceholder.typicode.com/posts/", true)
  .progress(() => {
    displayProgressBar();
  })
  .then((data) => {
    displayPosts(data);
  })
  .catch(() => {
    displayError();
  });

```

### POST, PUT, DELETE methods

To send one data with one of write request you would add data property on
config object.

```javascript
// todo
```
