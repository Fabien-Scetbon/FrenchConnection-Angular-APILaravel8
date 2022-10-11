<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Wishlist extends Model
{
    use HasFactory;


    protected $table = 'wishlists';

    protected $fillable = [
        'user_id',
        'wish'
    ];


    public function wishUsers()
    {
        return $this->belongsTo(User::class);
    }

  
}
