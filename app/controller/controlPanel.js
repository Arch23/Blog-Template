$(document).ready(function () {
    isLoggedIn();
    checkPrivilege();
    setUpAjax();
    setUpModal();
});

var divToLoad = ".content";

function checkPrivilege() {
    if (Cookies.get("privilege") == 1) {
        $("#options-menu").prepend("<li><a class=\"btn btn-options config-menu\" id=\"create-user\">Create new user</a></li><li><a class=\"btn btn-options config-menu\" id=\"edit-users\">Edit Users</a></li>");
    }
}

function setUpAjax() {
    var links = document.querySelectorAll(".config-menu");
    links.forEach(function (link) {
        link.addEventListener("click", function () {
            switch (this.id) {
                case "create-user":
                    loadCreateUser();
                    break;
                case "create-post":
                    loadCreatePost();
                    break;
                case "list-posts":
                    listPosts();
                    break;
                case "edit-users":
                    loadEditUsers();
                    break
                case "logoff":
                    logoff();
                    break;
            }
        });
    });
}

function logoff() {
    Cookies.remove("name");
    Cookies.remove("nick");
    Cookies.remove("privilege");
    window.location.href = "loginCP.html";
    // window.location.replace("loginCP.html");

}

function loadCreateUser() {
    $(divToLoad).fadeOut("fast", function () {
        $(divToLoad).load("./controlPanelPages/create_user.html", function () {
            $(divToLoad).fadeIn("fast");
        });
    });
}

function loadCreatePost() {
    $(divToLoad).fadeOut("fast", function () {
        $(divToLoad).load("./controlPanelPages/create_post.html", function () {
            /* $("#text-area").trumbowyg(); */
            setFileUpdateEvent();
            getPostNumber();
            deleteUnusedImages();
            $(divToLoad).fadeIn("fast");
        });
    });
}

function listPosts() {
    $(divToLoad).fadeOut("fast", function () {
        $(divToLoad).load("./controlPanelPages/list_posts.html", function () {
            getPosts();
            $(divToLoad).fadeIn("fast");
        });
    });
}

function loadEditUsers() {
    $(divToLoad).fadeOut("fast", function () {
        $(divToLoad).load("./controlPanelPages/edit_users.html", function () {
            getUsers();
            $(divToLoad).fadeIn("fast");
        });
    });
}

function loadChangeUser(origin) {
    $(divToLoad).fadeOut("fast", function () {
        $(divToLoad).load("./controlPanelPages/change_data.html", function () {
            getUserData(origin);
            document.getElementById("return").addEventListener("click", function () {
                loadEditUsers();
            });
            $(divToLoad).fadeIn("fast");
        });
    });
}

function getUserData(origin) {
    var nameUser = origin.id.split("-");
    $.post("../controller/controlPanelController.php", {
        name: nameUser[0],
        nickname: nameUser[1],
        tag: "get-user-data"
    }, function (data, status) {
        var user = JSON.parse(data);
        document.getElementById("new-name").value = user.name;
        document.getElementById("new-username").value = user.nickname;
        document.getElementById("new-isAdmin").checked = user.privilege == 1 ? true : false;
        document.getElementById("change").addEventListener("click", function () {
            var passChanged, password, name = document.getElementById("new-name").value,
                nick = document.getElementById("new-username").value,
                isAdmin = (document.getElementById("new-isAdmin").checked === true ? 1 : 0);
            if (document.getElementById("new-password").value === "") {
                passChanged = 0;
                password = user.password;
            } else {
                passChanged = 1;
                password = document.getElementById("new-password").value;
            }

            $.post("../controller/controlPanelController.php", {
                name: name,
                nick: nick,
                isAdmin: isAdmin,
                password: password,
                oldName: user.name,
                oldNick: user.nickname,
                passChanged: passChanged,
                tag: "update-user"
            }, function (data, status) {
                console.log(data);
                if (data === "ok") {
                    displayModal("User data changed!");
                    loadEditUsers();
                } else {
                    displayModal("Error changing data!");
                }
            });
        })
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
        //postMainImage();
    });

    loadTextEditor();
}

function createUser() {
    var name = document.getElementById("name").value,
        username = document.getElementById("username").value,
        password = document.getElementById("password").value,
        passwordConfirm = document.getElementById("password-confirm").value,
        isAdmin = (document.getElementById("isAdmin").checked === true ? 1 : 0);

    if (password !== passwordConfirm) {
        displayModal("Passwords do not match!");
        return;
    }

    $.post("../controller/controlPanelController.php", {
        name: name,
        username: username,
        password: password,
        isAdmin: isAdmin,
        nick: Cookies.get("nick"),
        tag: "createUser"
    }, function (data, status) {
        if (data == "duplicated") {
            displayModal("Username already exists!");
        } else if (data == "ok") {
            document.querySelector(".create-user").reset();
            displayModal("User created!");
        } else {
            displayModal("User not created!");
        }
    });
}

function getUsers() {
    $.post("../controller/controlPanelController.php", {
        tag: "getAllUsers",
        nick: Cookies.get("nick")
    }, function (data, status) {
        if (data != "") {
            var res = JSON.parse(data);
            res.forEach(function (e) {
                $(divToLoad).append([{
                    name: e.name,
                    username: e.nickname
                }].map(userEntry).join(''));
            });
            document.querySelectorAll(".user-edit").forEach(function (e) {
                e.addEventListener("click", function () {
                    loadChangeUser(this);
                });
            });
            document.querySelectorAll(".user-delete").forEach(function (e) {
                e.addEventListener("click", function () {
                    var nameUser = this.id.split("-");
                    $.post("../controller/controlPanelController.php", {
                        name: nameUser[0],
                        nickname: nameUser[1],
                        tag: "delete-user"
                    }, function (data, status) {
                        if (data == "ok") {
                            displayModal("User deleted!");
                        } else {
                            displayModal("Delete failed!");
                        }
                        loadEditUsers();
                    });
                });
            });
        }
    });
}

function sendPost() {
    /* ImageMain */
    const form = $('#post-editor')[0];
    var formData = new FormData(form);
    const image = document.getElementById("image").files[0];
    const blogTitle = $("#post-title").val();
    const blogText = $("#text-area").trumbowyg("html");

    formData.append("file", image);
    formData.append("tag", "newPost");
    formData.append("title", blogTitle);
    formData.append("text", blogText);
    formData.append("userName", Cookies.get("name"));
    formData.append("userNick", Cookies.get("nick"));

    $.ajax("../controller/controlPanelController.php", {
        method: 'post',
        processData: false,
        contentType: false,
        data: formData
    }).done(function (data) {
        if (data === "saved") {
            displayModal("Post created successfully!");
            loadCreatePost();
        }
    }).fail(function (data) {
        console.log(data);
    });
}

function getPostNumber() {
    $.post("../controller/controlPanelController.php", {
            tag: 'postNumber'
        },
        function (data) {
            Cookies.set("numPosts", data);
        });
}

function deleteUnusedImages() {
    $.post("../controller/uploadController.php", {
        controlTag: "deleteOlder"
    });
}

function getPosts() {
    console.log(Cookies.get("privilege"));
    if (Cookies.get("privilege") === "1") {
        getAllPosts();
    } else {
        getUserPosts(Cookies.get("nick"), Cookies.get("name"));
    }
}

function getUserPosts(nick, name) {
    $.post("../controller/controlPanelController.php", {
            tag: "getUserPost",
            userName: name,
            userNick: nick
        },
        function (data) {
            console.log(JSON.parse(data));
        });
}

function getAllPosts() {
    console.log("?");
    $.post("../controller/controlPanelController.php", {
        tag: "getAllPost",
    },
    function (data) {
        data = JSON.parse(data);
        var newDate;
        data.forEach(e => {
            newDate = e.date.split("-").reverse().join("/");
            $(divToLoad).append([{
                title: e.title,
                date: newDate,
                author: e.User_name
            }].map(postEntry).join(''));
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

const postEntry = ({
    title,
    author,
    date
}) => `<div class="list-content-grid row">
<p>${title}</p>
<p>${author}</p>
<p>${date}</p>
<a href="#">
    <i class="icon ion-edit"></i>
</a>
<a href="#">
    <i class="icon ion-close-circled"></i>
</a>
</div>`;