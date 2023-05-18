<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Users extends Migration
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
                "login" => [
                    "type" => "VARCHAR",
                    "constraint" => 60
                ],
                "name" => [
                    "type" => "VARCHAR",
                    "constraint" => 120
                ],
                "password" => [
                    "type" => "VARCHAR",
                    "constraint" => 120
                ],
                "email" => [
                    "type" => "VARCHAR",
                    "constraint" => 120
                ],
                "date_inserted" => [
                    "type" => "DATETIME",
                    "null" => true,
                    'default' => null
                ],
                "date_updated" => [
                    "type" => "DATETIME",
                    "null" => true,
                    'default' => null
                ]
            ]
        );

        $this->forge->addPrimaryKey("id");
        $this->forge->createTable("users");
    }

    public function down()
    {
        $this->forge->dropTable("users");
    }
}
