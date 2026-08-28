<?php

namespace App\Http\Controllers\RRHH;

use App\Http\Controllers\Controller;
use App\Models\Persona;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FichaPDFController extends Controller
{
    public function generate($id)
    {
        $persona = Persona::with(['estudios', 'experienciasLaborales', 'referenciasLaborales', 'contactos'])->findOrFail($id);
        $relativePath = ltrim($persona->url_foto, '/');
        $relativePath = str_replace('storage/', '', $relativePath); 

        $data = [
            'persona'  => $persona,
            'foto_url' => $persona->url_foto ? asset('storage/' . $relativePath) : null, // Para uso web
            'foto_path' => $persona->url_foto ? storage_path('app/public/' . $relativePath) : null, // EXCLUSIVO PARA EL PDF
            'latitude' => $persona->latitude ?? -16.495581349984814,
            'longitude' => $persona->longitude ?? -68.13352637564697,
        ];


        $pdf = Pdf::loadView('pdf.ficha_personal', $data);
        $pdf->setPaper('letter', 'portrait');
        return $pdf->stream('ficha_personal.pdf');
    }
}