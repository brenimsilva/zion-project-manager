<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class DiscordServerHistory extends Migration
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
                "server_id" => [
                    "type" => "INT",
                    "constraint" => 5
                ],
                "member_count" => [
                    "type" => "INT",
                    "unsigned" => true
                ],
                "date_inserted" => [
                    "type" => "DATETIME"
                ]
            ]
        );

        $this->forge->addPrimaryKey("id");
        $this->forge->createTable("discord_server_history");
    }

    public function down()
    {
        $this->forge->dropTable("discord_server_history");
    }
}