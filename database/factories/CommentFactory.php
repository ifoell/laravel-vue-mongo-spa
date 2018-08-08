<?php

use Faker\Generator as Faker;

$factory->define(App\Comment::class, function (Faker $faker) {
    return [
        'name' => $faker->name(),
        'email' => $faker->email(),
        'title' => $faker->text,
        'content' => $faker->text(20),
        'created_at' => $faker->dateTimeBetween('-1 year', 'now', 'Pacific/Auckland'),
    ];
});
