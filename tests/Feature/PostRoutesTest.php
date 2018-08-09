<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PostRoutesTest extends TestCase
{
    public function tearDown(){
      \App\Post::truncate();
      \App\User::truncate();
      parent::tearDown();
    }
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testIndexRoute()
    {
        $response = $this->get('/api/post');
        $response->assertStatus(200);
    }

    public function testShowRoute()
    {
      $post = \App\Post::create();

      // unauthenticated
      $response = $this->get("/api/post/{$post->_id}");
      $response->assertStatus(500);

      // authenticated
      $this->actingAs(\App\User::create());
      $response = $this->get("/api/post/{$post->_id}");
      $this->assertEquals($post->toArray(), $response->decodeResponseJson());
      $response->assertStatus(200);

      // gone
      $post->delete();
      $response = $this->get("/api/post/{$post->_id}");
      $response->assertStatus(404);
    }

    public function testStore()
    {
      $postData = [
        'title' => 'foo',
        'content' => 'bar',
      ];
      // unauthenticated
      $response = $this->post('/api/post/',$postData);
      $response->assertStatus(500);

      // authenticated
      $user = \App\User::create();
      $this->actingAs($user);
      $response = $this->post('/api/post/',$postData);
      $response->assertStatus(201);
      $post = $response->decodeResponseJson();
      $this->assertTrue(array_key_exists('_id', $post));
      $this->assertTrue(array_key_exists('author', $post));
      $this->assertTrue(array_key_exists('created_at', $post));
      $this->assertEquals($user->_id, $post['author']['_id']);
    }

    public function testUpdate()
    {
      $user = \App\User::create();
      $post = factory(\App\Post::class, 1)->create()->first();
      $post->author()->associate($user);
      $post->save();

      $postData = [
        'title' => 'foo',
        'content' => 'bar',
        'author_id' => 'should-not-update-it',
        'created_at' => 'should-not-update-it',
        'extra-value' => 'should-not-save-it',
      ];
      // unauthenticated
      $response = $this->put("/api/post/{$post->_id}",$postData);
      $response->assertStatus(500);

      // authenticated
      $this->actingAs($user);
      $response = $this->put("/api/post/{$post->_id}",$postData);
      $response->assertStatus(200);
      $result = $response->decodeResponseJson();

      $this->assertEquals($postData['title'], $result['title']);
      $this->assertEquals($postData['content'], $result['content']);
      $this->assertEquals($post->created_at, $result['created_at']);
      $this->assertTrue(array_key_exists('author', $result));
      $this->assertEquals($user->_id, $result['author']['_id']);
      $this->assertFalse(array_key_exists('extra-value', $result));
    }

    public function testDestroy(){
      $user = \App\User::create();
      $post = factory(\App\Post::class, 1)->create()->first();
      $post->author()->associate($user);
      $post->save();

      // unauthenticated
      $response = $this->delete("/api/post/{$post->_id}");
      $response->assertStatus(500);

      // authenticated
      $this->actingAs($user);
      $response = $this->delete("/api/post/{$post->_id}");
      $response->assertStatus(200);

      //confirm
      $response = $this->delete("/api/post/{$post->_id}");
      $response->assertStatus(404);
    }
}
