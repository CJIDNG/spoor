<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class IncidentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        //return parent::toArray($request);
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'death_count' => $this->death_count,
            'injured_count' => $this->injured_count,
            'incidentType' => $this->incidentType,
            'location' => $this->location,
            'incident_date' => $this->incident_date,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
