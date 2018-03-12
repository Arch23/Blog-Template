<?php
require_once "../config.php";
require_once "../model/user.class.php";

$user = new User;
$user->setNickname($_POST["nick"]);
$res = $user->login($db);
$obj = new stdClass;
$obj->name = $res["name"];
$obj->privilege = $res["privilege"];
$obj->nick = $res["nickname"];
$obj->auth = "";
if(empty($res)){
    $obj->auth = "not_found";
}else if(password_verify($_POST["password"],$res["password"])){
    $obj->auth = "ok";
}else{
    $obj->auth = "wrong";
}
echo(json_encode($obj));
?>