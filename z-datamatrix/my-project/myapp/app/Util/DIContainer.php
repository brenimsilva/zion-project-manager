<?php

namespace App\Util;

use App\Models\ProfileModel;
use App\Models\UserModel;
use App\Services\ProfileService;
use App\Services\UserService;

class DIContainer
{
    private UserModel $userModel;
    private UserService $userService;
    private ProfileService $profileService;
    private ProfileModel $profileModel;
    public function __construct()
    {
    }

    private function _getUserModel(): UserModel 
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
        $this->userService = new UserService($this->_getUserModel());
        return $this->userService;
    }

    private function _getProfileModel(): ProfileModel
    {
        if(isset($this->profileModel))
        {
            return $this->profileModel;
        }
        $this->profileModel = new ProfileModel();
        return $this->profileModel;
    }

    public function getProfileService(): ProfileService
    {
        if(isset($this->profileService)) {
            return $this->profileService;
        }
        $this->profileService = new ProfileService($this->_getProfileModel());
        return $this->profileService;
    }
}