<?php

namespace App\Util;
use App\Models\UserModel;
use App\Services\UserService;

class DIContainer
{
    private $userModel;
    private $userService;

    public function getUserModel(): UserModel 
    {
        if(isset($this->userModel)) {
            return $this->userModel;
        }
        $this->userModel = new UserModel();
        return $this->userModel;
    }

    public function getUserService(): UserService
    {
        if(isset($this->userService)) {
            return $this->userService;
        }
        $this->userService = new UserService($this->getUserModel());
        return $this->userService;
    }
}