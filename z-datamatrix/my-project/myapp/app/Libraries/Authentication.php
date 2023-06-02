<?php
namespace App\Libraries;

use App\Models\UserModel;
use App\Util\DIContainer;
use CodeIgniter\Session\Session;

class Authentication
{

    private DIContainer $_container;
    private UserModel $_usermodel;
    private Session $_session;
    public function __construct()
    {
        $this->_container = new DIContainer();
        $this->_usermodel = $this->_container->getUserModel();
        $this->_session = session();
    }

    public function login($login, $password, $token = null)
    {
        $userData = $this->_usermodel->where("login", $login)->first();
        if($userData === null)
        {
            return false;
        }
        if(!password_verify($password, $userData->password))
        {
            return false;
        }

        $user = [
            "id" => $userData->id,
            "login" => $userData->login,
            "name" => $userData->name,
            "email" => $userData->email
        ];
        return $user;
    }
}