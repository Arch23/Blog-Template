<?php
header('Content-Type: text/html; charset=utf-8');

define("PROJECT_ROOT", dirname(dirname(__FILE__)));
define("IMGS_FOLDER", PROJECT_ROOT."/app/images/");

define("DBHOST", "localhost");
define("DBUSER", "root");
define("DBPASS", "");
define("DBNAME", "BlogDev");

$db = new PDO("mysql:host=".DBHOST.";port=8889;dbname=".DBNAME, DBUSER, DBPASS, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

date_default_timezone_set('America/Sao_Paulo');
