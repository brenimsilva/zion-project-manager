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

    public function login($login, $password)
    {
        $user = $this->_usermodel->where("login", $login)->first();
        if($user === null)
        {
            return false;
        }
        if(!password_verify($password, $user->password))
        {
            return false;
        }

        $this->_session->regenerate();
        $this->_session->set("id", $user->id);
        return ["session" => $this->_session->get(), "user" => $user];
    }

    public function getSession() 
    {
        return ["session" => $this->_session->get()];
    }
}