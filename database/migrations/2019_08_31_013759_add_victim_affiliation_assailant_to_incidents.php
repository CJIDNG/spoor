<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddVictimAffiliationAssailantToIncidents extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('incidents', function (Blueprint $table) {
            $table->string('victim')->nullable()->after('injured_count');
            $table->string('affiliation')->nullable()->after('victim');
            $table->string('assailant')->nullable()->after('affiliation');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('incidents', function (Blueprint $table) {
            $table->dropColumn('victim');
            $table->dropColumn('affiliation');
            $table->dropColumn('assailant');
        });
    }
}
