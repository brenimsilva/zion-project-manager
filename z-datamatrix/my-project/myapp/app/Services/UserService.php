<?php

namespace App\Services;
use Exception;
use App\Models\UserModel;

class UserService
{
    private UserModel $model;
    public function __construct(UserModel $model)
    {
        $this->model = $model;
    }
    
    public function getById($id)
    {
        return $this->model->find($id);
    }
    
    public function getAll()
    {
        return $this->model->findAll();
    }
    

    public function insert($user) 
    {
        $this->model->insert($user);
        return true;
    }
}