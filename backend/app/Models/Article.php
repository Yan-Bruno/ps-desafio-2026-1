<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Article extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'brand',
        'price',
        'launch_year',
        'image',
        'category_id',
        'stock_quantity'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'launch_year' => 'integer',
        'stock_quantity' => 'integer'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}