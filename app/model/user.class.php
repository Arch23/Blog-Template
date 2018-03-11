<?php

class User{
  private $nickname;
  private $name;
  private $password;
  private $privilege;

  public function checkDuplicatedNick($db){
    $stmt = $db->prepare("SELECT * FROM `User` WHERE `nickname`=:nick");
    $stmt->bindParam(":nick",$this->nickname);
    $stmt->execute();
    return($stmt->rowCount()!==0);    
  }

  public function createNewUser($db){
    $stmt = $db->prepare("INSERT INTO `User`(`name`, `nickname`, `password`, `privilege`) VALUES (:name,:nick,:password,:privilege)");
    $stmt->bindParam(":name",$this->name);
    $stmt->bindParam(":nick",$this->nickname);
    $stmt->bindParam(":password",$this->password);
    $stmt->bindParam(":privilege",$this->privilege);
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