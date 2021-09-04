// async event handler for window global object onload event
window.addEventListener("load", function() { 

  // get needed dom elements and save them into variables
  // const signoutButton = document.getElementById("signoutButton");
  const signoutItem = document.getElementsByClassName("logout");
  const hiddenItems = document.getElementsByClassName("ussign");

  // get needed data and it them into variables
  const user = localStorage.getItem("userId");
  const articles = localStorage.getItem("articles");
  console.log(user);

  // check for user
  if (user) {
    // If user exists in local storage, it means that he is signed in.
    // Thats why we remove `hide`-class and make visible the elements
    // which are allowed to user: `signout`-button  and `create article`-page
    for (i = 0; i < hiddenItems.length; i++) {
      hiddenItems[i].classList.toggle("hide");
    }

    // change Profile Picture and add Logout link
    document.querySelector(".profile-picture").src =
      "http://localhost/img/cms_projekt/test_profile_avatar_200px.jpg";
    document.querySelector("#profile-link").href="/profile";

    // Handler for case if signout button is clicked
    signoutItem[0].addEventListener("click", logout); 
    signoutItem[1].addEventListener("click", logout);

    async function logout(e){
      console.log("signed out!", e);

      // Remove user form local storage to implement
      // Sign out process
      localStorage.removeItem("userId");
      console.log(signoutItem.classList);

      // Hide signout button and create article page
      // by adding `hide` class to elements
      for (i = 0; i < hiddenItems.length; i++) {
        hiddenItems[i].classList.toggle("hide");
      }
    };
  };



  // Hamburger menu left
  document.querySelector("#toggle").addEventListener("click", function () {
    document.querySelectorAll(".navigation-primary").forEach(function (element) {
        if (element.classList.contains("active")) {
          element.classList.remove("active");
          document.querySelector("#toggle").querySelector("a").innerHTML =
            "&#x2630";
        } else {
          element.classList.add("active");
          document.querySelector("#toggle").querySelector("a").innerHTML = "X";
        }
      });
  });
});

