<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class DiscordServer extends Migration
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
                "discord_id" => [
                    "type" => "VARCHAR",
                    "constraint" => "100",
                    "unique" => true
                ],
                "name" => [
                    "type" => "VARCHAR",
                    "constraint" => "100"
                ],
                "members_count" => [
                    "type" => "INT",
                    "unsigned" => true
                ],
                "date_created" => [
                    "type" => "DATETIME",
                    "null" => true,
                    "default" => null
                ],
                "boost_count" => [
                    "type" => "INT",
                    "null" => true,
                    "default" => null
                ],
                "owner" => [
                    "type" => "VARCHAR",
                    "constraint" => "100",
                    "null" => true,
                    "default" => null
                ],
                "guild_icon" => [
                    "type" => "VARCHAR",
                    "constraint" => "100",
                    "null" => true,
                    "default" => null
                ]
            ]
        );

        $this->forge->addPrimaryKey("id");
        $this->forge->createTable("discord_server");
    }

    public function down()
    {
        $this->forge->dropTable('discord_server');
    }
}
