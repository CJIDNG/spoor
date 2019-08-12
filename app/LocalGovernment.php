<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Incident;
use App\State;

class LocalGovernment extends Model
{
    /**
     * Eloquent Relationships
     */
    public function state() {
        return $this->belongsTo(State::class);
    }

    public function incidents() {
        return $this->morphMany(Incident::class, 'location');
    }
}
