
<?php 

namespace App\Controllers;

use CodeIgniter\Config\Services;
use CodeIgniter\Database\MigrationRunner;
use CodeIgniter\RESTful\ResourceController;
use Exception;

class DBController extends ResourceController {
    
    private MigrationRunner $_migrate;

    public function __construct()
    {
        $this->_migrate = Services::migrations();
    }

    public function migrate() {
            try {
                $this->_migrate->regress();
                $this->_migrate->latest();
                return $this->response->setJSON(["message" => "DB-Migrate Completed"]);
            }
            catch (Exception $ex) {
                return $this->response->setJSON(["message" => "Fail to execute migration -> line 27 [DBController]"]);
            }
        }
}