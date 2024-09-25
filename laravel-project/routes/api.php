<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UserController;
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
Route::get('product-hightops', [ProductController::class, 'highTops']);
Route::get('product-midtops', [ProductController::class, 'midTops']);
Route::get('product-lowtops', [ProductController::class, 'lowTops']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::resource('/user', UserController::class);

    Route::get('/product-user/{id}', [ProductController::class, 'userProduct']);
    Route::get('/product/{id}/view', [ProductController::class, 'show']);
    Route::get('/product/{id}', [ProductController::class, 'userProduct']);
    Route::get('/product/{id}', [ProductController::class, 'userProduct']);
    Route::get('/cart/{id}', [CartController::class, 'showUnpaid']);
    Route::get('/cart/{id}/paid', [CartController::class, 'showPaid']);
    Route::get('all-products', [AdminController::class, 'products']);
    Route::get('complete-orders', [AdminController::class, 'completeOrders']);
    Route::get('pending-orders', [AdminController::class, 'pendingOrders']);
    Route::get('review/{id}', [ReviewController::class, 'productReview']);

    Route::post('new-review', [ReviewController::class, 'newReview']);
    Route::post('logout', [LoginController::class, 'logout']);
    Route::post('/product', [ProductController::class, 'store']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::post('/payment/{id}', [PaymentController::class, 'store']);
    Route::post('sale', [AdminController::class, 'sale']);
    Route::post('admin', [AdminController::class, 'countUser']);

    Route::put('/order/{id}/cancel', [CartController::class, 'cancel']);
    Route::put('/product/{id}', [ProductController::class, 'update']);
    Route::put('update-status/{id}', [AdminController::class, 'updateStatus']);

    Route::delete('/cart/{id}', [CartController::class, 'destroy']);
});
