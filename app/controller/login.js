function login(){
    var username = document.getElementById("username").value, password = document.getElementById("password").value;
    $.post("../controller/loginController.php",{
        nick: username,
        password: password
    },function(data,status){
        switch(data){
            case "ok":
                displayModal("ok");
                break;
            case "wrong":
                displayModal("Wrong password!");
                break;
            case "not_found":
                displayModal("User not found");
                break;
        }
    });
    return false;
}

setUpModal();