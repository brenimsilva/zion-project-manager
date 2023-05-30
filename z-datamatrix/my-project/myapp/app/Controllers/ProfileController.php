<?php
namespace App\Controllers;

use App\Classes\ProfileDTO;
use App\Models\ProfileModel;
use App\Services\ProfileService;
use App\Util\DIContainer;
use CodeIgniter\RESTful\ResourceController;

class ProfileController extends ResourceController {
    private $_DIContainer;
    private ProfileService $_service;
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
        $this->_service = $this->_DIContainer->getProfileService();
    }

    public function getById($id)
    {
        $response = $this->_service->getById($id);
        return $this->response->setJSON($response);
    }

    public function updateProfile() 
    {
        $newUser = $this->request->getJSON();
        return ["message" => $newUser];
        $response = $this->_service->updateProfile($newUser);
        return $this->response->setJSON($response);
    }

    public function add()
    {
        $newUser = $this->request->getJSON();
        $response = $this->_service->add($newUser);
        return $this->response->setJSON(["data" => $response, "message" => "Profile added successfully!"]);
    }

    
}