<?php

namespace App\Http\Controllers;

use App\Models\Persona;
use App\Models\ExperienciaLaboral;
use App\Models\ReferenciaLaboral;
use App\Models\Contacto;
use App\Models\Estudio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class RegistroPersonalController extends Controller
{
    public function create()
    {
        return Inertia::render('RegistroPersonal/index');
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
            'email' => 'nullable|email|max:150',
            'telefono' => 'nullable|string|max:20',
            'celular' => 'nullable|string|max:20',
            'direccion_actual' => 'nullable|string|max:255',
            'fecha_ingreso_fundacion' => 'nullable|date',
            'cargo_actual' => 'nullable|string|max:100',
            'url_croquis' => 'nullable|string|max:255',

            'estudios' => 'nullable|array',
            'estudios.*.tipo' => 'required_with:estudios.*.titulo_obtenido,estudios.*.institucion|string|max:50',
            'estudios.*.titulo_obtenido' => 'required_with:estudios.*.tipo,estudios.*.institucion|string|max:200',
            'estudios.*.institucion' => 'required_with:estudios.*.tipo,estudios.*.titulo_obtenido|string|max:200',
            'estudios.*.anio' => 'required_with:estudios.*.tipo,estudios.*.titulo_obtenido|integer|min:1900|max:' . (intval(date('Y')) + 5),

            'experiencias' => 'nullable|array',
            'experiencias.*.institucion' => 'required_with:experiencias.*.cargo,experiencias.*.fecha_inicio|string|max:200',
            'experiencias.*.cargo' => 'required_with:experiencias.*.institucion,experiencias.*.fecha_inicio|string|max:150',
            'experiencias.*.fecha_inicio' => 'required_with:experiencias.*.institucion,experiencias.*.cargo|date',
            'experiencias.*.fecha_fin' => 'nullable|date|after_or_equal:experiencias.*.fecha_inicio',

            'referencias' => 'nullable|array',
            'referencias.*.nombre_referente' => 'required_with:referencias.*.institucion,referencias.*.telefono_celular|string|max:200',
            'referencias.*.institucion' => 'required_with:referencias.*.nombre_referente,referencias.*.telefono_celular|string|max:200',
            'referencias.*.telefono_celular' => 'required_with:referencias.*.nombre_referente,referencias.*.institucion|string|max:20',

            'contactos' => 'nullable|array',
            'contactos.*.nombre' => 'required_with:contactos.*.paterno,contactos.*.parentesco_relacion|string|max:100',
            'contactos.*.paterno' => 'required_with:contactos.*.nombre,contactos.*.parentesco_relacion|string|max:100',
            'contactos.*.materno' => 'required_with:contactos.*.nombre,contactos.*.parentesco_relacion|string|max:100',
            'contactos.*.parentesco_relacion' => 'required_with:contactos.*.nombre,contactos.*.paterno|string|max:50',
            'contactos.*.edad' => 'nullable|integer|min:0',
            'contactos.*.telefono_celular' => 'required_with:contactos.*.nombre,contactos.*.parentesco_relacion|string|max:20',
            'contactos.*.es_familiar' => 'required_with:contactos.*.nombre,contactos.*.parentesco_relacion|boolean',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        DB::beginTransaction();
        try {
            $personaData = $request->only([
                'paterno', 'materno', 'nombres', 'ci', 'ci_expedicion', 'sexo',
                'fecha_nacimiento', 'lugar_nacimiento_provincia', 'lugar_nacimiento_ciudad',
                'estado_civil', 'numero_hijos', 'email', 'telefono', 'celular',
                'direccion_actual', 'fecha_ingreso_fundacion', 'cargo_actual',
                'url_croquis'
            ]);
            $personaData['estado'] = 'aprobado';

            if ($request->hasFile('foto')) {
                $path = $request->file('foto')->store('personas/fotos', 'public');
                $personaData['url_foto'] = '/storage/' . $path;
            }

            $persona = Persona::create($personaData);

            if ($request->has('estudios')) {
                foreach ($request->estudios as $estudio) {
                    Estudio::create([
                        'id_persona' => $persona->id,
                        'tipo' => $estudio['tipo'],
                        'titulo_obtenido' => $estudio['titulo_obtenido'],
                        'institucion' => $estudio['institucion'],
                        'anio' => $estudio['anio'],
                    ]);
                }
            }

            if ($request->has('experiencias')) {
                foreach ($request->experiencias as $exp) {
                    ExperienciaLaboral::create([
                        'id_persona' => $persona->id,
                        'institucion' => $exp['institucion'],
                        'cargo' => $exp['cargo'],
                        'fecha_inicio' => $exp['fecha_inicio'],
                        'fecha_fin' => $exp['fecha_fin'] ?? null,
                    ]);
                }
            }

            if ($request->has('referencias')) {
                foreach ($request->referencias as $ref) {
                    ReferenciaLaboral::create([
                        'id_persona' => $persona->id,
                        'nombre_referente' => $ref['nombre_referente'],
                        'telefono_celular' => $ref['telefono_celular'],
                    ]);
                }
            }

            if ($request->has('contactos')) {
                foreach ($request->contactos as $contacto) {
                    Contacto::create([
                        'id_persona' => $persona->id,
                        'nombre' => $contacto['nombre'],
                        'paterno' => $contacto['paterno'],
                        'materno' => $contacto['materno'],
                        'parentesco_relacion' => $contacto['parentesco_relacion'],
                        'edad' => $contacto['edad'] ?? null,
                        'telefono_celular' => $contacto['telefono_celular'],
                        'es_familiar' => $contacto['es_familiar'],
                    ]);
                }
            }

            DB::commit();

            return redirect()->route('registro.exitoso');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['general' => 'Error al guardar: ' . $e->getMessage()])->withInput();
        }
    }
}
