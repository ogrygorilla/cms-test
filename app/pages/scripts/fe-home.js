// async event handler for window global object onload event
window.addEventListener("load", function() { 
  
  // get div with id = `articlesDiv` which should contain
  // the articles that are shown on the home page
  const articlesDiv = document.getElementById("articlesDiv");

  // async event handler for an event, when the area with id = `articlesDiv`
  // get clicked
  articlesDiv.onclick = async (e) => {
    console.log("articlesDiv clicked!: ", e);
  };

  // send request to fetch articles from mongoDB. This request also triggers controller and correspoding method
  // using router implementation in app.js file in the `initialize routes for the application`-section
  fetch("/articles", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  
  // after we got an answer from server, we should handle it. Since fetch is async process,
  // we can do it with `async,await`-constructionor with `.then`-construction.
  // The answer from the srver is in the `res` variable.
  .then(async (res) => {
    // convert res variable to json format
    const resData = await res.json();
    // if resData exists
    if (!!resData) {
      // save all articles in browser local storage to have the possibility
      // to acces them later when necessary without additional request to server
      localStorage.setItem("articles", JSON.stringify(resData));
      console.log("data in home page: ", resData);
      console.log(Array.from(resData));
      // prepare arra to store formatted articles
      const articles = [];

      // formating each article which is contained in `resData` array
      // to the desired layout format
      resData.forEach((article) => {
        console.log(article);
        article = `
          <article class="article-preview" id="article${article._id}">
            <a href="/article/${article._id}">
              <h2>${article.title}</h2>
            </a>
            <p class="content-preview">${article.content}</p>
          </article>
          `;
        articles.push(article);
      });
 
      // Make a string from formated articles array with `join() function` and insert this string
      // into DOM element which is saved in `articlesDiv` variable
      articlesDiv.innerHTML = articles.join("");
      } 
    else if (resData.message) {
      // if backend send error message, show this message in console
      console.log("error in Home Page page: ", resData.message);
      // show alert/toast message or validation hints under inputs with purpose to try again
    }
  });
});

  // if (articles) {
  //   // transform each article in template with variables
  //   // <div class="article" id ="article + ${article.id}">
  //   //   <strong>${article.title}</strong>
  //   //   <strong>${article.author}</strong>
  //   //   <br />
  //   //   <p>${article.content}</p>
  //   // </div>;
  //   // articlesDiv.innerHTML (articles)
  // } else {
  //   // there no articles yet! message, show loading
  //   articlesDiv.innerHTML = `<div>Loading...</div>`;
  // }

  //  };