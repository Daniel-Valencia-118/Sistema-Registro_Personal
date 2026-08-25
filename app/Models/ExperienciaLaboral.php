<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ExperienciaLaboral extends Model
{
    use HasFactory;

    protected $table = 'experiencias_laborales';
    protected $primaryKey = 'id_exp_lab';
    public $incrementing = true;

    protected $fillable = [
        'institucion', 'cargo', 'fecha_inicio', 'fecha_fin', 'id_persona'
    ];

    protected $casts = [
        'fecha_inicio' => 'date',
        'fecha_fin' => 'date',
    ];

    // Relaciones
    public function persona(): BelongsTo
    {
        return $this->belongsTo(Persona::class, 'id_persona', 'id');
    }

    public function referenciasLaborales(): HasMany
    {
        return $this->hasMany(ReferenciaLaboral::class, 'id_exp_lab', 'id_exp_lab');
    }
}