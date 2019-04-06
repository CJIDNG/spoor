<?php

use App\Config;
use Illuminate\Database\Seeder;

class ConfigTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $config = new Config();
        $config->site_name = "SpoorAfrica";
        $config->site_title = "SpoorAfrica";
        $config->site_description = "";
        $config->site_logo_url = "";
        $config->office_address = "";
        $config->email = "spoor@ptcij.org";
        $config->phone_number = "080 0 000 0000";
        $config->twitter_url = "";
        $config->facebook_url = "";
        $config->instagram_url = "";
        $config->linkedin_url = "";
        $config->save();
    }
}
