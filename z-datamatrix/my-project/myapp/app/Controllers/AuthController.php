<?php

namespace App\Controllers;

use App\Libraries\Authentication;
use App\Models\UserModel;
use App\Util\DIContainer;
use CodeIgniter\RESTful\ResourceController;
use Exception;
use JWT;

class AuthController extends ResourceController {
    
    private DIContainer $_container;
    private UserModel $_usermodel;
    private $_auth;
    public function __construct()
    {
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: *");
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, x_requested_with");
        header("Access-Control-Allow-Credentials: true");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        header("Access-Control-Expose-Headers: Content-Length, X-JSON, FormData");
        header("Access-Control-Max-Age: 86400");
        if ( "OPTIONS" === $_SERVER['REQUEST_METHOD'] ) {
            die();
        }
        $this->_container = new DIContainer();
        $this->_usermodel = $this->_container->getUserModel();
        $this->_auth = new Authentication();
    }

    public function auth()
    {
        try {
            $login = $this->request->getJSON()->login;
            $password = $this->request->getJSON()->password;

            $result = $this->_auth->login($login, $password)['user'];
            $data = $this->_jwt_encode($result);
            if($result) {
                return $this->response->setJSON(["message" => "Login success", "data" => $data]);
            };
            return $this->response->setJSON(["message" => "Wrong password"]);
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

    public function decodeToken() {
        
        $token = $this->request->getJSON("data")["data"];
        $jwt = new JWT();
        $jwtSecretKey = "matrix";
        $decoded_token = $jwt->decode($token, $jwtSecretKey, "HS256");
        return $this->response->setJSON(["data"=> $decoded_token]);

    }

    private function _jwt_encode($data) {
        $jwt = new JWT();
        $jwtSecretKey = "matrix";
        $token = $jwt->encode($data, $jwtSecretKey, "HS256");
        return $token;
    }
}