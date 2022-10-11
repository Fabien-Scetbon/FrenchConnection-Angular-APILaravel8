<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;

Route::post('login', [ApiController::class, 'authenticate']);
Route::post('register', [ApiController::class, 'register']);

Route::group(['middleware' => ['jwt.verify']], function () {
    Route::get('logout', [ApiController::class, 'logout']);
    Route::get('get_user', [ApiController::class, 'get_user']);
    
});

// Routes Users

Route::group(['prefix' => 'users'], function () {
    Route::get('/', [UserController::class, 'getUsers']);
    Route::get('{id}', [UserController::class, 'getUser']);
    Route::patch('{id}', [UserController::class, 'updateUser']);
    Route::delete('{id}', [UserController::class, 'deleteUser']);
});


  // Route::group(['middleware' => 'isadmin'], function () {
    // });

    Route::group(['prefix' => 'products'], function () {
      Route::get('/', [ProductController::class, 'getProducts']);
      Route::get('{id}', [ProductController::class, 'getProduct']);
      Route::get('category/{category_id}',[ ProductController::class, 'getProductsByCategory']);
      Route::get('seller/{seller_id}',[ ProductController::class, 'getProductsBySeller']);
      Route::post('/', [ProductController::class, 'createProduct']);
      Route::patch('{id}', [ProductController::class, 'updateProduct']);
      Route::delete('{id}', [ProductController::class, 'deleteProduct']);
  });

  Route::group(['prefix' => 'categories'], function () {
    Route::get('/', [CategoryController::class, 'getCategories']);
    Route::get('{id}', [CategoryController::class, 'getCategory']);
    Route::post('/', [CategoryController::class, 'createCategory']);
    Route::patch('{id}', [CategoryController::class, 'updateCategory']);
    Route::delete('{id}', [CategoryController::class, 'deleteCategory']);
});

Route::group(['prefix' => 'carts'], function () {
  Route::get('/', [CartController::class, 'getCarts']);
  Route::get('{id}', [CartController::class, 'getCart']);
  Route::get('buyer/{buyer_id}' , [CartController::class, 'getCartsByBuyer']);
  Route::post('/', [CartController::class, 'createCart']);
  Route::delete('{id}', [CartController::class, 'deleteCart']);
});