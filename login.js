function logIn() {
    if (isValidLogin()) {
        loginForm.reset();
        show(login, settings);
    }
    else {
        alert("Wrong username or password. Please try again")
    }
}

function isValidLogin() {
    let userName = loginForm.elements[0].value;
    let password = loginForm.elements[1].value;
    console.log(userName, password)
    console.log(allUsers)
    for (let i = 0; i < allUsers.length; i++) {
        console.log(allUsers[i].userName)
        if (allUsers[i].userName === userName && allUsers[i].password === password) {
            return true;
        }
    }
    return false;
}