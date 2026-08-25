<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Estudio extends Model
{
    use HasFactory;

    protected $table = 'estudios';
    protected $primaryKey = 'id_estudio';
    public $incrementing = true;

    protected $fillable = [
        'tipo', 'titulo_obtenido', 'institucion', 'anio', 'id_persona'
    ];

    protected $casts = [
        'anio' => 'integer',
    ];

    // Relaciones
    public function persona(): BelongsTo
    {
        return $this->belongsTo(Persona::class, 'id_persona', 'id');
    }
}