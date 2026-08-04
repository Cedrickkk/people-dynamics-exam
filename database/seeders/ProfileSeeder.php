<?php

namespace Database\Seeders;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::query()->limit(5)->get();

        if ($users->isEmpty()) {
            $users = User::factory(5)->create();
        }

        foreach ($users as $user) {
            Profile::factory()->create([
                'user_id' => $user->id,
            ]);
        }
    }
}
