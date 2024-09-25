<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('cart_items_id')->nullable();
            $table->foreign('cart_items_id')->references('id')->on('cart_items')->onDelete('cascade');;
            $table->float('total');
            $table->integer('payment_details')->comment("0-COD, 1-Credit Card");
            $table->tinyInteger('status')->comment("0- On the way, 1-Done, 2-Pending, 3-Cancel");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_details');
    }
};
