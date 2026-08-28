<?php

namespace App\Http\Controllers\Gestion;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class CuentaController extends Controller
{
    public function index()
    {   
        $user = auth()->user();
        
        return Inertia::render('Cuenta', [
            'user' => $user
        ]);
    }

    public function update(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'paterno' => 'required|string|max:255',
            'materno' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        $user->nombre = $validated['nombre'];
        $user->paterno = $validated['paterno'];
        $user->materno = $validated['materno'];
        $user->email = $validated['email'];

        if ($validated['password']) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        if ($user->rol === 'admin') {
            return redirect()->route('admin.cuenta')->with('success', 'Datos actualizados correctamente');
        }
        return redirect()->route('rrhh.cuenta')->with('success', 'Datos actualizados correctamente');
    }
}