<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProdCategoryRequest;
use App\Models\ProductCategories;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;

class ProductCategoryController extends Controller
{
    //
    public function index()
    {
        $response = ProductCategories::all();
        return response()->json($response, 200);
    }

    public function store(ProdCategoryRequest $request)
    {
        try {
            DB::beginTransaction();
            // $response = Product::create($request->all()); // Mass assignment must controlle the fillable in Model
            $category        = new ProductCategories();
            $category->name  = $request->input('name');
            $category->desc  = $request->input('desc');
            $category->save();
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json($e);
        }
        return response()->json($category, 201);
    }

    public function show($id)
    {
        try {
            $category = ProductCategories::find($id);
            return $category;
        } catch (Exception $e) {
            return response()->json($e);
        }
        return response()->json(200);
    }

    public function update(Request $request, $id)
    {
        try {
            $category = ProductCategories::find($id);
            $category->update([
                'name' => $request->name,
                'desc' => $request->desc,
            ]);
        } catch (Exception $e) {
            return response()->json($e);
        }
        return response()->json(200);
    }

    public function destroy($id)
    {
        try {
            $category = ProductCategories::find($id);
            $category->delete();
        } catch (Exception $e) {
            return response()->json($e);
        }
        return response()->json(200);
    }
}
