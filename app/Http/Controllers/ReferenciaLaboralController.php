<?php

namespace App\Http\Controllers;

use App\Models\ReferenciaLaboral;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\QueryException;

class ReferenciaLaboralController extends Controller
{
    public function index()
    {
        $referencias = ReferenciaLaboral::with(['persona', 'experienciaLaboral'])->paginate(15);
        return response()->json($referencias);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre_referente' => 'required|string|max:200',
            'telefono_celular' => 'required|string|max:20',
            'id_persona' => 'required|integer|exists:personas,id',
            'id_exp_lab' => 'required|integer|exists:experiencias_laborales,id_exp_lab',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $referencia = ReferenciaLaboral::create($request->all());
            return response()->json($referencia, 201);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Error al guardar: ' . $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        $referencia = ReferenciaLaboral::with(['persona', 'experienciaLaboral'])->find($id);
        if (!$referencia) {
            return response()->json(['error' => 'Referencia laboral no encontrada'], 404);
        }
        return response()->json($referencia);
    }

    public function update(Request $request, $id)
    {
        $referencia = ReferenciaLaboral::find($id);
        if (!$referencia) {
            return response()->json(['error' => 'Referencia laboral no encontrada'], 404);
        }

        $validator = Validator::make($request->all(), [
            'nombre_referente' => 'sometimes|required|string|max:200',
            'telefono_celular' => 'sometimes|required|string|max:20',
            'id_persona' => 'sometimes|required|integer|exists:personas,id',
            'id_exp_lab' => 'sometimes|required|integer|exists:experiencias_laborales,id_exp_lab',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $referencia->update($request->all());
            return response()->json($referencia);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Error al actualizar: ' . $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        $referencia = ReferenciaLaboral::find($id);
        if (!$referencia) {
            return response()->json(['error' => 'Referencia laboral no encontrada'], 404);
        }
        $referencia->delete();
        return response()->json(['message' => 'Referencia laboral eliminada correctamente']);
    }
}