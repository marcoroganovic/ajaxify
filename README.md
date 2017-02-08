## Promise based AJAX library

### GET Method

If second argument is boolean `true` the browser will send request for data in
JSON format. If argument remains empty it will just return text.

Also to set custom headers you can pass it an `object` with `headers` key
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

To send data with one of write methods you would add data property on
config object that also can contain `headers`;

```javascript
const config = {
  data: {
    email: "me@email.com",
    username: "johndoe"
  }
};

ajaxify.post("https://localhost:3000/user", config)
  .progress(() => {
    displayProgressBar();
  })
  .then(() => {
    displaySuccesMessage("User was successfully created!");
  })
  .catch(() => {
    displayErrorMessage("Failed to create new user!");
  });

```
