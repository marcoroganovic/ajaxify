## Promise based AJAX library

If second arguments is boolean `true` the browser will send request for data in
JSON format. If arguments remain empty it will just return text.

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
