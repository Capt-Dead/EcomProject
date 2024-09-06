<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\CartItems;
use App\Models\Products;
use App\Models\ShoeSize;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Tests\Feature\ProductTest;

class ProductController extends Controller
{
    public function index()
    {
        $response = Products::all();
        return response()->json($response, 200);
    }

    public function store(ProductRequest $request)
    {
        try {
            DB::beginTransaction();
            $imageName                 = Str::random(32) . "." . $request->image->getClientOriginalExtension();
            $products                  = new Products();

            $products->name            = $request->input('name');
            $products->user_id         = $request->input('user_id');
            $products->image           = $imageName;
            $products->descs           = $request->input('descs');
            $products->gender          = $request->input('gender');
            $products->SKU             = fake()->unique()->numerify('###-###-###');
            $products->stock_inventory = $request->input('stock_inventory');
            $products->price           = $request->input('price');
            $products->save();

            $shoeSize                  =  new ShoeSize;
            $shoeSize->size_1          = $request->input('size1');
            $shoeSize->size_2          = $request->input('size2');
            $shoeSize->size_3          = $request->input('size3');
            $shoeSize->size_4          = $request->input('size4');
            $shoeSize->size_5          = $request->input('size5');
            $shoeSize->size_6          = $request->input('size6');
            $products->shoeSize()->save($shoeSize);

            Storage::disk('public')->put($imageName, file_get_contents($request->image));

            DB::commit();
            return response()->json($shoeSize . $products, 201);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Something went wrong' . $e,
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $shoe = new ShoeSize();
            $products = Products::find($id);
            $shoe = $products->shoeSize;

            // dd($shoe);
            if (!$products) {
                return response()->json([
                    'message' => 'Not Found'
                ], 404);
            }

            return response()->json($products, 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong' . $e,
            ], 500);
        }
    }

    public function userProduct($id)
    {
        try {
            $products = Products::where('user_id', '=', $id)->get();

            if (!$products) {
                return response()->json([
                    'message' => 'Not Found'
                ], 404);
            }

            return response()->json($products, 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong' . $e,
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            DB::beginTransaction();

            $products = Products::find($id);
            if (!$products) {
                return response()->json([
                    'message' => 'Not Found'
                ], 404);
            }

            $products->name            = $request->input('name');
            $products->descs           = $request->input('descs');
            $products->gender          = $request->input('category');
            $products->stock_inventory = $request->input('stock_inventory');
            $products->price           = $request->input('price');

            $products->shoeSize->update([
                'size1' => $request->input('size1'),
                'size2' => $request->input('size2'),
                'size3' => $request->input('size3'),
                'size4' => $request->input('size4'),
                'size5' => $request->input('size5'),
                'size6' => $request->input('size6'),
            ]);

            if ($request->image) {
                $storage = Storage::disk('public');

                if ($storage->exists($products->image))
                    $storage->delete($products->image);

                $imageName = Str::random(32) . "." . $request->image->getClientOriginalExtension();
                $products->image = $imageName;

                $storage->put($imageName, file_get_contents($request->image));
            }

            $products->save();
            DB::commit();
            return response()->json($products, 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong: ' . $e,
            ], 500);
        }
    }

    // public function destroy($id)
    // {

    //     try {
    //         $products = Products::find($id);
    //         if (!$products) {
    //             return response()->json([
    //                 'message' => 'Product not found'
    //             ], 404);
    //         }

    //         $storage = Storage::disk('public');

    //         if ($storage->exists($products->image))
    //             $storage->delete($products->image);

    //         $products->delete();
    //         return response()->json([
    //             'message' => 'Product Deleted'
    //         ], 200);
    //     } catch (Exception $e) {
    //         return response()->json([
    //             'message' => 'Something went wrong: ' . $e,
    //         ], 500);
    //     }
    // }
}
