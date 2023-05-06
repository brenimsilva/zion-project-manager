<?php

namespace App\Services;

use App\Entities\User;
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

    public function update(User $user) {
        try 
        {
            $id = $user->getId();
            $prev = clone $this->model->find($id);

            $this->model->update($id, $user);

            $users = ["previous" => $prev, "updated" => $user];
            return ["message" => "User updated Successful!", "data" => $users];
        }

        catch (Exception $ex) 
        {
            return ["message" => "ERROR trying to update user {$user->getId()}"];
        }
    }
    

    public function insert(User $user) 
    {
        $userExists = count($this->model->where("username", $user->getDiscordId())->findAll()) > 0;
        if($userExists) 
        {
            return ["message" => "User with discord ID => {$user->getDiscordId()} already exists"];
        }
        $this->model->insert($user);
        return true;
    }
}