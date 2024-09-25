<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Products;
use App\Models\ShoeSize;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        $response = Products::all();
        return response()->json($response, 200);
    }

    public function highTops()
    {
        $response = Products::where('gender', 'High Tops')->get();
        return response()->json($response, 200);
    }

    public function midTops()
    {
        $response = Products::where('gender', 'Mid Tops')->get();
        return response()->json($response, 200);
    }

    public function lowTops()
    {
        $response = Products::where('gender', 'Low Tops')->get();
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
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
        return response()->json($products, 201);
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
                'size_1' => $request->input('size1'),
                'size_2' => $request->input('size2'),
                'size_3' => $request->input('size3'),
                'size_4' => $request->input('size4'),
                'size_5' => $request->input('size5'),
                'size_6' => $request->input('size6'),
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
