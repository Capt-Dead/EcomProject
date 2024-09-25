<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\Redis;

class Products extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'image',
        'desc',
        'SKU',
        'stock_inventory',
        'price',
    ];

    // relations
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function shoeSize(): HasOne
    {
        return $this->hasOne(ShoeSize::class);
    }

    public function cart(): BelongsToMany
    {
        return $this->belongsToMany(CartItems::class);
    }

    public function review(): HasMany
    {
        return $this->hasMany(Review::class);
    }
}
