<?php

namespace App\Classes;

use App\Entities\Profile;

class ProfileDTO {
    protected int $id_user; 
    protected string $username;
    protected string $discord_username;
    protected string $discord_id;
    protected string $discord_email;
    protected string $discord_api_token;
    protected string $discord_avatar;

    public function __construct(
        // $id_user, $username, $discord_username, $discord_id, $discord_email, $discord_api_token, $discord_avatar
        )
    {
        // $this->id_user = $id_user;
        // $this->username = $username;
        // $this->discord_username = $discord_username;
        // $this->discord_id = $discord_id;
        // $this->discord_email = $discord_email;
        // $this->discord_api_token = $discord_api_token;
        // $this->discord_avatar = $discord_avatar;        
    }

    public function dtoToProfileEntity() {
        
    }
}