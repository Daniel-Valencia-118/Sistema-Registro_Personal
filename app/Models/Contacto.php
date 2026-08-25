<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Contacto extends Model
{
    use HasFactory;

    protected $table = 'contactos';
    protected $primaryKey = 'id_familiar';
    public $incrementing = true;

    protected $fillable = [
        'nombre', 'paterno', 'materno', 'parentesco_relacion',
        'edad', 'telefono_celular', 'es_familiar', 'id_persona'
    ];

    protected $casts = [
        'edad' => 'integer',
        'es_familiar' => 'boolean',
    ];

    // Relaciones
    public function persona(): BelongsTo
    {
        return $this->belongsTo(Persona::class, 'id_persona', 'id');
    }
}