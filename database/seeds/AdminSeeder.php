<?php

use App\User;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User();
        $user->name = 'Admin';
        $user->email = 'admin@ptcij.org';
        $user->password = bcrypt('admin');
        $user->save();

        $user->roles()->attach(1);
    }
}
