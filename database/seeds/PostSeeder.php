<?php

use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = factory(App\User::class, 1)->create(['email' => 'admin@test.com'])->first();
        factory(App\Post::class, 100)->create(['author_id' => $admin->_id])->each(function($p) use($admin) {
          $p->comments()->saveMany(factory(App\Comment::class, 3)->make());
        });
    }
}
