(function() {
  
  // cache DOM elements
  var button = document.querySelector(".get-posts");
  var posts = document.querySelector(".posts");
  
  function renderPosts(collection) {
    posts.innerHTML = "";
    collection.forEach(article => {
      posts.innerHTML += renderArticleUI(article);
    });
  }

  function renderArticleUI(data) {
    return `<article><h1>${data.title}</h1><p>${data.body}</p></article>`;
  }

  button.addEventListener("click", function(e) {
    ajaxify.get("http://jsonplaceholder.typicode.com/posts/", true)
      .progress(function() {
        posts.innerHTML = "Loading...";
      })

      .then(function(data) {
        renderPosts(data);
      })

      .catch(function(err) {
        posts.innerHTML = "Failed!";
      });
  });
  
})();
