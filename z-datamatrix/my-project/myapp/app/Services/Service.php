<?php

namespace App\Services;

use CodeIgniter\RESTful\ResourceController;
use Exception;

class Service
{
    public function query($sql) {
        $db = db_connect();
        $response = $db->query($sql)->getResultObject();
        $db->close();
        return $response;
    }

    public function insertQuery($sql) {
        try {
            $db = db_connect();
            $response = $db->query($sql);
            $db->close();
        }
        catch (Exception $ex) {
            return $ex;
        }
    }

}