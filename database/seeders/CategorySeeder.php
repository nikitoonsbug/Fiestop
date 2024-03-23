<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $category = new Category();
        $category->category_name = 'Accion';
        $category->description = 'Spectacular accion videogames';
        $category->save();

        $category = new Category();
        $category->category_name = 'RPG';
        $category->description = 'Spectacular RPG videogames';
        $category->save();

        $category = new Category();
        $category->category_name = 'Plataforms';
        $category->description = 'Spectacular plataforms videogames';
        $category->save();

        $category = new Category();
        $category->category_name = 'Shooter';
        $category->description = 'Spectacular shooter videogames';
        $category->save();

        $category = new Category();
        $category->category_name = 'Sports';
        $category->description = 'Spectacular sports videogames';
        $category->save();

        $category = new Category();
        $category->category_name = 'Strategy';
        $category->description = 'Spectacular strategy videogames';
        $category->save();

        $category = new Category();
        $category->category_name = 'MMORPG';
        $category->description = 'Spectacular MMORPG videogames';
        $category->save();

        $category = new Category();
        $category->category_name = 'MMO';
        $category->description = 'Spectacular MMO videogames';
        $category->save();

        $category = new Category();
        $category->category_name = 'Puzzle';
        $category->description = 'Spectacular puzzle videogames';
        $category->save();

        $category = new Category();
        $category->category_name = 'Arcade';
        $category->description = 'Spectacular arcade videogames';
        $category->save();

        $category = new Category();
        $category->category_name = 'Fighting';
        $category->description = 'Spectacular fighting videogames';
        $category->save();
    }
}
