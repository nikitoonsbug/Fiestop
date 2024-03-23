<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Videogame extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'image',
        'release_date',
        'stock',
        'price',
        'physical',
        'digital',
        'id_category',
        'id_platform',
        'developer',
        'publisher',
    ];
    public function videogame_categories(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
    public function Book_lends(): HasMany
    {
        return $this->hasMany(Videogame_purchase::class);
    }
}
