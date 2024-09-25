<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class CartItems extends Model
{
    use HasFactory;

    protected $fillable = [
        'quantity',
        'payment',
    ];


    public function product(): BelongsToMany
    {
        return $this->belongsToMany(Products::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function orderDetails(): HasOne
    {
        return $this->hasOne(OrderDetails::class);
    }
}
