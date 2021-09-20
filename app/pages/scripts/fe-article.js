//window.onload = async (e) => {
window.addEventListener("load", function() { 

  // get div with id = `articleDiv` which should contain
  // the article that are shown on the article detail page
  const articleDiv = document.getElementById("articleDiv");
  const buttonsDiv = document.getElementById("buttonsDiv");
  const editArticleTitle = document.getElementById("editArticleTitleInput");
  const editArticleText = document.getElementById("editArticleContentTextArea");

  articleId = window.location.href.split("/")[4];
  console.log(articleId);
  let articles = localStorage.getItem("articles");
  articles = JSON.parse(articles);
  console.log(articles);
  const articleData = articles.find((article) => article._id === articleId);
  console.log(articleData);

  // formating each article which is contained in `resData` array
  // to the desired layout format
  const article = `
              <div class="article" id="${articleData._id}">
                  <h1>
                      ${articleData.title}
                  </h1>
                  <br />
                  <p>${articleData.content}</p>
              </div>
              `;
  // Make a string from formated articles array with `join() function` and insert this string
  // into DOM element which is saved in `articlesDiv` variable
  articleDiv.innerHTML = article;
  editArticleTitle.innerHTML = `${articleData.title}`;
  editArticleText.innerHTML = `${articleData.content}`;

  // get needed dom elements and save them into variables
  const editArticleForm = document.getElementById("editArticleForm");
  const discardEditButton = document.getElementById("discardEditButton");
  const editArticleButton = document.getElementById("editArticleButton");
  const deleteArticleButton = document.getElementById("deleteArticleButton");
  const editToggle = document.getElementById("editToggle");
  const editButtons = document.getElementById("editButtons");
  const editArticleDiv = document.getElementById("editArticleDiv");
  



  // get needed data and it them into variables
  const userId = localStorage.getItem("userId");
  console.log(userId);

  // check for user
  if (userId === articleData.author) {
    // If user exists in local storage, it means that he is signed in.
    // Thats why we remove `hide`-class and make visible the elements
    // which are allowed to user: `editArticle`-button  and `delete article`-button
    console.log("success");
    editButtons.classList.remove("hide");
    
  } else {
    // If no user in the local storage, then we should
    // hide signout button and create article page
    // by adding `hide` class to elements
    editButtons.classList.add("hide");
    // editArticleDiv.classList.add("hide");
  }

  deleteArticleButton.onclick = async (e) => {
    e.preventDefault();

    const data = {
      articleId: articleData._id,
    };

    console.log(data);

    fetch("/article/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      const resData = await res.json();
      console.log("data in article page: ", resData);
      window.alert(resData.message);
      window.location.href = "/";
    });
  };

  editToggle.onclick = async (e) => {
    editArticleDiv.classList.remove("hide");
    editButtons.classList.add("hide");
    articleDiv.classList.add("hide");
    editArticleTitleInput.value = articleData.title;
    editArticleContentTextArea.innerHTML = articleData.content;
  };

  // Editor Functionality, with execCommand [deprecated!!!]
  var editorButtons = document.querySelectorAll(".editor-button,.headline-buttons");
  for (let editorButton of editorButtons) {
    editorButton.addEventListener('click', function() {
      var format = editorButton.dataset['format'];
      var formatParam = editorButton.dataset['param'];
      if(format === 'createlink') {
        let url = prompt("Enter the link here: ", "http:\/\/");
        if (url === null){
          return;
        }
        else{
          document.execCommand(format, false, url);
        };
      } else if(format === 'formatBlock') {
        document.execCommand(format, false,'<' + formatParam + '>');
      } else {
        document.execCommand(format, false, null);
      }
    })
  }

  discardEditButton.onclick = async (e) => {
    window.location.assign("/article/"+articleId);
  };

  editArticleForm.onsubmit = async (e) => {
    e.preventDefault();

    const data = {
      _id: articleData._id,
      title: e.target.querySelector("#editArticleTitleInput").value,
      content: e.target.querySelector("#editArticleContentTextArea").innerHTML,
      author: userId,
    };

    console.log(data);

    fetch("/article/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      const resData = await res.json();
      const newArticle = `
              <div class="article" id="${data._id}">
                  <strong>
                      ${data.title}
                  </strong>
                  <br />
                  <p>${data.content}</p>
              </div>
              `;
      // Make a string from formated articles array with `join() function` and insert this string
      // into DOM element which is saved in `articlesDiv` variable
      articleDiv.innerHTML = newArticle;
      console.log("data in article page: ", resData);
      //window.alert(resData.message);

      editArticleTitleInput.value = "";
      editArticleContentTextArea.innerHTML = "";

      // localStorage.set("userId", data.userId); setItem(), getItem(), removeItem(), clear()

      setTimeout(function(){window.location.assign("/");}, 1000);
    });
  };

  //here


});

window.onerror = async (err) => {
  console.log("Error from window: ", err);
};
