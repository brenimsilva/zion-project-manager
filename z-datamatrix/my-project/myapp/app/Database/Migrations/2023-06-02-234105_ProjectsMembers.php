<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class ProjectsMembers extends Migration
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
                "project_id" => [
                    "type" => "INT",
                    "constraint" => 5
                ],
                "member_count" => [
                    "type" => "INT",
                    "unsigned" => true
                ],
                'plataform_id' => [
                    'type' => "ENUM('DISCORD', 'TWITTER')",
                    'default' => "DISCORD"
                ],
                "date_inserted" => [
                    "type" => "DATETIME"
                ]
            ]
        );

        $this->forge->addPrimaryKey("id");
        $this->forge->createTable("projects_members");
    }

    public function down()
    {
        $this->forge->dropTable('projects_members');
    }
}
