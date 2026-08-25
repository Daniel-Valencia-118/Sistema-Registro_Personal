<?php

namespace App\Http\Controllers;

use App\Models\Contacto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\QueryException;

class ContactoController extends Controller
{
    public function index()
    {
        $contactos = Contacto::with('persona')->paginate(15);
        return response()->json($contactos);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:100',
            'paterno' => 'required|string|max:100',
            'materno' => 'required|string|max:100',
            'parentesco_relacion' => 'required|string|max:50',
            'edad' => 'nullable|integer|min:0',
            'telefono_celular' => 'required|string|max:20',
            'es_familiar' => 'boolean',
            'id_persona' => 'required|integer|exists:personas,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $contacto = Contacto::create($request->all());
            return response()->json($contacto, 201);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Error al guardar: ' . $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        $contacto = Contacto::with('persona')->find($id);
        if (!$contacto) {
            return response()->json(['error' => 'Contacto no encontrado'], 404);
        }
        return response()->json($contacto);
    }

    public function update(Request $request, $id)
    {
        $contacto = Contacto::find($id);
        if (!$contacto) {
            return response()->json(['error' => 'Contacto no encontrado'], 404);
        }

        $validator = Validator::make($request->all(), [
            'nombre' => 'sometimes|required|string|max:100',
            'paterno' => 'sometimes|required|string|max:100',
            'materno' => 'sometimes|required|string|max:100',
            'parentesco_relacion' => 'sometimes|required|string|max:50',
            'edad' => 'nullable|integer|min:0',
            'telefono_celular' => 'sometimes|required|string|max:20',
            'es_familiar' => 'sometimes|boolean',
            'id_persona' => 'sometimes|required|integer|exists:personas,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $contacto->update($request->all());
            return response()->json($contacto);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Error al actualizar: ' . $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        $contacto = Contacto::find($id);
        if (!$contacto) {
            return response()->json(['error' => 'Contacto no encontrado'], 404);
        }
        $contacto->delete();
        return response()->json(['message' => 'Contacto eliminado correctamente']);
    }
}