<?php
require_once "../config.php";
require_once "../model/user.class.php";

print_r($_POST);

switch($_POST["tag"]){
    case "createUser":
        $user = new User;
        $user->setName($_POST["name"]);
        $user->setNickname($_POST["username"]);
        $user->setPassword($_POST["password"]);
        $user->setPrivilege($_POST["isAdmin"]);
        
        if($user->checkDuplicatedNick($db)){
            echo "duplicated";
            return;
        }

        echo($user->createNewUser($db));

        break;
}

?>