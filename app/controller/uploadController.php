<?php

require_once "../config.php";

/* $targetDir = IMGS_FOLDER;

$totalImgs = new FilesystemIterator($targetDir, FilesystemIterator::SKIP_DOTS);
$numImgs = iterator_count($totalImgs);

print_r($_FILES);

foreach($_FILES["file"] as $key=>$value){
  echo "$key => $value \n";
  if($key == "name"){
    $path_parts = pathinfo('test.png');
  }
}

move_uploaded_file($_FILES["file"]["tmp_name"], 
IMGS_FOLDER."/image-".$numImgs.".".$path_parts["extension"]);

 */
/* 
$file = dirname($_SERVER['PHP_SELF']) . str_replace('./', '/', UPLOADDIR) . $file['name'];
$file = str_replace("/trumfolder/plugins/upload/home/mysite/public_html", "", $file); 
*/
/**
 * Upload directory
 * 
 */

 
define("UPLOADDIR", IMGS_FOLDER);

$totalImgs = new FilesystemIterator(IMGS_FOLDER, FilesystemIterator::SKIP_DOTS);
$numImgs = iterator_count($totalImgs);
$server = "http://".$_SERVER['SERVER_NAME'] . dirname($_SERVER['PHP_SELF']);

// Detect if it is an AJAX request
if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    $file = array_shift($_FILES);
    //if(move_uploaded_file($file['tmp_name'], UPLOADDIR . basename($file['name']))) {
    if(move_uploaded_file($file['tmp_name'], UPLOADDIR . "image-".$numImgs.".jpeg")) {
        $file = dirname($_SERVER['PHP_SELF']) . str_replace('./', '/', UPLOADDIR) . "image-".$numImgs.".jpeg";
        $file = str_replace("/Blog-Template/app/controller", "", $file); 
        $fileName = str_replace(IMGS_FOLDER, "", $file);
        $server = str_replace("controller", "images/", $server);
        $url = $server."".$fileName;
        $data = array(
            'message' => 'uploadSuccess',
            'file'    => $url
        );
    } else {
        $error = true;
        $data = array(
            'message' => 'uploadError',
        );
    }
} else {
    $data = array(
        'message' => 'uploadNotAjax',
        'formData' => $_POST
    );
}
echo json_encode($data);