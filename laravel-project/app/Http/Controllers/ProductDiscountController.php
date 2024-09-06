<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProdDiscountRequest;
use App\Models\ProductDiscount;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductDiscountController extends Controller
{
    //
    public function index()
    {
        $response = ProductDiscount::all();
        return response()->json($response, 200);
    }

    public function store(ProdDiscountRequest $request)
    {
        try {
            DB::beginTransaction();
            $total_discount = $request->input('discount_percent') / 100;
            $discount                    = new ProductDiscount();
            $discount->name              = $request->input('name');
            $discount->desc              = $request->input('desc');
            $discount->discount_percent  = $total_discount;
            $discount->status            = $request->input('status');
            $discount->save();
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
        return response()->json($discount, 201);
    }

    public function update(Request $request, $id)
    {
        try {
            $discount = ProductDiscount::all();
            $discount = $discount->find($id);
            $total_discount =  $request->discount_percent;
            if ($total_discount  > 100) {
                return 'Invalid';
            }
            $total_discount = $request->discount_percent / 100;
            $discount->update([
                'name'             => $request->name,
                'desc'             => $request->desc,
                'discount_percent' => $request->discount_percent,
                'status'           => $request->status,
            ]);
        } catch (Exception $e) {
            throw $e;
        }
        return response()->json(200);
    }
}
