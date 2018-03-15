<?php
header('Content-Type: text/html; charset=utf-8');

define("PROJECT_ROOT", dirname(dirname(__FILE__)));
define("IMGS_FOLDER", PROJECT_ROOT."/app/images/");
define("SERVER", "http://".$_SERVER['SERVER_NAME'] . dirname($_SERVER['PHP_SELF']));
// Imgs controller
define("IMAGE_MAX_SIZE", 2048);
define("IMAGE_EXT_WHITE_LIST", ["jpeg", "jpg", "gif", "png", "bmp", "svg"]);
define("IMAGE_TYPE_WHITE_LIST", ["image/jpeg", "image/jpg", "image/gif", "image/png", "image/bmp", "image/svg"]);


define("DBHOST", "localhost");
define("DBUSER", "root");
define("DBPASS", "");
define("DBNAME", "BlogDev");

$db = new PDO("mysql:host=".DBHOST.";port=8889;dbname=".DBNAME, DBUSER, DBPASS, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

date_default_timezone_set('America/Sao_Paulo');
