<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductDiscountController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserAddressController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('login', [LoginController::class, 'login']);
Route::post('register', [LoginController::class, 'register']);
Route::get('product', [ProductController::class, 'index']);
Route::post('/payment/{id}', [PaymentController::class, 'store']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::resource('/cart', CartController::class);
    Route::resource('/user', UserController::class);

    Route::get('/product-user/{id}', [ProductController::class, 'userProduct']);
    Route::get('/product/{id}/view', [ProductController::class, 'show']);
    Route::get('/product/{id}', [ProductController::class, 'userProduct']);

    Route::post('logout', [LoginController::class, 'logout']);
    Route::post('/product', [ProductController::class, 'store']);

    Route::put('/product/{id}', [ProductController::class, 'update']);
});
