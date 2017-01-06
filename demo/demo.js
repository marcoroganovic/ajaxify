(function() {
  
  var root = "http://jsonplaceholder.typicode.com";
  var Collection;

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

  var getPosts = ajaxify.get({
    url: root + "/posts",

    success: function(data) {
      Collection = JSON.parse(data);
      renderPosts(Collection);
    },

    failure: function() {
      posts.innerHTML = "Loading...";
    }
  });

  button.addEventListener("click", function(e) {
    getPosts.send();
  });
  
})();
