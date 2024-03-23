<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Videogame_purchase extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_lend',
        'id_book'
    ];

    public function videogames(): BelongsTo{
        return $this->belongsTo(Videogame::class);
    }
    public function lends(): BelongsTo
    {
        return $this->belongsTo(Purchased::class);
    }

}
