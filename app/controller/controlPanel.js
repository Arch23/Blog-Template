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
                    $(".content").fadeOut("fast", function () {
                        $(".content").load("./controlPanelPages/edit_users.html", function () {
                            getUsers();
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
    });

    loadTextEditor();
}

function createUser() {
    var name = document.getElementById("name").value,
        unsername = document.getElementById("username").value,
        password = document.getElementById("password").value,
        passwordConfirm = document.getElementById("password-confirm").value,
        isAdmin = document.getElementById("isAdmin").value;



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
    });
}

const userEntry = ({
    name,
    username
  }) => `<div class="user-grid-layout row">
  <p>${name}</p>
  <p>${username}</p>
  <a id="${name}-${username}">
      <i class="icon ion-edit"></i>
  </a>
  <a id="${name}-${username}">
      <i class="icon ion-close-circled"></i>
  </a>
</div>`;