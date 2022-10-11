<?php

namespace App\Models;

use App\Models\Cart;
use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that have default value.
     *
     * @var array
     */
    protected $attributes = [
        'status' => false,
    ];


    protected $table = 'products';

    protected $fillable = [
        'name',
        'price',
        'description',
        'image',
        'seller_id',
        'category_id',
    ];


    public function productCategories()
    {
        return $this->belongsTo(Category::class);
    }

    public function productUsers()
    {
        return $this->belongsTo(User::class);
    }

    public function productCarts()
    {
        return $this->belongsTo(Cart::class);
    }

   

}
