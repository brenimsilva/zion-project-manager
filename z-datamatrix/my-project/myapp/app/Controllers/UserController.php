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
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        header("Access-Control-Expose-Headers: Content-Length, X-JSON, FormData");
        header("Access-Control-Max-Age: 86400");
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
                "errors" => $retorno['error']
            ] : [
                "message" => "User inserted successfully",
                "data" => $user,
                "errors" => null

            ];
            return $this->response->setJSON($response);

        }
        catch(Exception $ex) {
            return ["message" => "Error"];
        }
    }

    // public function insertUser() 
    // {
    //     $data = $this->request->getJSON();
    //     $result = $this->__checkUserExists($data->user_id);
    //     if(count($result) > 0) {
    //         return $this->response->setJSON(["message" => "user already inserted into db"]);
    //     }
    //     $this->__insertQuery("INSERT INTO discord_user(user_id, username) VALUES('{$data->user_id}', '{$data->username}')");
    //     return $this->response->setJSON(["message" => "User {$data->username} inserted successfuly!"]);
    // }
}
