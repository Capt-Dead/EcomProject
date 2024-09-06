<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\UserRequest;
use App\Models\User;
use App\Models\UserAddress;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class LoginController extends Controller
{
    public function login(LoginRequest $request)
    {
        try {
            $email    = $request->email;
            $password = $request->password;

            if (Auth::attempt(['email' => $email, 'password' => $password])) {
                $user  = Auth::user();
                $token = $request->user()->createToken('user')->plainTextToken;

                // $token = $request->user()->createToken('token', expiresAt: now()->addDay());
                return response()->json([
                    'user'  => $user->id,
                    'token' => $token,
                ], 202);
            }
        } catch (Exception $e) {
            return response()->json($e);
        }
        return response()->json([
            'error' => 'Account not found',
        ], 401);
    }

    public function register(UserRequest $request)
    {
        try {
            DB::beginTransaction();
            $user                 = new User();
            $user->name           = $request->input('name');
            $user->email          = $request->input('email');
            $user->password       = bcrypt($request->input('password'));
            $user->save();

            $address              = new UserAddress();
            $address->address     = "Address";
            $address->city        = "City";
            $address->postal_code = "Postal Code";
            $address->country     = "Country";
            $address->mobile_no   = "Mobile No.";

            $user->address()->save($address);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
        return response()->json($user, 201);
    }

    public function logout(Request $request)
    {
        try {
            // Auth::logout();
            $request->user()->currentAccessToken()->delete();
        } catch (Exception $e) {
            return $e;
        }
    }
}
