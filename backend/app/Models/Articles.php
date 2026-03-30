<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Support\Facades\Storage;
use Throwable;

class Articles extends Model
{
    use HasFactory, HasUuids;
    
    protected $fillable = [
        'name',
        'brand',
        'price',
        'year',
        'image',
        'amount',
        'category_id'
    ];

    protected $casts = [
        'price' => 'float',
        'year' => 'integer'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    protected static function booted(){
        self::deleted(function(Articles $articles){
         try{
            $image_name = explode ('articles/', $articles['image']); 
            Storage::disk('public')->delete('articles/'.$image_name[1]);
            }catch(Throwable){
            }
         });
    }
}