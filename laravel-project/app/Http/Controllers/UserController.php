<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\UserRequest;
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

    // public function store(UserRequest $request)
    // {
    //     try {
    //         DB::beginTransaction();
    //         $user                   = new User();
    //         // $address                = new UserAddress();

    //         $user->name             = $request->input('name');
    //         $user->email            = $request->input('email');
    //         $user->password         = bcrypt($request->input('password'));

    //         // $address->user_id       = $user->id;
    //         // $address->address_line1 = $request->input('address_line1');
    //         // $address->address_line2 = $request->input('address_line2');
    //         // $address->city          = $request->input('city');
    //         // $address->postal_code   = $request->input('postal_code');
    //         // $address->country       = $request->input('country');
    //         // $address->mobile_no     = $request->input('mobile_no');

    //         $user->save();
    //         // $address->User()->associate($user)->save();
    //         // dd($address);
    //         DB::commit();
    //     } catch (Exception $e) {
    //         DB::rollBack();
    //         throw $e;
    //     }
    //     return response()->json($user, 201);
    // }

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
            // $userAddress              =  new UserAddress();
            // // $userAddress->user_id     = $request->input($id);
            // $userAddress->address     = $request->input('address');
            // $userAddress->city        = $request->input('city');
            // $userAddress->postal_code = $request->input('postalcode');
            // $userAddress->country     = $request->input('country');
            // $userAddress->mobile_no   = $request->input('mobile');
            // $user->address()->update($userAddress);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
        return response()->json("Updated!", 200);
    }
}
