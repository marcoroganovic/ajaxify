(function() {
  
  // cache DOM elements
  var button = document.querySelector(".get-users");
  var posts = document.querySelector(".users");
  
  function renderUsers(collection) {
    posts.innerHTML = "";
    collection.forEach(user => {
      posts.innerHTML += renderUserUI(user);
    });
  }

  function renderUserUI(data) {
    return `
      <div class="user">
        <div class="user-image">
          <img src="${data.picture.large}" alt="User Image" />
        </div>
        <div class="user-info">
          <p class="name">
            <b>Name:</b> ${data.name.title}. ${data.name.first} ${data.name.last}
          </p>
          <p class="info">
            <p><b>Email:</b> ${data.email}</p>
          </p>
          <p class="phone">
            <p><b>Phone:</b> ${data.phone}</p>
          </p>
        </div>
      </div>
    `;
  }

  button.addEventListener("click", function(e) {
    
    ajaxify.get("https://randomuser.me/api/?results=10", true)
      .progress(function() {
        posts.innerHTML = "Loading...";
      })

      .then(function(data) {
        renderUsers(data.results);
      })

      .catch(function(err) {
        posts.innerHTML = "Failed!";
      });

  });
  
})();
