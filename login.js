function logIn() {
    if (isValidLogin()) {
        loginForm.reset();
        show(login, settings);
    }
    else {
        document.getElementById("loginError").innerHTML = "Wrong username or password. Please try again";
    }
}

function isValidLogin() {
    let userName = loginForm.elements[0].value;
    let password = loginForm.elements[1].value;
    for (let i = 0; i < allUsers.length; i++) {
        console.log(allUsers[i].userName)
        if (allUsers[i].userName === userName && allUsers[i].password === password) {
            return true;
        }
    }
    return false;
}