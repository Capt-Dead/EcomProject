<?php

namespace App\Http\Controllers;

use App\Http\Requests\CartRequest;
use App\Models\CartItems;
use App\Models\OrderDetails;
use App\Models\Products;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    public function store(CartRequest $request)
    {
        try {
            DB::beginTransaction();
            $cart = new CartItems();
            $cart->user_id     = $request->input("user_id");
            $cart->products_id = $request->input("products_id");
            $cart->size        = $request->input("size");
            $cart->quantity    = $request->input("quantity");
            $cart->payment     = $request->input("payment");

            $cart->save();
            $cart->product()->attach($cart->products_id);

            $cart    = CartItems::where('user_id', $request->input("user_id"))->where('payment', 0)->count();

            DB::commit();
            return response()->json([
                'message' => "Success",
                'cart'    => $cart
            ], 201);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json($e);
        }
        return response()->json([
            'error' => 'Something went wrong',
        ], 401);
    }

    public function showUnpaid($id)
    {
        $cart = CartItems::where('user_id', $id)->where('payment', 0)->get();
        $cart->load('product');

        $cartCount = CartItems::where('user_id', $id)->where('payment', 0)->count();

        return response()->json([
            'cart'      => $cart,
            'cartCount' => $cartCount,
        ], 201);
    }

    public function showPaid($id)
    {
        $cart = CartItems::where('user_id', $id)->where('payment', 1)->get();
        $cart->load('product');
        $cart->load('orderDetails');

        return response()->json($cart, 201);
    }

    public function cancel($id)
    {
        $cancel = 3;
        $order = OrderDetails::find($id);
        $order->status = $cancel;
        $order->save();

        return response()->json('Your order is cancelled', 202);
    }

    public function destroy($id)
    {
        $cart = CartItems::find($id);
        $cart->delete();

        return response()->json('Deleted');
    }
}
