<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name'        => $this->faker->sentence,
            'price'       => random_int(0, 15000),
            'description' => $this->faker->paragraph,
            'image'       => $this->faker->url,
            'seller_id'    => User::all()->random()->id,
            'category_id'  => Category::all()->random()->id,
            'status'    => random_int(0, 1),
        ];
    }
}
