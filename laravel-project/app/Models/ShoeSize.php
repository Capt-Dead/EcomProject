<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ShoeSize extends Model
{
    use HasFactory;

    protected $fillable = [
        'size_1',
        'size_2',
        'size_3',
        'size_4',
        'size_5',
        'size_6',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Products::class);
    }
}
