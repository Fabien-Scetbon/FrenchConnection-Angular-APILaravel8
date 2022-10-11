<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $categories = ['Chaise', 'Table', 'Bureau','Armoire','Meuble TV','Luminaire','Accessoires','Fauteuil','Sofa'];
        return [
            'name' => $categories[array_rand($categories)],

        ];
    }
}
