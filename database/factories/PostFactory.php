<?php

use Faker\Generator as Faker;

$factory->define(App\Post::class, function (Faker $faker) {
    $faker->addProvider(new \DavidBadura\FakerMarkdownGenerator\FakerProvider($faker));

    return [
        'title' => $faker->sentence,
        'content' => $faker->markdown(),
        'created_at' => $faker->dateTimeBetween('-1 year', 'now', 'Pacific/Auckland'),
    ];
});
