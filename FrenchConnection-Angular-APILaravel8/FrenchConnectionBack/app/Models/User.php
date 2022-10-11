<?php

namespace App\Models;

use App\Models\Cart;
use App\Models\Role;
use App\Models\Product;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject

{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that have default value.
     *
     * @var array
     */
    // protected $attributes = [
        
    // ];

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */


    protected $fillable = [
        'role_id',
        'username',
        'email',
        'address',
        'phone',
        'password'
    ];


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        
    ];

  

    public function userProducts()
    {
        return $this->hasMany(Product::class);
    }

    public function userRoles()
    {
        return $this->belongsTo(Role::class);
    }

    public function userCarts()
    {
        return $this->hasMany(Cart::class);
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    public function getJWTCustomClaims()
    {
        return [];
    }
}
