<?php

session_start();

define("DBHOST", "localhost");
define("DBUSER", "root");
define("DBPASS", "123");
define("DBNAME", "blogDev");

$db = new PDO("mysql:host=".DBHOST.";port=8889;dbname=".DBNAME, DBUSER, DBPASS);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


date_default_timezone_set('America/Sao_Paulo');

function __autoload($class){

  $class = strtolower($class);

  $path = "model/classes/".$class.".class.php";

  if(file_exists($path)){
    require_once($path);
  }else{
    echo "Failed to load file. ".$path;
  }
}