var allUsers = [{userName: "noaamit", password: "na1234"}]

function submitDetils(){
    alert("I am an alert box!");
    checkPassword()
    var form = document.getElementById("registerForm");
    return
}

function checkPassword(){
    var letterNumber = /^[0-9a-zA-Z]+$/;
    try { 

        if ($("#Password").val().length < 6){
            throw "password must be more than 6 charachters";
        }
        else if ($("#Password").val().match(letterNumber)){
            throw "password must contain letters and numbers";

        }
    }
    catch(err) {
        message.innerHTML = "Input is " + err;
    }
    
}
