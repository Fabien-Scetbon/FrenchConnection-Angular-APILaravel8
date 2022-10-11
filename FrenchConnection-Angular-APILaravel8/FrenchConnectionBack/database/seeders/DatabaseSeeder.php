<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table("categories")->insert([
            ["name" => "Chaise"],
            ["name" =>"Table"],
            ["name" =>"Bureau"],
            ["name" =>"Armoire"],
            ["name" =>"Meuble TV"],
            ["name" =>"Luminaire"],
            ["name" =>"Accessoires"],
            ["name" =>"Fauteuil"],
            ["name" =>"Sofa"],

        ]);

        DB::table("roles")->insert([
            ["name" => "User"],
            ["name" => "Seller"],
            ["name" => "Buyer"],
            ["name" => "Admin"],

        ]);

        \App\Models\User::factory(20)->create();
        \App\Models\Product::factory(25)->create();
        \App\Models\Cart::factory(10)->create();
    //     \App\Models\Wishlist::factory(10)->create();
    }
}
