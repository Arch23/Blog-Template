function login(){
    var username = document.getElementById("username").value, password = document.getElementById("password").value;
    $.post("../controller/loginController.php",{
        nick: username,
        password: password
    },function(data,status){
        data = JSON.parse(data);
        switch(data.auth){
            case "ok":
                Cookies.set("name",data.name);
                Cookies.set("nick",data.nick);
                Cookies.set("privilege",data.privilege);
                sessionStorage.setItem('loggedIn',true);
                window.location.replace("controlPanel.html");
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