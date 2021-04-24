var allUsers = [{userName: "a", password: "aaaa1111", fullName: "a", email: "a@a.com", birthDate: "2021-04-06"}]

function submitDetails(){
    let password = $("#Password").val();
    let fullName = $("#FullName").val();
    let email = $("#Email").val();
    let username = $("#Username").val();
    let birthDate = $("#Birthday").val();

    if(checkPassword(password) && checkName(fullName) && checkMail(email)){
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
        show(register, settings);
        usernameOnMenuBar(username);

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
        if(fullName == "")  throw "Username is empty";
        if(!(fullName.match(regex)))  throw "Username should not contain numbers";
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