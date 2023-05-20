<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $DBGroup          = 'default';
    protected $table            = 'users';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = \App\Entities\User::class;
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = [
        'id', 'login', 'name', 'password', 'email', 'date_inserted', 'date_updated'
    ];

    // Dates
    protected $useTimestamps = true;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'date_inserted';
    protected $updatedField  = 'date_updated';
    protected $deletedField  = 'deleted_at';

    // Validation
    protected $validationRules      = [
        "login" => "required|is_unique[users.login]",
        "name" => "required",
        "password" => "required",
        "email" => "required|valid_email|is_unique[users.email]"
    ];
    protected $validationMessages   = [
        'email' => [
            'is_unique' => 'Sorry. That email has already been taken. Please choose another.'
        ],
        'login' => [
            'is_unique' => 'Sorry. That login has already been taken. Please choose another.'
        ]
    ];
    protected $skipValidation       = false;
    protected $cleanValidationRules = true;

    // Callbacks
    protected $allowCallbacks = true;
    protected $beforeInsert   = [];
    protected $afterInsert    = [];
    protected $beforeUpdate   = [];
    protected $afterUpdate    = [];
    protected $beforeFind     = [];
    protected $afterFind      = [];
    protected $beforeDelete   = [];
    protected $afterDelete    = [];
}
