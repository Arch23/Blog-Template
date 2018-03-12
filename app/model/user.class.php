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

  public function getUserData($db){
    $stmt = $db->prepare("SELECT * FROM `User` WHERE `name`=:name AND `nickname`=:nick");
    $stmt->bindParam(":name",$this->name);
    $stmt->bindParam(":nick",$this->nickname);
    $stmt->execute();
    $res = $stmt->fetch(PDO::FETCH_ASSOC);
    return(json_encode($res));
  }

  public function getAllUsers($db){
    $stmt = $db->prepare("SELECT `name`, `nickname` FROM `User` ");
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return(json_encode($res));
  }

  public function deleteUser($db){
    $stmt = $db->prepare("DELETE FROM `User` WHERE `name`=:name AND `nickname`=:nick");
    $stmt->bindParam(":name",$this->name);
    $stmt->bindParam(":nick",$this->nickname);
    return($stmt->execute());
  }

  public function updateUser($db,$oldName,$oldNick){
    $stmt = $db->prepare("UPDATE `User` SET `name`=:name,`nickname`=:nick,`password`=:password,`privilege`=:privilege WHERE `name`=:oldName AND `nickname`=:oldNick");
    $stmt->bindParam(":oldName",$oldName);
    $stmt->bindParam(":oldNick",$oldNick);
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