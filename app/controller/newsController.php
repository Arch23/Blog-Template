<?php

require_once "../config.php";
require_once "../model/post.class.php";

  $post = new Post;
  echo json_encode($post->getPost($db, $_POST['title'], $_POST['author'], $_POST['date']));