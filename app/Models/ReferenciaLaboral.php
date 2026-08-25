<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReferenciaLaboral extends Model
{
    use HasFactory;

    protected $table = 'referencias_laborales';
    protected $primaryKey = 'id_ref_lab';
    public $incrementing = true;

    protected $fillable = [
        'nombre_referente', 
        'institucion', 
        'telefono_celular', 
        'id_persona'
    ];

    public function persona(): BelongsTo
    {
        return $this->belongsTo(Persona::class, 'id_persona', 'id');
    }
}
