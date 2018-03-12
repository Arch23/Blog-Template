<?php
require_once "../config.php";
require_once "../model/user.class.php";

$user = new User;
$user->setNickname($_POST["nick"]);
$res = $user->login($db);
if(empty($res)){
    echo("not_found");
    return;
}
if(password_verify($_POST["password"],$res["password"])){
    echo("ok");
}else{
    echo("wrong");
}
?>