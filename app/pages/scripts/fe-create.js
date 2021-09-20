// window.onload = async (e) => {
// async event handler for window global object onload event
window.addEventListener("load", function() { 
  const createArticleForm = document.getElementById("createArticleForm");
  let userId = localStorage.getItem("userId");
  userId = userId ? userId : "";
  // we know that userId exist, because we check it in the home page and
  // if it no userId in local storage, this page wouldn't be shown at all
  // but one more check it also usefull, to avoid undesired side effects

  createArticleForm.onsubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: e.target.querySelector("#titleInput").value,
      content: e.target.querySelector("#contentTextArea").innerHTML,
      author: userId,
    };

    console.log(data);

    fetch("/article/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      const resData = await res.json();
      console.log("data in create article page: ", resData);
      if (!!resData && !!resData.userId) {
        localStorage.setItem("userId", resData.userId);
        window.alert(`Welcome ! userId: ${resData.userId}`);
        // redirect to dashboard or something i.e. createArticle page/hint
      } else if (resData.message) {
        console.log("error in create Article Page page: ", resData.message);
        // show alert/toast message or validation hints under inputs with purpose to try again
      }
      // localStorage.set("userId", data.userId); setItem(), getItem(), removeItem(), clear()
      setTimeout(function(){window.location.assign("/");}, 1000);
      
    });
  };

  // Editor Functionality, with execCommand [deprecated!!!]
  var contentText = document.getElementById('contentTextArea');
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

  // document.execCommand('formatBlock', false, tagName);

});

window.onerror = async (err) => {
  console.log("Error from window: ", err);
};
