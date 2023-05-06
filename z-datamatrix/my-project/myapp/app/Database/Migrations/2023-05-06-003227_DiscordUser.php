<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class DiscordUser extends Migration
{
    public function up()
    {
        
        $this->forge->addField([
            'id' => [
                'type'           => 'INT',
                'constraint'     => 5,
                'auto_increment' => true
            ],
            'username' => [
                'type'       => 'VARCHAR',
                'constraint' => '100'
            ],
            'discord_id' => [
                'type' => 'VARCHAR',
                'constraint' => '100'
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
        $this->forge->createTable('discord_user');
    }

    public function down()
    {
        $this->forge->dropTable('discord_user');
    }
}
