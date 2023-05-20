<?php

namespace App\Controllers;

use App\Models\UserModel;
use App\Services\UserService;
use App\Util\DIContainer;
use CodeIgniter\RESTful\ResourceController;
use Exception;

class AuthController extends ResourceController {
    
    private DIContainer $_container;
    private UserModel $_usermodel;
    public function __construct()
    {
        $this->_container = new DIContainer();
        $this->_usermodel = $this->_container->getUserModel();
    }

    public function auth()
    {
        try {
            $login = $this->request->getJSON()->login;
            $password = $this->request->getJSON()->password;
            $user = $this->_usermodel->where("login", $login)->first();

            if($user === null)
            {
                return $this->response->setJSON(["message" => "User not found"]);
            }
            if(password_verify($password, $user->password)) {
                return $this->response->setJSON(["message" => "Login success", "user" => $user]);
            } else {
                return $this->response->setJSON(["error" => "Incorrect user or password"]);
            }
        }
        catch(Exception $ex) {
            $this->response->setStatusCode(500);
            return $this->response->setJSON(["error" => "Some props not found"]);
        }
    }
}