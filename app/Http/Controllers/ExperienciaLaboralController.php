<?php

namespace App\Http\Controllers;

use App\Models\ExperienciaLaboral;
use App\Models\Persona;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\QueryException;

class ExperienciaLaboralController extends Controller
{
    public function index()
    {
        $experiencias = ExperienciaLaboral::with('persona')->paginate(15);
        return response()->json($experiencias);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'institucion' => 'required|string|max:200',
            'cargo' => 'required|string|max:150',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'nullable|date|after_or_equal:fecha_inicio',
            'id_persona' => 'required|integer|exists:personas,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $experiencia = ExperienciaLaboral::create($request->all());
            return response()->json($experiencia, 201);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Error al guardar: ' . $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        $experiencia = ExperienciaLaboral::with('persona')->find($id);
        if (!$experiencia) {
            return response()->json(['error' => 'Experiencia laboral no encontrada'], 404);
        }
        return response()->json($experiencia);
    }

    public function update(Request $request, $id)
    {
        $experiencia = ExperienciaLaboral::find($id);
        if (!$experiencia) {
            return response()->json(['error' => 'Experiencia laboral no encontrada'], 404);
        }

        $validator = Validator::make($request->all(), [
            'institucion' => 'sometimes|required|string|max:200',
            'cargo' => 'sometimes|required|string|max:150',
            'fecha_inicio' => 'sometimes|required|date',
            'fecha_fin' => 'nullable|date|after_or_equal:fecha_inicio',
            'id_persona' => 'sometimes|required|integer|exists:personas,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $experiencia->update($request->all());
            return response()->json($experiencia);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Error al actualizar: ' . $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        $experiencia = ExperienciaLaboral::find($id);
        if (!$experiencia) {
            return response()->json(['error' => 'Experiencia laboral no encontrada'], 404);
        }
        $experiencia->delete();
        return response()->json(['message' => 'Experiencia laboral eliminada correctamente']);
    }
}