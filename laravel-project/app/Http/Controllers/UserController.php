<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\UserRequest;
use App\Models\CartItems;
use App\Models\User;
use App\Models\UserAddress;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $response = User::all();
        return response()->json($response, 200);
    }

    public function show($id)
    {
        try {
            $address = new UserAddress();
            $user    = User::find($id);
            $address = $user->address;

            // $cart    = CartItems::where('user_id', $id)->where('payment', 0)->count();
            if (!$user) {
                return response()->json([
                    'message' => 'Not Found'
                ], 404);
            }

            return response()->json($user, 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong' . $e,
            ], 500);
        }
    }

    public function update(UpdateUserRequest $request, $id)
    {
        //
        try {
            DB::beginTransaction();
            $user = User::find($id);
            $user->update([
                'name'  => $request->input('name'),
                'email' => $request->input('email'),
            ]);


            $user->address->update([
                'address'     => $request->input('address'),
                'city'        => $request->input('city'),
                'postal_code' => $request->input('postalcode'),
                'country'     => $request->input('country'),
                'mobile_no'   => $request->input('mobile'),
            ]);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
        return response()->json("Updated!", 200);
    }
}
