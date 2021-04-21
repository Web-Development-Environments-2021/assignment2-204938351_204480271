

function logIn() {
    // if (isValidLogin()) {
    //     getElementById("loginForm").reset();
    //     show(login, settings);
    // }
    // else {
    //     alert("Wrong username or password. Please try again")
    // }
    alert("Please")
}

function isValidLogin() {
    let userName = getElementById("loginForm").elements[0].value;
    let password = getElementById("loginForm").elements[1].value;
    for (const user in allUsers) {
        if (user.userName === userName && user.password === password) {
            return true;
        }
    }
    return false;
}