<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\Http\Requests\PostRequest;

class PostController extends Controller
{
    public function __construct() {
        //$this->middleware('auth:api');
    }

    public function index(Request $request) {
        $perPage = (int) $request->input('perPage', 2);
        $page = (int) $request->input('page', 1);

        return [
          'posts' => Post::with(['author'])->take($perPage)->skip($perPage * ($page-1))->orderBy('created_at')->get(),
          'total' => Post::count(),
        ];
    }

    public function show(Post $post) {
        return $post;
    }

    protected function save(PostRequest $request) {

    }

    public function store(PostRequest $request) {

    }

    public function update(PostRequest $request) {
        $post = new Post($request->only(['title', 'content']));
        $post->user()->associate(\Auth::user());
        return $post->save();
    }

    public function destroy() {

    }
}
