<?php
namespace App\Http\Resources;
use App\User;
use App\Investigation;
use Illuminate\Http\Resources\Json\JsonResource;
class InvestigationResource extends JsonResource
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
            'tags' => $this->tags,
            'thumbnail' => $this->thumbnail,
            'views' => $this->views,
            'user' => User::findOrFail($this->user_id),
            'posts' => Investigation::findOrFail($this->id)->posts,
            'created_at' => ($this->created_at == NULL) ? $this->created_at : date('d M Y - H:i:s', $this->created_at->timestamp),
            'updated_at' => ($this->updated_at == NULL) ? $this->updated_at : date('d M Y - H:i:s', $this->updated_at->timestamp)
        ];
    }
}
