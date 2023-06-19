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
        $existingProfile = $this->_getByDiscordId($profile->discord_id);
        if (!empty($existingProfile))
        {
            return $this->updateProfile($existingProfile);
        }
        return $this->add($profile);
    }

    public function add($profile)
    {
        $insert = $this->model->insert($profile);
        if(!$insert) {
            return ["error" => $this->model->errors()];
        }
        return ["data" => $profile];
    }

    public function updateProfile($newProfile)
    {
        $update = $this->model->update($newProfile->id, $newProfile);
        if($update){
            return ["data" => $newProfile];
        }
        return ['errors' => "Nao fez update"];
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