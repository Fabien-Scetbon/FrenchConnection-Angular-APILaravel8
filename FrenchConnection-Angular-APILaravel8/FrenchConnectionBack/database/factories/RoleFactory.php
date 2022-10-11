<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class RoleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $roles = ['User', 'Seller', 'Buyer', 'Admin'];
        return [
            'name' => $roles[array_rand($roles)],

        ];
    }
}
