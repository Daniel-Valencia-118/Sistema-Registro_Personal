<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'nombre',
        'paterno',
        'materno',
        'email',
        'password',
        'rol',
        'estado',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'rol' => 'string',
        'estado' => 'boolean',
    ];

    // Accesor para nombre completo
    public function getNombreCompletoAttribute(): string
    {
        return trim("{$this->nombre} {$this->paterno} {$this->materno}");
    }

    // Método para verificar si el usuario está activo
    public function isActivo(): bool
    {
        return $this->estado === true;
    }

    // Método para verificar si tiene un rol específico
    public function hasRole(string $role): bool
    {
        return $this->rol === $role;
    }
}