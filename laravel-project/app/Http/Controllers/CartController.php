<?php

namespace App\Http\Controllers;

use App\Http\Requests\CartRequest;
use App\Models\CartItems;
use App\Models\Products;
use Exception;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    public function store(CartRequest $request)
    {
        try {
            DB::beginTransaction();
            $product = Products::find($request->input("products_id"));
            $product->update([
                'stock_inventory' => $request->input("newQuantity"),

            ]); // Bawas ng quantity 
            $cart = new CartItems();
            $cart->products_id = $request->input("products_id");
            $cart->user_id     = $request->input("user_id");
            $cart->size        = $request->input("size");
            $cart->quantity    = $request->input("quantity");

            $cart->save();
            $cart->product()->attach($cart->products_id);
            DB::commit();
            return response()->json("Success", 201);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json($e);
        }
        return response()->json([
            'error' => 'Something went wrong',
        ], 401);
    }

    public function show($id)
    {
        $cart = CartItems::where('user_id', $id)->get();
        $data = $cart->load('product');
        return response()->json($cart, 201);
    }

    public function destroy($id)
    {
        $cart = CartItems::find($id);
        $cart->delete();

        return response()->json('Deleted');
    }
}
