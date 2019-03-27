<?php
namespace App\Http\Resources;
use Illuminate\Http\Resources\Json\JsonResource;
use App\User;
use App\Post;
use App\PostStatus;
class PostResource extends JsonResource
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
            'author' => $this->author,
            'title' => $this->title,
            'content' => $this->content,
            'description' => strip_tags(substr($this->content, 0, 500)),
            'tags' => $this->tags,
            'thumbnail' => $this->thumbnail,
            'views' => $this->views,
            'user' => User::findOrFail($this->user_id),
            'investigations' => Post::findOrFail($this->id)->investigations,
            'status' => PostStatus::findOrFail($this->post_status_id),
            'created_at' => ($this->created_at == NULL) ? $this->created_at : date('d M Y - H:i:s', $this->created_at->timestamp),
            'updated_at' => ($this->updated_at == NULL) ? $this->updated_at : date('d M Y - H:i:s', $this->updated_at->timestamp)
        ];
    }
}