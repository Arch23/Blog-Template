<?php

require_once "../config.php";
require_once "../model/post.class.php";

$posts = new Post;

echo json_encode($posts->getAllPosts($db));

?>