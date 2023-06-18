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

    private function _getByDiscordId($discord_id)
    {
        return $this->model->where("discord_id", $discord_id)->first();
    }

    public function saveProfile($profile) 
    {
        if (!empty($this->_getByDiscordId($profile->discord_id)))
        {
            $this->updateProfile($profile);
        }
    }

    public function add($profile)
    {
        $insert = $this->model->insert($profile);
        if(!$insert) {
            return ["error" => $this->model->errors()];
        }
        return ["data" => $profile];
    }

    public function updateProfile($id, $newProfile)
    {
        $update = $this->model->update($id, $newProfile);
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