<?php
namespace App\Http\Resources;
use Illuminate\Http\Resources\Json\JsonResource;
class MemberResource extends JsonResource
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
            'full_name' => $this->full_name,
            'country' => $this->country,
            'designation' => $this->designation,
            'bio' => $this->bio,
            'thumbnail' => $this->thumbnail,
            'created_at' => ($this->created_at == NULL) ? $this->created_at : date('d M Y - H:i:s', $this->created_at->timestamp),
            'updated_at' => ($this->updated_at == NULL) ? $this->updated_at : date('d M Y - H:i:s', $this->updated_at->timestamp)
        ];
    }
}
