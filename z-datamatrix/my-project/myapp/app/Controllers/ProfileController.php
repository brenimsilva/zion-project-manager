<?php
namespace App\Controllers;

use App\Models\ProfileModel;
use App\Util\DIContainer;
use CodeIgniter\RESTful\ResourceController;

class ProfileController extends ResourceController {
    private $_DIContainer;
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
    }

    public function getById($id)
    {
        $model = new ProfileModel();
        return $this->response->setJSON($model->find($id));
    }

    public function updateProfile() 
    {
        $model = new ProfileModel();
        $newUser = $this->request->getJSON();
        $model->update($newUser->id, $newUser);
        return $this->response->setJSON($newUser);

    }

    public function add()
    {
        $model = new ProfileModel();
        $newUser = $this->request->getJSON();
        if(isset($model->where("discord_id", $newUser->discord_id)->first())) {
            return $this->response->setJSON(["error" => true, "message" => "discord_id already in use"]);
        }
        $model->insert($newUser);
        return $this->response->setJSON($newUser);
    }
}