<?php
namespace App;
use Illuminate\Database\Eloquent\Model;

use App\LocalGovernment;
use App\Incident;

class State extends Model {

    /**
     * Eloquent Relationships
     */
    public function localGovernments() {
        return $this->hasMany(LocalGovernment::class);
    }

    public function incidents() {
        return $this->morphMany(Incident::class, 'location');
    }
}