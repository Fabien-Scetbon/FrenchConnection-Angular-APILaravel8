<?php

namespace App\Models;

use App\Models\User;
use App\Models\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Cart extends Model
{
    use HasFactory;


    protected $table = 'carts';

    protected $fillable = [
        'seller_id',
        'buyer_id',
        'product_id',
        'amount'
       
    ];


    // public function cartSellers()
    // {
    //     return $this->belongsTo(User::class);
    // }

    // public function cartBuyers()
    // {
    //     return $this->belongsTo(User::class);
    // }

    // public function cartProducts()
    // {
    //     return $this->belongsTo(Product::class);
    // }
}
