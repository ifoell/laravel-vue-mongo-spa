<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model;

class Post extends Model
{
    protected $dates = [ 'created_at' ];
    protected $fillable = ['title', 'content'];

    public function author() {
        return $this->belongsTo('App\User');
    }

    public function comments() {
        return $this->embedsMany('App\Comment');
    }
}
