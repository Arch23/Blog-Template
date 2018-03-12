$(document).ready(function () {

    setUpAjax();
    setUpModal();
});

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
                            /* $("#text-area").trumbowyg(); */
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
                    loadEditUsers();
                    break
                case "logoff":

                    break;
            }
        });
    });
}

function loadEditUsers(){
    $(".content").fadeOut("fast", function () {
        $(".content").load("./controlPanelPages/edit_users.html", function () {
            getUsers();
            $(".content").fadeIn("fast");
        });
    });
}

function loadChangeUser(origin){
    $(".content").fadeOut("fast", function () {
        $(".content").load("./controlPanelPages/change_data.html", function () {
            getUserData(origin);
            document.getElementById("return").addEventListener("click",function(){
                loadEditUsers();
            });
            $(".content").fadeIn("fast");
        });
    });
}

function getUserData(origin){
    var nameUser = origin.id.split("-");
    $.post("../controller/controlPanelController.php",{
        name: nameUser[0],
        nickname: nameUser[1],
        tag: "get-user-data"
    },function(data,status){
        var user = JSON.parse(data);
        document.getElementById("new-name").value = user.name;
        document.getElementById("new-username").value = user.nickname;
        document.getElementById("new-isAdmin").checked = user.privilege==1?true:false;
        document.getElementById("change").addEventListener("click",function(){
            var passChanged,password, name=document.getElementById("new-name").value, nick=document.getElementById("new-username").value, isAdmin=(document.getElementById("new-isAdmin").checked===true?1:0);
            if(document.getElementById("new-password").value===""){
                passChanged = 0;
                password = user.password;
            }else{
                passChanged = 1;
                password = document.getElementById("new-password").value;
            }

            $.post("../controller/controlPanelController.php",{
                name: name,
                nick: nick,
                isAdmin: isAdmin,
                password: password,
                oldName: user.name,
                oldNick: user.nickname,
                passChanged: passChanged,
                tag: "update-user"
            },function(data,status){
                console.log(data);
                if(data==="ok"){
                    displayModal("User data changed!");
                    loadEditUsers();
                }else{
                    displayModal("Error changing data!");
                }
            });
        })
    });
}


function setUpModal() {
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function displayModal(text){
    $(".modal-content p").html(text);
    document.getElementById('myModal').style.display = "block";
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
        var url = "../controller/uploadController.php";

        var form = $('#VSF')[0];
        var formData = new FormData(form);
        formData.append("file", document.getElementById("image").files[0]);
        $.ajax(url, {
            method: 'post',
            processData: false,
            contentType: false,
            data: formData
        }).done(function (data) {
            console.log(data);
        }).fail(function (data) {
            console.log(data);
        });
    });

    loadTextEditor();
}

function createUser() {
    var name = document.getElementById("name").value,
        unsername = document.getElementById("username").value,
        password = document.getElementById("password").value,
        passwordConfirm = document.getElementById("password-confirm").value,
        isAdmin = (document.getElementById("isAdmin").checked===true?1:0);

    if (password !== passwordConfirm) {
        displayModal("Passwords do not match!");
        return;
    }

    $.post("../controller/controlPanelController.php", {
        name: name,
        username: unsername,
        password: password,
        isAdmin: isAdmin,
        tag: "createUser"
    }, function (data, status) {
        if(data=="duplicated"){
            displayModal("Username already exists!");
        }else if(data=="ok"){
            document.querySelector(".create-user").reset();
            displayModal("User created!");
        }else{
            displayModal("User not created!");
        }
    });
}

function getUsers(){
    $.post("../controller/controlPanelController.php",{
        tag:"getAllUsers"
    },function(data,status){
        var res = JSON.parse(data);
        res.forEach(function(e){
            $(".content").append([{
                name: e.name,
                username: e.nickname
              }].map(userEntry).join(''));
        });
        document.querySelectorAll(".user-edit").forEach(function(e){
            e.addEventListener("click",function(){
                loadChangeUser(this);
            });
        });
        document.querySelectorAll(".user-delete").forEach(function(e){
            e.addEventListener("click",function(){
                var nameUser = this.id.split("-");
                $.post("../controller/controlPanelController.php",{
                    name: nameUser[0],
                    nickname: nameUser[1],
                    tag: "delete-user"
                },function(data,status){
                    if(data=="ok"){
                        displayModal("User deleted!");
                    }else{
                        displayModal("Delete failed!");
                    }
                    loadEditUsers();
                });
            });
        });
    });
}

const userEntry = ({
    name,
    username
  }) => `<div class="user-grid-layout row">
  <p>${name}</p>
  <p>${username}</p>
  <a class="user-edit" id="${name}-${username}">
      <i class="icon ion-edit"></i>
  </a>
  <a class="user-delete" id="${name}-${username}">
      <i class="icon ion-close-circled"></i>
  </a>
</div>`;