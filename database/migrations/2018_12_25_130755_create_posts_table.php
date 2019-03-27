<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) { 
            $table->increments('id');
            $table->string('author');
            $table->string('title');
            $table->text('content');
            $table->string('tags');
            $table->string('thumbnail')->nullable();
            $table->integer('views')->default(0);
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('post_status_id');
            $table->timestamps(); 

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('post_status_id')->references('id')->on('post_statuses');

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
        Schema::dropIfExists('posts');
    }
}
