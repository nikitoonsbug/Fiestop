<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = new User();
        $user->name = 'admin';
        $user->email = 'admin@gmail.com';
        $user->password = bcrypt('root');
        $user->address = 'Calle Azteca #218';
        $user->phone_number = '4491102262';
        $user->id_rol = 1;
        $user->save();

        $user = new User();
        $user->name = 'user';
        $user->email = 'user@gmail.com';
        $user->password = bcrypt('root');
        $user->address = 'Calle Azteca #218';
        $user->phone_number = '4491102262';
        $user->id_rol = 2;
        $user->save();
    }
}
