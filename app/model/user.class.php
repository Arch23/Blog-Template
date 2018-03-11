<?php

class User{
  private $nickname;
  private $name;
  private $password;
  private $privilege;

  public function createNewUser(){
    $stmt = $db->prepare("INSERT INTO `User`(`name`, `nickname`, `password`, `privilege`) VALUES (:name,:nick,:password,:privilege)");
    $stmt->bindParam(":name",$name);
    $stmt->bindParam(":nick",$nickname);
    $stmt->bindParam(":password",$password);
    $stmt->bindParam(":privilege",$privilege);
    return($stmt->execute());
  }

  /* Getters */
  public function getNickname(){
    return($this->nickname);
  }
  public function getPrivilege(){
    return($this->privilege);
  }
  public function getName(){
    return($this->name);
  }
  public function getPassword(){
    return($this->password);
  }

  /* Setters */
  public function setNickname($nickname){
    $this->nickname = $nickname;
  }
  public function setPrivilege($privilege){
    $this->privilege = $privilege;
  }
  public function setName($name){
    $this->name = $name;
  }
  public function setPassword($password){
    $this->password = $password;
  }
}