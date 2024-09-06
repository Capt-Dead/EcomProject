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
        Schema::create('shoe_sizes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('products_id')->nullable();
            $table->foreign('products_id')->references('id')->on('products');
            $table->boolean('size_1')->default(false)->nullable();
            $table->boolean('size_2')->default(false)->nullable();
            $table->boolean('size_3')->default(false)->nullable();
            $table->boolean('size_4')->default(false)->nullable();
            $table->boolean('size_5')->default(false)->nullable();
            $table->boolean('size_6')->default(false)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shoe_sizes');
    }
};
