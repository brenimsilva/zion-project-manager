<?php

namespace App\Controllers;

use App\Models\UserModel;
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
        header("Access-Control-Expose-Headers: Content-Length, X-JSON");
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

    public function insert()
    {
        $user = $this->request->getJSON();
        $retorno = $this->_userService->insert($user);
        return $this->response->setJSON(["message" => "User inserted successfully", "data" => $retorno]);
    }


    public function insertUser() 
    {
        $data = $this->request->getJSON();
        $result = $this->__checkUserExists($data->user_id);
        if(count($result) > 0) {
            return $this->response->setJSON(["message" => "user already inserted into db"]);
        }
        $this->__insertQuery("INSERT INTO discord_user(user_id, username) VALUES('{$data->user_id}', '{$data->username}')");
        return $this->response->setJSON(["message" => "User {$data->username} inserted successfuly!"]);
    }

    public function getUserIdByDiscordId() 
    {
        $data = $this->request->getJSON();
        $result = $this->__checkUserExists($data->user_id);
        if(count($result) > 0) {
            return $this->response->setJSON(["message" => "Success", "data" => $result]);
        }

        return $this->response->setJSON(["message" => "User does not exists"]);
        
    }

    private function __query($sql) {
        $db = db_connect();
        $response = $db->query($sql)->getResultObject();
        $db->close();
        return $response;
    }

    private function __insertQuery($sql) {
        try {
            $db = db_connect();
            $response = $db->query($sql);
            $db->close();
        }
        catch (Exception $ex) {
            return $ex;
        }
    }

    private function __checkUserExists($user_id) {
        $sql = "SELECT * FROM discord_user where user_id = '{$user_id}'";
        return $this->__query($sql);
    }
}
