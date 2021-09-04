// window.onload = async (e) => {
// async event handler for window global object onload event
window.addEventListener("load", function() { 
    console.log(window.location.pathname);

    const loginForm = document.getElementById("login-form");
    // const signUpButton = document.getElementById("signUpButton");
    // const emailInput = document.getElementById("emailInput");
    // const passwordInput = document.getElementById("passwordInput");

    // const data = {
    //   email: "Serg@mail.ru",
    //   password: "test",
    // };

    loginForm.onsubmit = async (e) => {
        e.preventDefault();

        const data = {
            email: e.target.querySelector("#emailInput").value,
            password: e.target.querySelector("#passwordInput").value,
        };

        console.log(data);

        fetch("/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        ).then(async (res) => {
            const resData = await res.json();
            console.log("data in signIn page: ", resData);
            if (!!resData && !!resData.userId) {
                localStorage.setItem("userId", resData.userId);
                window.location.href = "/";
                // window.alert(`Welcome ! userId: ${resData.userId}`);
                // redirect to dashboard or something i.e. createArticle page/hint
            } else if (resData.message) {
                console.log("error in signIn page: ", resData.message);
                // show alert/toast message or validation hints under inputs with purpose to try again
            }
            // localStorage.set("userId", data.userId); setItem(), getItem(), removeItem(), clear()
        });
    };
});

window.onerror = async (err) => {
  console.log("Error from window: ", err);
};
