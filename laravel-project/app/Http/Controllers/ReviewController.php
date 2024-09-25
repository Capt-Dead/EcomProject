<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReviewController extends Controller
{
    public function productReview($id)
    {
        $count = Review::where('products_id', $id)->count();

        $review = Review::where('products_id', $id)->get();
        $review->load('user');

        return response()->json([
            'review' => $review,
            'count'  => $count
        ], 200);
    }

    public function newReview(Request $request)
    {
        try {
            DB::beginTransaction();
            $review          = new Review();
            $review->user_id     = $request->input('user_id');
            $review->products_id = $request->input('products_id');
            $review->comment     = $request->input('comment');
            $review->save();
            DB::commit();
            return response()->json($review, 201);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Something went wrong' . $e,
            ], 500);
        }
    }
}
