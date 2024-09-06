<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserAddress as ModelsUserAddress;
use App\Http\Requests\UserAddressRequest;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserAddressController extends Controller
{
    //
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();
            $user                   = new User();
            $address                = new ModelsUserAddress();
            // $address->user_id       = $user->id;
            $address->address_line1 = $request->input('address_line1');
            $address->address_line2 = $request->input('address_line2');
            $address->city          = $request->input('address_line2');
            $address->postal_code   = $request->input('address_line2');
            $address->country       = $request->input('address_line2');
            $address->mobile_no     = $request->input('address_line2');
            $address->save();
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
        return response()->json($address, 201);
    }
}
