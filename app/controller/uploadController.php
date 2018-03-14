<?php

require_once "../config.php";

$totalImgs = new FilesystemIterator(IMGS_FOLDER, FilesystemIterator::SKIP_DOTS);

$numDel = $_COOKIE["numPosts"]+1;


if(isset($_POST["controlTag"])){
    if($_POST["controlTag"]=="deleteOlder"){
        foreach($totalImgs as $key => $value){
            if(strpos($value, "post-".$numDel."")){
                unlink($value);
            }
        }
    }
}else{
    $numImgs = iterator_count($totalImgs);
    $allowed = false;

    if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
        $file = array_shift($_FILES);
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $fileContents = file_get_contents($file["tmp_name"]);
        $mime = $finfo->buffer($fileContents);
        $ext = pathinfo($file["name"])["extension"];

        if(in_array($mime, IMAGE_TYPE_WHITE_LIST)){
            if(in_array($ext, IMAGE_EXT_WHITE_LIST)){
                $allowed = true;
            }
        }
        if($allowed){
            if(filesize($file["tmp_name"]) >= IMAGE_MAX_SIZE){
                if(move_uploaded_file($file['tmp_name'], IMGS_FOLDER . "post-".$numDel."-image-".$numImgs.".".$ext)){
                    $url = SERVER;
                    $url = str_replace("controller", "images/", $url);
                    $fileName = "post-".$numDel."-image-".$numImgs.".".$ext;
                    $url = $url.$fileName;
                    $data = [
                        "message" => "uploadSuccess",
                        "file" => $url
                    ];
                }else{
                    $data = [
                        "message" => "uploadFailed"
                    ];
                }
            }else{
                $data = [
                    "message" => "ImageSizeNotAllowed"
                ];
            }
        }else{
            $data = [
                "message" => "ImageTypeNotAllowed"
            ];
        }
    } 
    echo json_encode($data);
}


/* // Detect if it is an AJAX request
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
} */