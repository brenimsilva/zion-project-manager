<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class ProfileProjects extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type'           => 'INT',
                'constraint'     => 5,
                'auto_increment' => true
            ],
            'id_profile' => [
                'type' => 'INT',
                'constraint' => 5
            ],
            'id_project' => [
                'type' => 'VARCHAR',
                'constraint' => '100',
                'null' => true
            ],
            'date_inserted' => [
                'type' => 'DATETIME',
                'null' => true,
                'default' => null
            ],
            'last_updated' => [
                'type' => 'DATETIME',
                'null' => true,
                'default' => null
            ]
        ]);
        $this->forge->addPrimaryKey('id');
        $this->forge->createTable('profile_projects');
    }

    public function down()
    {
        $this->forge->dropTable('profile_projects');
    }
}
