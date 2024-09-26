<?php

namespace App\Http\Controllers;

use App\Models\CartItems;
use App\Models\OrderDetails;
use App\Models\Products;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Stripe\Stripe;
use Stripe\Checkout\Session;

class PaymentController extends Controller
{
    public function store(Request $request, $id)
    {
        $cart = CartItems::where('user_id', $id)->where('payment', 0)->get();;
        $cart->load('product');

        $cartArray = [];
        $paid = 1;

        foreach ($cart as $item) {
            $quantity = $item->quantity;
            $cartUpdate = CartItems::find($item->id);
            $productUpdate = Products::find($item->products_id);

            foreach ($item->product as $product) {
                $priceInCents = $product->price * 100;

                if ($productUpdate->stock_inventory < 1) {
                    return response()->json([
                        'data' => "Out of stock"
                    ], 422);
                }
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

        Stripe::setApiKey(config('stripe.secret_key'));
        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items'           => $cartArray,
            'mode'                 => 'payment',
            'success_url'          => 'http://localhost:3000/',
            'cancel_url'           => 'http://localhost:3000/shop-cart',
        ]);

        DB::beginTransaction();
        $user = User::find($id);
        $user->address->update([
            'address'     => $request->input('address'),
            'city'        => $request->input('city'),
            'postal_code' => $request->input('postalcode'),
            'country'     => $request->input('country'),
            'mobile_no'   => $request->input('mobile'),
        ]);
        $newQuantity   = $productUpdate->stock_inventory - $quantity;

        $productUpdate->update([
            'stock_inventory' => $newQuantity,
        ]);
        $cartUpdate->update([
            'payment' => $paid,
        ]);

        $total  = $product->price * $cartUpdate->quantity;
        $status = 2;
        $order  = new OrderDetails;
        $order->cart_items_id   = $item->id;
        $order->payment_details = $request->input('options');
        $order->total           = $total;
        $order->status          = $status;
        $order->save();
        DB::commit();

        return response()->json([
            'url' => $session->url
        ], 200);
    }
}
