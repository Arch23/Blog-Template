<?php

require_once "../config.php";
require_once "../model/post.class.php";

switch($_POST['tag']){
  case 'loadIndex':
    $posts = new Post;
    echo json_encode($posts->getAllPosts($db));
  break;

  case 'loadPost':
    $post = new Post;

    echo json_encode($post->getPost($db, $_POST['title'], $_POST['author'], $_POST['date']));
  break;
}

?>