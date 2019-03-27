<?php

use App\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role = new Role();
        $role->name = "Admin";
        $role->description = "admin";
        $role->save();

        $role = new Role();
        $role->name = "Super-admin";
        $role->description = "super";
        $role->save();

        $role = new Role();
        $role->name = "User";
        $role->description = "user";
        $role->save();
    }
}
