<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Profiles extends Migration
{
    public function up()
    {
        
        $this->forge->addField([
            'id' => [
                'type'           => 'INT',
                'constraint'     => 5,
                'auto_increment' => true
            ],
            'id_user' => [
                'type' => 'INT',
                'constraint' => 5
            ],
            "username" => [
                'type'       => 'VARCHAR',
                'constraint' => '100',
            ],
            'discord_username' => [
                'type'       => 'VARCHAR',
                'constraint' => '100',
                'null' => true
            ],
            'discord_id' => [
                'type' => 'VARCHAR',
                'constraint' => '100',
                'null' => true
            ],
            'discord_email' => [
                'type' => 'VARCHAR',
                'constraint' => '120',
                'null' => true
            ],
            'discord_api_token' => [
                'type' => 'VARCHAR',
                'constraint' => '120',
                'null' => true
            ],
            'discord_avatar' => [
                'type' => 'VARCHAR',
                'constraint' => '120',
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
        $this->forge->createTable('profiles');
    }

    public function down()
    {
        $this->forge->dropTable('profiles');
    }
}
