<?php

namespace App\Http\Controllers\RRHH;

use App\Http\Controllers\Controller;
use App\Models\Persona;
use Barryvdh\DomPDF\Facade\Pdf;

class FichaPDFController extends Controller
{
    public function generate($id)
    {
        $persona = Persona::with(['estudios', 'experienciasLaborales', 'referenciasLaborales', 'contactos'])->findOrFail($id);

        $relativePath = ltrim($persona->url_foto, '/');
        $relativePath = str_replace('storage/', '', $relativePath); 

        $data = [
            'persona' => $persona,
            'foto_url' => $persona->url_foto ? asset('storage/' . $relativePath) : null,
        ];


        $pdf = Pdf::loadView('pdf.ficha_personal', $data);
        $pdf->setPaper('letter', 'portrait');
        return $pdf->stream('ficha_personal.pdf');
    }
}