<?php

class User{
  private $nickname;
  private $privilege;

  /* Getters */
  public function getNickname(){
    return($this->nickname);
  }
  public function getPrivilege(){
    return($this->privilege);
  }

  /* Setters */
  public function setNickname($nickname){
    $this->nickname = $nickname;
  }
  public function setPrivilege($privilege){
    $this->privilege = $privilege;
  }
}