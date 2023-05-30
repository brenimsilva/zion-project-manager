<?php
namespace App\Services;

use App\Classes\ProfileDTO;
use App\Entities\Profile;
use App\Models\ProfileModel;

class ProfileService 
{
    private ProfileModel $model;
    
    public function __construct(ProfileModel $model)
    {
        $this->model = $model;
    }

    public function getAll() 
    {
        return $this->model->findAll();
    } 

    public function getById($id)
    {
        return $this->model->find($id);
    }

    public function add($profile)
    {
        $insert = $this->model->insert($profile);
        if(!$insert) {
            return ["error" => $this->model->errors()];
        }
        return ["data" => $profile];
    }

    public function updateProfile(Profile $newProfile)
    {
        $update = $this->model->update($newProfile->id, $newProfile);
        if($update){
            return $newProfile;
        }
        return false;
    }

    public function delete($id)
    {
        $deleted = $this->model->delete($id);
        if($deleted)
        {
            return $id;
        }
        return false;
    }
}