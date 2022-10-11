<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\User;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\BaseController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CartController extends BaseController
{
    public function getCarts()
    {
        $carts = Cart::all();
        $message = 'Request Get Cart index successfull.';
        foreach ($carts as $cart) {
            $seller = User::where('id', $cart->seller_id)->get();
            $buyer = User::where('id', $cart->buyer_id)->get();
            $productName = Product::where('id', $cart->product_id)->get();
            $cart->seller = $seller[0]->username;
            $cart->buyer = $buyer[0]->username;
            $cart->productName = $productName[0]->name;

        }

        return $this->sendResponse([
            'carts' => $carts,

        ], $message, 201);
    }

    public function getCart($id)
    {
        try {
            $cart = Cart::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return $this->sendError('Cart not found', $e, 400);
        }

        $message = 'Cart successfully found';
        return $this->sendResponse([
            'cart' => $cart,
        ], $message, 201);
    }


    public function getCartsByBuyer($data)    
    {
        $carts = Cart::select()->where('buyer_id', '=' , $data)->get();
        $message = 'Request Get Cart index successfull.';
        if (!($carts->isEmpty())){
        return $this->sendResponse([
            'carts' => $carts,

        ], $message, 201);
        } else {
            return $this->sendResponse('not found',401);
        }
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function createCart(Request $request)
    {
        

        $data = $request->all();
        $validator = Validator::make($data, [
            'buyer_id' => 'required',
            'product_id' => 'required',
            'seller_id' => 'required',
            'amount' => 'required|integer',
        ]);

        if ($validator->fails()) {

            return $this->sendError('Validation Error.', $validator->errors(), 400);
        }

        $cart = Cart::where('buyer_id', '=', $data['buyer_id'])->where('product_id', '=', $data['product_id'])->first();;
   

        if (!isset($cart)){
            $cart = Cart::create($data);
            $message = "Product added to Cart !";
            return $this->sendResponse($cart, $message, 200);
        }
        else {
            $cart = Cart::find($cart->id);
            $result = $cart->delete();
            if ($result) {
                $message = 'The Product has been succesfully deleted from the Cart';
            } else {
                $message = 'We have encountered an error in the deleting of the Cart';
            }
             return $this->sendResponse($cart, $message, 202);
        } 

       
    }


    public function deleteCart($id)
    {
        $cart = Cart::find($id);
        $result = $cart->delete();
        if ($result) {
            $message = 'The product has been succesfully delete from the cart';
        } else {
            $message = 'We have encountered an error in the deleting of the Product';
        }
        return $this->sendResponse($cart, $message, 201);
    } 
}
