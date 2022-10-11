<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class CartFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'seller_id' => User::all()->random()->id,
            'buyer_id' => User::all()->random()->id,
            'product_id' => Product::all()->random()->id,
            'amount' => random_int(0, 15000),
        ];
    }
}
