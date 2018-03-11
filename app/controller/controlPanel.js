$(document).ready(function () {

    setUpAjax();

    

    function setUpAjax() {
        var links = document.querySelectorAll(".config-menu");
        links.forEach(function (link) {
            link.addEventListener("click", function () {
                switch (this.id) {
                    case "create-user":
                        $(".content").fadeOut("fast", function () {
                            $(".content").load("./controlPanelPages/create_user.html", function () {
                                $(".content").fadeIn("fast");
                            });
                        });
                        break;
                    case "create-post":
                        $(".content").fadeOut("fast", function () {
                            $(".content").load("./controlPanelPages/create_post.html", function () {
                                $("#text-area").trumbowyg();
                                setFileUpdateEvent();
                                $(".content").fadeIn("fast");
                            });
                        });
                        break;
                    case "list-posts":
                        $(".content").fadeOut("fast", function () {
                            $(".content").load("./controlPanelPages/list_posts.html", function () {
                                $(".content").fadeIn("fast");
                            });
                        });
                        break;
                    case "edit-users":
                    $(".content").fadeOut("fast", function () {
                        $(".content").load("./controlPanelPages/edit_users.html", function () {
                            $(".content").fadeIn("fast");
                        });
                    });
                        break
                    case "logoff":

                        break;
                }
            });
        });
    }

    function setFileUpdateEvent() {
        var input = document.getElementById("image"),
            fileName = document.getElementById("file-name");

        input.addEventListener("change", function () {
            var fullPath = this.value;
            var nameOnly;
            var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            nameOnly = fullPath.substring(startIndex);
            if (nameOnly.indexOf('\\') === 0 || nameOnly.indexOf('/') === 0) {
                nameOnly = nameOnly.substring(1);
            }

            fileName.textContent = nameOnly;
        });
    }

});

function createUser(){
    var user = {
        name: document.getElementById("name").value,
        unsername: document.getElementById("username").value,
        password: document.getElementById("password").value,
        passwordConfirm: document.getElementById("password-confirm").value,
        isAdmin: document.getElementById("isAdmin").value
    }

    console.log(user);

    if(user.password!==user.passwordConfirm){
        alert("passwords do not match!");
        return;
    }

    $.post("",user,function(data,status){

    });
}