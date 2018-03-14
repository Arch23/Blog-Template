<?php
require_once "../config.php";
require_once "../model/user.class.php";
require_once "../model/post.class.php";

switch($_POST["tag"]){
    case "createUser":
        $user = new User;
        $user->setName($_POST["name"]);
        $user->setNickname($_POST["username"]);
        $user->setPassword(password_hash($_POST["password"],PASSWORD_DEFAULT));
        $user->setPrivilege($_POST["isAdmin"]);
        
        if($user->checkDuplicatedNick($db)){
            echo "duplicated";
            return;
        }

        echo($user->createNewUser($db,$_POST["nick"])?"ok":"not_ok");
    break;

    case "getAllUsers":
        $user = new User;
        echo($user->getAllUsers($db,$_POST["nick"]));
    break;

    case "delete-user":
        $user = new User;
        $user->setName($_POST["name"]);
        $user->setNickname($_POST["nickname"]);
        echo($user->deleteUser($db)?"ok":"not_ok");
    break;

    case "update-user":
        $user = new User;
        $user->setName($_POST["name"]);
        $user->setNickname($_POST["nick"]);
        if($_POST["passChanged"]){
            $user->setPassword(password_hash($_POST["password"],PASSWORD_DEFAULT));
        }else{
            $user->setPassword($_POST["password"]);
        }
        $user->setPrivilege($_POST["isAdmin"]);
        echo($user->updateUser($db,$_POST["oldName"],$_POST["oldNick"])?"ok":"not_ok");
    break;

    case "get-user-data":
        $user = new User;
        $user->setName($_POST["name"]);
        $user->setNickname($_POST["nickname"]);
        echo($user->getUserData($db));
    break;

    case "postNumber":
        $post = new Post;
        echo($post->getNumberPosts($db));
    break;

    case "newPost":
        $post = new Post;
        $post->setDate(date("Y-m-d"));
        $post->setTitle($_POST["title"]);
        $post->setText($_POST["text"]);
        $post->setUserName($_POST["userName"]);
        $post->setUserNick($_POST["userNick"]);
        ob_start();
        include("uploadController.php");
        $dataImage = ob_get_contents();
        ob_end_clean();
        $dataImage = json_decode($dataImage);
        $post->setImgUrl($dataImage->file);
        echo($post->saveNewPost($db)?"saved":"not_saved");
    break;

    case "getUserPost":
        $post = new Post;
        $post->setUserName($_POST["userName"]);
        $post->setUserNick($_POST["userNick"]);
        echo json_encode($post->getUserPost($db));
    break;

    case "getAllPost":
        $post = new Post;
        echo json_encode($post->getAllPosts($db));
    break;

    case "deletePost":
        $post = new Post;
        $post->setTitle($_POST["title"]);
        $post->setDate($_POST["date"]);
        $post->setUserName($_POST["userName"]);
        $post->setUserNick($_POST["userNick"]);
        echo($post->deletePost($db)?"deleted":"not_deleted");
    break;
}

?>