<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Projects extends Migration
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
            "project_name" => [
                'type'       => 'VARCHAR',
                'constraint' => '100',
            ],
            'discord_id' => [
                'type' => 'VARCHAR',
                'constraint' => '100',
                'null' => true
            ],
            'discord_avatar' => [
                'type' => 'VARCHAR',
                'constraint' => '120',
                'null' => true
            ],
            'discord_link' => [
                'type' => 'VARCHAR',
                'constraint' => '120',
                'null' => true,
                'default' => null
            ],
            'twitter_link' => [
                'type' => 'VARCHAR',
                'constraint' => '120',
                'null' => true,
                'default' => null
            ],
            'notes' => [
                'type' => 'VARCHAR',
                'constraint' => '500',
                'null' => true,
                'default' => null
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
        $this->forge->createTable('projects');
    }

    public function down()
    {
        $this->forge->dropTable("projects");
    }
}