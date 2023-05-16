<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class ProfileDiscord extends Migration
{
    public function up()
    {
        $this->forge->addField(
            [
                "id" => [
                    "type" => "INT",
                    "constraint" => 5,
                    "auto_increment" => true
                ],
                "id_profile" => [
                    "type" => "INT",
                    "constraint" => 5,
                ],
                "id_discord_server" => [
                    "type" => "INT",
                    "constraint" => 5,
                ],
                "joined_at" => [
                    "type" => "DATETIME",
                    "null" => true,
                    "default" => null
                ]
            ]
        );

        $this->forge->addPrimaryKey("id");
        $this->forge->createTable("profile_discord");
    }

    public function down()
    {
        $this->forge->dropDatabase('profile_discord');
    }
}
