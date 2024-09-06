<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class CartItems extends Model
{
    use HasFactory;

    protected $fillable = [
        'quantity',
    ];


    public function product(): BelongsToMany
    {
        return $this->belongsToMany(Products::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
