<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model;

class Post extends Model
{
    protected $dates = [ 'created_at' ];
    protected $fillable = ['title', 'content'];
    protected $appends = ['image_url'];
    protected $visible = ['_id', 'title', 'content', 'created_at', 'author', 'image_url'];

    public function author()
    {
        return $this->belongsTo('App\User');
    }

    public function getImageUrlAttribute() : string
    {
        return "https://picsum.photos/400/300/?$this->_id";
    }
}
