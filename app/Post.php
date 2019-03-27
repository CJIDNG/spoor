<?php

namespace App;

use App\PostStatus;
use App\Investigation;
use Illuminate\Database\Eloquent\Model;

class Post extends Model {

    public function postStatus() {
        return $this->belongsTo(PostStatus::class);
    }

    public function investigations() {
        return $this->belongsToMany(Investigation::class);
    }
}
