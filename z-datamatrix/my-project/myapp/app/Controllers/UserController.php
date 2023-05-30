<?php

namespace App\Controllers;

use App\Entities\User;
use CodeIgniter\RESTful\ResourceController;
use Exception;
use App\Services\UserService;
use App\Util\DIContainer;

class UserController extends ResourceController
{

    private $_DIContainer;
    private UserService $_userService;
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
        $this->_DIContainer = new DIContainer();
        $this->_userService = $this->_DIContainer->getUserService();
    }

    public function getAll() 
    {
        $retorno = $this->_userService->getAll();
        return $this->response->setJSON($retorno);
    }

    public function getById($id)
    {
        $retorno = $this->_userService->getById($id);
        return $this->response->setJSON($retorno);
    }

    public function add()
    {
        try {
            $data = $this->request->getJSON();
            $user = new User();
            foreach ($data as $key => $value) {
                $user->{$key} = $value;
            }
            $retorno = $this->_userService->add($user);
            $errors = isset($retorno['error']);

            $response = $errors ? [
                "message" => "User not inserted, check errors", 
                "data" => null,
                "error" => $retorno['error']
            ] : [
                "message" => "User inserted successfully",
                "data" => $user,
                "error" => null

            ];
            return $this->response->setJSON($response);

        }
        catch(Exception $ex) {
            return ["message" => "Error"];
        }
    }
}
