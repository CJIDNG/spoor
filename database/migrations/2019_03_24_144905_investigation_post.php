<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class InvestigationPost extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('investigation_post', function(Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('investigation_id');
            $table->unsignedInteger('post_id');
            $table->timestamps();
            
            $table->foreign('investigation_id')->references('id')->on('investigations');
            $table->foreign('post_id')->references('id')->on('posts');
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
        //
    }
}
