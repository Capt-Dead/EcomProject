<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaymentRequest;
use App\Models\CartItems;
use App\Models\Products;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session;

class PaymentController extends Controller
{
    //
    // public function index()
    // {
    //     $cart = CartItems::where('user_id', 1)->get();
    //     $data = $cart->load('product');

    //     return $cart;
    // }

    public function store($id)
    {
        $cart = CartItems::where('user_id', $id)->get();
        $data = $cart->load('product');
        $cartArray = [];

        foreach ($cart as $item) {
            $quantity = $item->quantity;
            foreach ($item->product as $product) {
                $priceInCents = $product->price * 100;
                $cartArray[] = [
                    'price_data' => [
                        'currency'     => 'usd',
                        'unit_amount'  => $priceInCents,
                        'product_data' => [
                            'name'        => $product->name,
                            'description' => $product->descs
                        ],
                    ],
                    'quantity' => $quantity
                ];
            };
        };
        // return $cart;

        Stripe::setApiKey(config('stripe.secret_key'));
        $session = Session::create([
            'payment_method_types' => ['card', 'cashapp'],
            'line_items'           => $cartArray,
            'mode'                 => 'payment',
            'success_url'          => 'http://localhost:3000/',
            'cancel_url'           => 'http://localhost:3000/shop-cart',
        ]);


        return response()->json([
            'url' => $session->url
        ], 200);
    }
}
