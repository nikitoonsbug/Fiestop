<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Purchased extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_user',
        'purchase_date',
        'purchase_method',
        'purchase_currency',
        'purchase_status',
    ];

    public function users(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function videogames_purchased(): HasMany
    {
        return $this->hasMany(Videogame_purchase::class);
    }

    
}
