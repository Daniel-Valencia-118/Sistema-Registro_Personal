<?php

namespace App\Http\Controllers;

use App\Models\Estudio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\QueryException;

class EstudioController extends Controller
{
    public function index()
    {
        $estudios = Estudio::with('persona')->paginate(15);
        return response()->json($estudios);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tipo' => 'required|string|max:50',
            'titulo_obtenido' => 'required|string|max:200',
            'institucion' => 'required|string|max:200',
            'anio' => 'required|integer|min:1900|max:' . (date('Y') + 5),
            'id_persona' => 'required|integer|exists:personas,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $estudio = Estudio::create($request->all());
            return response()->json($estudio, 201);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Error al guardar: ' . $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        $estudio = Estudio::with('persona')->find($id);
        if (!$estudio) {
            return response()->json(['error' => 'Estudio no encontrado'], 404);
        }
        return response()->json($estudio);
    }

    public function update(Request $request, $id)
    {
        $estudio = Estudio::find($id);
        if (!$estudio) {
            return response()->json(['error' => 'Estudio no encontrado'], 404);
        }

        $validator = Validator::make($request->all(), [
            'tipo' => 'sometimes|required|string|max:50',
            'titulo_obtenido' => 'sometimes|required|string|max:200',
            'institucion' => 'sometimes|required|string|max:200',
            'anio' => 'sometimes|required|integer|min:1900|max:' . (date('Y') + 5),
            'id_persona' => 'sometimes|required|integer|exists:personas,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $estudio->update($request->all());
            return response()->json($estudio);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Error al actualizar: ' . $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        $estudio = Estudio::find($id);
        if (!$estudio) {
            return response()->json(['error' => 'Estudio no encontrado'], 404);
        }
        $estudio->delete();
        return response()->json(['message' => 'Estudio eliminado correctamente']);
    }
}