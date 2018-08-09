<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\Http\Requests\PostRequest;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->except('index');
    }

    public function index(Request $request) : array
    {
        $perPage = (int) $request->input('perPage', 2);
        $page = (int) $request->input('page', 1);

        return [
          'posts' => Post::with(['author'])->take($perPage)->skip($perPage * ($page-1))->orderBy('created_at', 'desc')->get(),
          'total' => Post::count(),
        ];
    }

    public function show(Post $post) : Post
    {
        return $post;
    }

    public function store(PostRequest $request) : Post
    {
        $post = new Post($request->only(['title', 'content']));
        $post->created_at = \Carbon\Carbon::now();
        $post->author()->associate($request->user());
        $post->save();
        return $post;
    }

    public function update(PostRequest $request, $postId) : Post
    {
        $post = Post::with('author')->findOrFail($postId);
        $post->fill($request->only(['title', 'content']))->save();
        return $post;
    }

    public function destroy(Post $post)
    {
        $post->delete();
    }
}
