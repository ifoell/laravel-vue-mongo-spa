<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Post;

class PostTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testGetImageUrlAttribute()
    {
        $post = new Post();
        $post->_id = substr(md5(rand()),0,10);
        $this->assertEquals("https://picsum.photos/400/300/?$post->_id",$post->getImageUrlAttribute());
    }
}
