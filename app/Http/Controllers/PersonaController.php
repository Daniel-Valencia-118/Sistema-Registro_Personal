<?php

namespace App\Http\Controllers;

use App\Models\Persona;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\QueryException;
use Inertia\Inertia;

class PersonaController extends Controller
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

        return Inertia::render('Admin/Personal/Index', [
            'personal' => $personal,
            'filters' => ['search' => $search],
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'paterno' => 'required|string|max:100',
            'materno' => 'required|string|max:100',
            'nombres' => 'required|string|max:150',
            'ci' => 'required|string|max:15|unique:personas,ci',
            'ci_expedicion' => 'required|string|max:10',
            'sexo' => 'required|string|max:15',
            'fecha_nacimiento' => 'required|date',
            'lugar_nacimiento_provincia' => 'nullable|string|max:100',
            'lugar_nacimiento_ciudad' => 'nullable|string|max:100',
            'estado_civil' => 'nullable|string|max:20',
            'numero_hijos' => 'nullable|integer|min:0',
            'email' => 'nullable|email|max:150|unique:personas,email',
            'telefono' => 'nullable|string|max:20',
            'celular' => 'nullable|string|max:20',
            'direccion_actual' => 'nullable|string|max:255',
            'fecha_ingreso_fundacion' => 'nullable|date',
            'cargo_actual' => 'nullable|string|max:100',
            'url_croquis' => 'nullable|string|max:255',
            'url_foto' => 'nullable|string|max:255',
            'estado' => 'nullable|in:aprobado,observado,rechazado', // nuevo
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $data = $request->all();
            // Si no se envía estado, por defecto 'observado'
            if (!isset($data['estado'])) {
                $data['estado'] = 'observado';
            }
            $persona = Persona::create($data);
            return response()->json($persona, 201);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Error al guardar: ' . $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $persona = Persona::find($id);
        if (!$persona) {
            return response()->json(['error' => 'Persona no encontrada'], 404);
        }

        $validator = Validator::make($request->all(), [
            'paterno' => 'sometimes|required|string|max:100',
            'materno' => 'sometimes|required|string|max:100',
            'nombres' => 'sometimes|required|string|max:150',
            'ci' => 'sometimes|required|string|max:15|unique:personas,ci,' . $id,
            'ci_expedicion' => 'sometimes|required|string|max:10',
            'sexo' => 'sometimes|required|string|max:15',
            'fecha_nacimiento' => 'sometimes|required|date',
            'lugar_nacimiento_provincia' => 'nullable|string|max:100',
            'lugar_nacimiento_ciudad' => 'nullable|string|max:100',
            'estado_civil' => 'nullable|string|max:20',
            'numero_hijos' => 'nullable|integer|min:0',
            'email' => 'nullable|email|max:150|unique:personas,email,' . $id,
            'telefono' => 'nullable|string|max:20',
            'celular' => 'nullable|string|max:20',
            'direccion_actual' => 'nullable|string|max:255',
            'fecha_ingreso_fundacion' => 'nullable|date',
            'cargo_actual' => 'nullable|string|max:100',
            'url_croquis' => 'nullable|string|max:255',
            'url_foto' => 'nullable|string|max:255',
            'estado' => 'sometimes|required|in:aprobado,observado,rechazado',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $persona->update($request->all());
            return response()->json($persona);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Error al actualizar: ' . $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        $persona = Persona::with(['estudios', 'experienciasLaborales', 'referenciasLaborales', 'contactos'])
            ->findOrFail($id);

        return Inertia::render('ShowPersonal', [
            'persona' => $persona,
            'user' => auth()->user(),
        ]);
    }

    public function export(Request $request)
    {
        $search = $request->input('search');
        return Excel::download(new PersonalExport($search), 'personal.xlsx');
    }

    public function updateStatus(Request $request, $id)
    {
        $persona = Persona::findOrFail($id);
        $request->validate(['estado' => 'required|in:aprobado,rechazado,observado']);
        $persona->estado = $request->estado;
        $persona->save();

        return redirect()->back()->with('success', 'Estado actualizado');
    }

    public function destroy($id)
    {
        $persona = Persona::find($id);
        if (!$persona) {
            return response()->json(['error' => 'Persona no encontrada'], 404);
        }
        $persona->delete();
        return response()->json(['message' => 'Persona eliminada correctamente']);
    }
}