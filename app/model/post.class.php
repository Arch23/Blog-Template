<?php

class Post {
  private $date;
  private $title;
  private $imgUrl;
  private $imgAlt="";
  private $text;
  private $userName;
  private $userNick;

  /* Main Functions */
  public function getAllPosts($db){
    $stmt = $db->prepare("SELECT * FROM `Post` ORDER BY `Date` DESC");

    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);  // PDO::FETCH_ASSOC "destroy" the first return "num => content"
    return($data);
  }

  public function getNumberPosts($db){
    return(count($this->getAllPosts($db)));
  }

  public function getPost($db, $title, $author, $date){
    $stmt = $db->prepare("SELECT * FROM `Post` WHERE title = :title AND User_name = :author AND date = :date");
    $stmt->bindParam(":title", $title, PDO::PARAM_STR);
    $stmt->bindParam(":author", $author, PDO::PARAM_STR);
    $stmt->bindParam(":date", $date);

    $stmt->execute();
    $data = $stmt->fetch(PDO::FETCH_ASSOC);

    return($data);
  }

  public function saveNewPost($db) {
    $stmt = $db->prepare("INSERT INTO `Post` (`title`, `date`, `text`, `img_url`, `img_alt`, `User_nickname`, `User_name`) VALUES (:title, :date, :text, :imgUrl, :imgAlt, :nickname, :name)");

    $stmt->bindParam(":title", $this->title);
    $stmt->bindParam(":date", $this->date);
    $stmt->bindParam(":text", $this->text);
    $stmt->bindParam(":imgUrl", $this->imgUrl);
    $stmt->bindParam(":imgAlt", $this->imgAlt);
    $stmt->bindParam(":nickname", $this->userNick);
    $stmt->bindParam(":name", $this->userName);

    return($stmt->execute());
  }

  public function getUserPost($db) {
    $stmt = $db->prepare("SELECT `title`, `date` FROM `Post` WHERE `User_nickname` = :nickname AND `User_name` = :name ORDER BY `Date` DESC");

    $stmt->bindParam(":nickname", $this->userNick);
    $stmt->bindParam(":name", $this->userName);

    $stmt->execute();
    $data = $stmt->fetch(PDO::FETCH_ASSOC);

    return($data);
  }

  public function deletePost($db){
    $stmt = $db->prepare("DELETE FROM `Post` WHERE `User_nickname` = :nickname AND 
    `User_name` = :name AND `title` = :title AND `date` = :date");

    $stmt->bindParam(":nickname", $this->userNick);
    $stmt->bindParam(":name", $this->userName);    
    $stmt->bindParam(":title", $this->title);    
    $stmt->bindParam(":date", $this->date);

    return($stmt->execute());
  }

  /* Getters */
  public function getDate(){
    return($this->date);
  }
  public function getTitle(){
    return($this->title);
  }
  public function getImgUrl(){
    return($this->imgUrl);
  }
  public function getImgAlt(){
    return($this->imgAlt);
  }
  public function getText(){
    return($this->text);
  }
  public function getUserName(){
    return($this->userName);
  }
  public function getUserNick(){
    return($this->userNick);
  }

  /* Setters */
  public function setDate($date){
    $this->date = $date;
  }
  public function setTitle($title){
    $this->title = $title;
  }
  public function setImgUrl($imgUrl){
    $this->imgUrl = $imgUrl;
  }
  public function setImgAlt($imgAlt){
    $this->imgAlt = $imgAlt;
  }
  public function setText($text){
    $this->text = $text;
  }
  public function setUserName($userName){
    $this->userName = $userName;
  }
  public function setUserNick($userNick){
    $this->userNick = $userNick;
  }
}