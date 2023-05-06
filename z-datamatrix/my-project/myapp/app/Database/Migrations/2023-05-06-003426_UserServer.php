<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class UserServer extends Migration
{
    public function up()
    {

        $this->forge->addField(
            [
                "id" => [
                    "type" => "INT",
                    "auto_increment" => true,
                    "constraint" => 5
                ], 
                "id_server" => [
                    "type" => "INT",
                    "constraint" => 5
                ],
                "id_user" => [
                    "type" => "INT",
                    "constraint" => 5
                ],
                "joined_at" => [
                    "type" => "DATETIME",
                    "null" => true,
                    "default" => null
                ]
            ]
        );
        //GRANT REFERENCES ON `discord_server` TO 'zion'@'192.168.0.0';
        $this->forge->addPrimaryKey("id");
        // $this->forge->addForeignKey("id_server", "discord_server.id", "CASCADE", "CASCADE");
        // $this->forge->addForeignKey("id_user", "discord_user.id", "CASCADE", "CASCADE");
        $this->forge->createTable("user_server");
    }

    public function down()
    {
        $this->forge->dropTable('user_server');
    }
}
