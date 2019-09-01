<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIncidentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('incidents', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->text('description');
            $table->bigInteger('death_count')->nullable();
            $table->bigInteger('injured_count')->nullable();
            $table->string('victim')->nullable();
            $table->string('affiliation')->nullable;
            $table->string('assailant')->nullable();
            $table->unsignedInteger('incident_type_id');
            $table->unsignedInteger('location_id')->nullable();
            $table->string('location_type');
            $table->date('incident_date');
            $table->timestamps();

            $table->engine = 'InnoDB';
            $table->charset = 'utf8';
            $table->collation = 'utf8_bin';
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('incidents');
    }
}
