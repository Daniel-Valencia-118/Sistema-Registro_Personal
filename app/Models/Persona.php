<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Persona extends Model
{
    use HasFactory;

    protected $table = 'personas';
    protected $primaryKey = 'id';
    public $incrementing = true;

    protected $fillable = [
        'paterno', 'materno', 'nombres', 'ci', 'ci_expedicion', 'sexo',
        'fecha_nacimiento', 'lugar_nacimiento_provincia', 'lugar_nacimiento_ciudad',
        'estado_civil', 'numero_hijos', 'email', 'telefono', 'celular',
        'direccion_actual', 'fecha_ingreso_fundacion', 'cargo_actual',
        'url_croquis', 'url_foto',
        'estado', // nuevo campo
    ];

    protected $casts = [
        'fecha_nacimiento' => 'date',
        'fecha_ingreso_fundacion' => 'date',
        'numero_hijos' => 'integer',
    ];

    // Accesor para nombre completo
    public function getNombreCompletoAttribute(): string
    {
        return trim("{$this->nombres} {$this->paterno} {$this->materno}");
    }

    // Relaciones
    public function experienciasLaborales(): HasMany
    {
        return $this->hasMany(ExperienciaLaboral::class, 'id_persona', 'id');
    }

    public function referenciasLaborales(): HasMany
    {
        return $this->hasMany(ReferenciaLaboral::class, 'id_persona', 'id');
    }

    public function contactos(): HasMany
    {
        return $this->hasMany(Contacto::class, 'id_persona', 'id');
    }

    public function estudios(): HasMany
    {
        return $this->hasMany(Estudio::class, 'id_persona', 'id');
    }

    // Métodos de estado
    public function cambiarEstado(string $nuevoEstado): void
    {
        if (!in_array($nuevoEstado, ['aprobado', 'observado', 'rechazado'])) {
            throw new \InvalidArgumentException('Estado no válido');
        }
        $this->estado = $nuevoEstado;
        $this->save();
    }

    public function isAprobado(): bool
    {
        return $this->estado === 'aprobado';
    }

    public function isObservado(): bool
    {
        return $this->estado === 'observado';
    }

    public function isRechazado(): bool
    {
        return $this->estado === 'rechazado';
    }
}