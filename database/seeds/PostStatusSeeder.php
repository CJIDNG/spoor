<?php

use App\PostStatus;
use Illuminate\Database\Seeder;

class PostStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $postStatus = new PostStatus();
        $postStatus->name = "Draft";
        $postStatus->save();

        $postStatus = new PostStatus();
        $postStatus->name = "Submitted";
        $postStatus->save();

        $postStatus = new PostStatus();
        $postStatus->name = "Approved";
        $postStatus->save();
    }
}
