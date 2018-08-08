<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \DB::collection('posts')->truncate();
        \DB::collection('users')->truncate();
         $this->call(PostSeeder::class);
    }
}
