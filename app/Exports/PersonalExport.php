<?php

namespace App\Exports;

use App\Models\Persona;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Carbon\Carbon;
use Illuminate\Database\Query\Builder as QueryBuilder;
use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\Eloquent\Relations\Relation;

class PersonalExport implements FromQuery, WithHeadings, WithMapping
{
    protected $search;

    public function __construct($search = null)
    {
        $this->search = $search;
    }

    public function query(): QueryBuilder|EloquentBuilder|Relation
    {
        $query = Persona::with(['estudios', 'experienciasLaborales', 'referenciasLaborales', 'contactos']);

        if ($this->search) {
            $query->where(function ($q) {
                $q->where('nombres', 'LIKE', "%{$this->search}%")
                  ->orWhere('paterno', 'LIKE', "%{$this->search}%")
                  ->orWhere('materno', 'LIKE', "%{$this->search}%")
                  ->orWhere('ci', 'LIKE', "%{$this->search}%")
                  ->orWhere('email', 'LIKE', "%{$this->search}%");
            });
        }
        
        return $query;
    }


    public function headings(): array
    {
        return [
            'Paterno', 'Materno', 'Nombres', 'CI', 'Expedición', 'Sexo',
            'Fecha Nac.', 'Provincia', 'Ciudad', 'Estado Civil',
            'Email', 'Teléfono', 'Celular', 'Dirección', 'Fecha Ingreso',
            'Cargo'
        ];
    }

    public function map($persona): array
    {
        return [
            $persona->paterno,
            $persona->materno,
            $persona->nombres,
            $persona->ci,
            $persona->ci_expedicion,
            $persona->sexo,
            $persona->fecha_nacimiento ? Carbon::parse($persona->fecha_nacimiento)->format('d/m/Y') : '',
            $persona->lugar_nacimiento_provincia,
            $persona->lugar_nacimiento_ciudad,
            $persona->estado_civil,
            $persona->email,
            $persona->telefono,
            $persona->celular,
            $persona->direccion_actual,
            $persona->fecha_ingreso_fundacion ? Carbon::parse($persona->fecha_ingreso_fundacion)->format('d/m/Y') : '',
            $persona->cargo_actual,
            // mb_strtoupper($persona->estado), // Estandarizamos el texto del estado a mayúsculas
        ];
    }
}
