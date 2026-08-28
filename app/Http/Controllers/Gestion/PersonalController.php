<?php

namespace App\Http\Controllers\Gestion;

use App\Http\Controllers\Controller;
use App\Models\Persona;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\PersonalExport;

class PersonalController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $personal = Persona::with(['estudios', 'experienciasLaborales', 'referenciasLaborales', 'contactos'])
            ->when($search, function ($query, $search) {
                return $query->where(function ($q) use ($search) {
                    $q->where('nombres', 'LIKE', "%{$search}%")
                        ->orWhere('paterno', 'LIKE', "%{$search}%")
                        ->orWhere('materno', 'LIKE', "%{$search}%")
                        ->orWhere('ci', 'LIKE', "%{$search}%")
                        ->orWhere('email', 'LIKE', "%{$search}%");
                });
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        if (auth()->user()->hasRole('admin')) {
            return Inertia::render('Admin/Personal/Index', [
                'personal' => $personal,
                'filters' => ['search' => $search],
            ]);
        }

        return Inertia::render('RRHH/Personal/Index', [
            'personal' => $personal,
            'filters' => ['search' => $search],
        ]);
    }

    public function show($id)
    {
        $persona = Persona::with(['estudios', 'experienciasLaborales', 'referenciasLaborales', 'contactos'])
            ->findOrFail($id);

        return Inertia::render('ShowPersonal', [
            'persona' => $persona,
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $persona = Persona::findOrFail($id);
        $request->validate(['estado' => 'required|in:aprobado,rechazado,observado']);
        $persona->estado = $request->estado;
        $persona->save();

        return redirect()->back()->with('success', 'Estado actualizado');
    }

    public function export(Request $request)
    {
        $search = $request->input('search');
        return Excel::download(new PersonalExport($search), 'personal.xlsx');
    }
}