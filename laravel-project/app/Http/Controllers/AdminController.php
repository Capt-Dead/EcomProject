<?php

namespace App\Http\Controllers;

use App\Models\CartItems;
use App\Models\OrderDetails;
use App\Models\Products;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function countUser(Request $request)
    {
        $userAdmin    = User::where('isAdmin', 1)->count();
        $userNotAdmin = User::where('isAdmin', 0)->count();

        $productCount = Products::count();
        $cartDetails  = CartItems::where('payment', 1)->count();

        $revenue      = OrderDetails::where('status', 1)->sum('total');

        $orderOTW     = OrderDetails::where('status', 0)->count();
        $orderDone    = OrderDetails::where('status', 1)->count();
        $orderPending = OrderDetails::where('status', 2)->count();
        $orderCancel  = OrderDetails::where('status', 3)->count();

        $search =  $request->input('search');
        if ($search !== "") {
            $user = User::where('name', 'like', '%' . $search . '%')
                ->orWhere('email', 'like', '%' . $search . '%')
                ->orwhereHas('address', function ($q) use ($search) {
                    $q->where('address', 'like', '%' .  $search . '%');
                    $q->orWhere('city', 'like', '%' .  $search . '%');
                    $q->orWhere('postal_Code', 'like', '%' .  $search . '%');
                    $q->orWhere('country', 'like', '%' .  $search . '%');
                    $q->orWhere('mobile_no', 'like', '%' .  $search . '%');
                })->get();
        } else {
            $user = User::all();
        }
        $user->load('address');

        return response()->json([
            'revenue'       => $revenue,
            'countAdmin'    => $userAdmin,
            'countNotAdmin' => $userNotAdmin,
            'productCount'  => $productCount,
            'cartDetails'   => $cartDetails,
            'orderOTW'      => $orderOTW,
            'orderDone'     => $orderDone,
            'orderPending'  => $orderPending,
            'orderCancel'   => $orderCancel,
            'allUser'       => $user,
        ], 200);
    }

    public function sale(Request $request)
    {
        if ($request->input('status') === "0") {
            $orderDetails = CartItems::where('payment', 1)
                ->whereHas('orderDetails', function ($f) {
                    $f->where('status', 'like', '%' . "0" . '%');
                })->paginate(5);
        } else if ($request->input('status') === "1") {
            $orderDetails = CartItems::where('payment', 1)
                ->whereHas('orderDetails', function ($f) {
                    $f->where('status', 'like', '%' . "1" . '%');
                })->paginate(5);
        } else if ($request->input('status') === "2") {
            $orderDetails = CartItems::where('payment', 1)
                ->whereHas('orderDetails', function ($f) {
                    $f->where('status', 'like', '%' . "2" . '%');
                })->paginate(5);
        } else if ($request->input('status') === "3") {
            $orderDetails = CartItems::where('payment', 1)
                ->whereHas('orderDetails', function ($f) {
                    $f->where('status', 'like', '%' . "3" . '%');
                })->paginate(5);
        } else {
            $orderDetails = CartItems::where('payment', 1)->paginate(5);
        }
        $orderDetails->load('orderDetails');
        $orderDetails->load('product');
        $orderDetails->load('user');
        return response()->json($orderDetails, 200);
    }

    public function completeOrders()
    {
        $completeOrders = CartItems::where('payment', 1)
            ->whereHas('orderDetails', function ($f) {
                $f->where('status', 1);
            })->paginate(5);
        $completeOrders->load('orderDetails');
        $completeOrders->load('product');
        $completeOrders->load('user');


        return response()->json($completeOrders, 200);
    }

    public function pendingOrders()
    {
        $pendingOrders = CartItems::where('payment', 1)
            ->whereHas('orderDetails', function ($f) {
                $f->where('status', 2);
            })->paginate(5);
        $pendingOrders->load('orderDetails');
        $pendingOrders->load('product');
        $pendingOrders->load('user');

        return response()->json($pendingOrders, 200);
    }

    public function products()
    {
        $allProducts  = Products::paginate(5);

        return response()->json($allProducts, 200);
    }

    public function updateStatus($id, Request $request)
    {
        $order = OrderDetails::find($id);
        $order->status = $request->input('status');
        $order->save();
        return response()->json($order, 200);
    }
}
