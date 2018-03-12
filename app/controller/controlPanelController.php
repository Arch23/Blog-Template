<?php
require_once "../config.php";
require_once "../model/user.class.php";

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
}

?>