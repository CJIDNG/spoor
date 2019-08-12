<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\IncidentType;

class Incident extends Model
{
    /**
     * Eloquent Relationships
     */
    public function incidentType() {
        return $this->belongsTo(IncidentType::class);
    }

    public function location() {
        return $this->morphTo();
    }
}
