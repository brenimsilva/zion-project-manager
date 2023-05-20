<?php

namespace App\Controllers;

use App\Libraries\Authentication;
use App\Models\UserModel;
use App\Services\UserService;
use App\Util\DIContainer;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\Session\Session;
use Exception;

class AuthController extends ResourceController {
    
    private DIContainer $_container;
    private UserModel $_usermodel;
    private $_auth;
    public function __construct()
    {
        $this->_container = new DIContainer();
        $this->_usermodel = $this->_container->getUserModel();
        $this->_auth = new Authentication();
    }

    public function auth()
    {
        try {
            $login = $this->request->getJSON()->login;
            $password = $this->request->getJSON()->password;

            $result = $this->_auth->login($login, $password);
            if($result) {
                return $this->response->setJSON(["message" => "Login success", "session" => $result['session'], "user" => $result['user']]);
            };
        }
        catch(Exception $ex) {
            $this->response->setStatusCode(500);
            return $this->response->setJSON(["error" => "Some props not found"]);
        }
    }

    public function logoff() {
        $this->_session->destroy();
        return $this->response->setJSON(["message" => "User loged out"]);
    }

    public function teste() {
        return $this->response->setJSON($this->_auth->getSession());
    }
}