var allUsers = [{userName: "k", password: "k", fullName: "k", email: "k", birthDate: "k"}]
var loggedIn = false;

function submitDetails(){
    let password = $("#Password").val();
    let fullName = $("#FullName").val();
    let email = $("#Email").val();
    let username = $("#Username").val();
    let birthDate = $("#Birthday").val();

    if(checkUserName(username) && checkPassword(password) && checkName(fullName) && checkMail(email) && checkDate(birthDate)){
        let newUser = {
            userName: username,
            password: password,
            fullName: fullName,
            email: email,
            birthDate: birthDate
            }
        
        allUsers.push(newUser);
        console.log(allUsers)

        registerForm.reset();
        show(register, welcome);
        loggedIn = true;
        document.getElementById("playBtn").display=true;
        usernameOnMenuBar(username);
    }
}

function checkUserName(username) {
    try { 
      if(username == "")  throw "Username is empty";
      for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].userName === username) throw "Username allready exists"
    }
      return true;
    }
    catch(err) {
      document.getElementById("submitionError").innerHTML = (err);
    }
}

function usernameOnMenuBar(userName){
document.getElementById("helloUsername").innerHTML = "Hello, "+userName;
}

function checkPassword(password) {
  var regex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/
  try { 
    if(password == "")  throw "Password is empty";
    if(password.length < 6) throw "password must contain at least 6 charachters";
    if(!(password.match(regex)))  throw "password must contain letters and numbers";
    return true;
  }
  catch(err) {
    document.getElementById("submitionError").innerHTML = (err);
  }
}

function checkName(fullName) {
    var regex = /^([^0-9]*)$/
    try { 
    if(fullName == "")  throw "Name is empty";
    if(!(fullName.match(regex)))  throw "Name should not contain numbers";
    return true;
    }
    catch(err) {
    document.getElementById("submitionError").innerHTML = (err);
    }
}

function checkMail(email) {
    var mailformat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    try {
        if (!(mailformat.test(email))) throw "Email not valid"
        return true;
    } 
    catch(err) {
        document.getElementById("submitionError").innerHTML = (err);
    }
}

function checkDate(date) {
    try {
        if (date == "") throw "Birth date not valid"
        return true;
    } 
    catch(err) {
        document.getElementById("submitionError").innerHTML = (err);
    }
}