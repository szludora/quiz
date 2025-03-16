<?php

namespace Database\Seeders;

use App\Models\Quiz;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Test User',
        ]);

        $quizzes = [
            ['english' => 'happy', 'serbian' => 'srećan'],
            ['english' => 'nice', 'serbian' => 'lijepo'],
            ['english' => 'friend', 'serbian' => 'prijatelju'],
            ['english' => 'explosion', 'serbian' => 'eksplozija'],
            ['english' => 'carrot', 'serbian' => 'šargarepa'],
            ['english' => 'car', 'serbian' => 'auto'],
            ['english' => 'soldier', 'serbian' => 'vojnik'],
            ['english' => 'fear', 'serbian' => 'strah'],
            ['english' => 'relativity', 'serbian' => 'relativnost'],
            ['english' => 'book', 'serbian' => 'knjiga'],
            ['english' => 'Earth', 'serbian' => 'Zemlja'],
            ['english' => 'speed limit', 'serbian' => 'ograničenje brzine'],
        ];

        foreach ($quizzes as $quiz) {
            Quiz::create($quiz);
        }
    }
}
