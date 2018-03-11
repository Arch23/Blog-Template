<?php

class Post {
  private $date;
  private $title;
  private $mainImg;
  private $text;
  private $user;

  /* Main Functions */
  public function getAllPosts($db){
    $stmt = $db->prepare("SELECT * FROM `Post`");

    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);  // PDO::FETCH_ASSOC "destroy" the first return "num => content"
    return($data);
  }

  /* Getters */
  public function getDate(){
    return($this->date);
  }
  public function getTitle(){
    return($this->title);
  }
  public function getMainImg(){
    return($this->mainImg);
  }
  public function getText(){
    return($this->text);
  }
  public function getUser(){
    return($this->user);
  }

  /* Setters */
  public function setDate($date){
    $this->date = $date;
  }
  public function setTitle($title){
    $this->title = $title;
  }
  public function setMainImg($mainImg){
    $this->mainImg = $mainImg;
  }
  public function setText($text){
    $this->text = $text;
  }
  public function setUser($user){
    $this->user = $user;
  }
}