<?php

require_once "../config.php";

$targetDir = IMGS_FOLDER;

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


/* 
define("UPLOADDIR", IMGS_FOLDER);
// Detect if it is an AJAX request
if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    $file = array_shift($_FILES);
    if(move_uploaded_file($file['tmp_name'], UPLOADDIR . basename($file['name']))) {
        $file = dirname($_SERVER['PHP_SELF']) . str_replace('./', '/', UPLOADDIR) . $file['name'];
        $data = array(
            'message' => 'uploadSuccess',
            'file'    => $file,
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
*/