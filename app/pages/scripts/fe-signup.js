// window.onload = async (e) => {
// async event handler for window global object onload event
window.addEventListener("load", function() { 
    const signupForm = document.getElementById("signupForm");
    // const signUpButton = document.getElementById("signUpButton");
    // const emailInput = document.getElementById("emailInput");
    // const passwordInput = document.getElementById("passwordInput");

    // const data = {
    //   email: "Serg@mail.ru",
    //   password: "test",
    // };

    signupForm.onsubmit = async (e) => {
        e.preventDefault();

        // check if email is correct twice
        email1 = document.getElementById("emailInput");
        email2 = document.getElementById("emailInputrepeat");
        pw = document.getElementById("passwordInput");

        if (!email1.value.includes("@") || !email1.value.includes(".") || email1.value.lastIndexOf(".") < email1.value.search("@")){
            email1.value ="";
            email1.placeholder = "Email Address not valid!";
            email1.style.setProperty("--mail-placeholder-color", "darkorange");
            email1.addEventListener("click", function(){
                email1.placeholder = "Email Address";
                email1.style.setProperty("--mail-placeholder-color", "gray");
            });
        }
        else if (!email2.value.includes("@") || !email2.value.includes(".") || email2.value.lastIndexOf(".") < email2.value.search("@")){
            email2.value ="";
            email2.placeholder = "Email Address not valid!";
            email2.style.setProperty("--mail-placeholder-color", "darkorange");
            email2.addEventListener("click", function(){
                email2.placeholder = "Email Address";
                email2.style.setProperty("--mail-placeholder-color", "gray");
            });
        }
        else if (email1.value == ""){
            email1.placeholder = "Email Address can not be empty!";
            email1.style.setProperty("--mail-placeholder-color", "darkorange");
            email1.addEventListener("click", function(){
                email1.placeholder = "Email Address";
                email1.style.setProperty("--mail-placeholder-color", "gray");
            });
        }
        else if (email1.value != email2.value){
            email2.value = "";
            email2.placeholder = "Email adresses don`t match!";
            email2.style.setProperty("--mailrepeat-placeholder-color", "darkorange");
            email2.addEventListener("click", function(){
                email2.placeholder = "Repeat Email Address";
                email2.style.setProperty("--mailrepeat-placeholder-color", "gray");
            });
            
        }
        else if (pw.value == ""){
            pw.placeholder = "Password can not be empty!";
            pw.style.setProperty("--pw-placeholder-color", "darkorange");
            pw.addEventListener("click", function(){
                pw.placeholder = "Password";
                pw.style.setProperty("--pw-placeholder-color", "gray");
            });
        }
        else{
        const data = {
            email: e.target.querySelector("#emailInput").value,
            password: e.target.querySelector("#passwordInput").value,
        };

        console.log(data);

        const res = await fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        console.log("response in signUp page: ", res);
        const resData = await res.json();
        console.log("data in signUp page: ", resData);

        if (resData.message == "USER_ALREADY_EXISTS") {
            email2.value = "";
            email2.placeholder = "Email already registered!";
            email2.style.setProperty("--mailrepeat-placeholder-color", "red");
            email2.addEventListener("click", function(){
                email2.placeholder = "Repeat Email Address";
                email2.style.setProperty("--mailrepeat-placeholder-color", "gray");
            });  
        };
        if (resData.message == "USER_CREATED") {
            document.querySelector("#success-message").classList.remove("hide");
            document.querySelector("#signupForm").style.display = "none";       
        }

        }
    };
  });

  window.onerror = async (err) => {
    console.log("Error from window: ", err);
  };