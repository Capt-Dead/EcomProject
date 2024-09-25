<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderDetails extends Model
{
    use HasFactory;

    protected $fillable = [
        'total',
        'payment_details',
    ];

    public function cartItems(): BelongsTo
    {
        return $this->belongsTo(CartItems::class);
    }
}
