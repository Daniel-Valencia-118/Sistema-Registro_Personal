<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;

class UsuarioController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $usuarios = User::where('id', '!=', auth()->id()) // Excluir al admin actual
            ->when($search, function ($query, $search) {
                return $query->where(function ($q) use ($search) {
                    $q->where('nombre', 'LIKE', "%{$search}%")
                        ->orWhere('paterno', 'LIKE', "%{$search}%")
                        ->orWhere('materno', 'LIKE', "%{$search}%")
                        ->orWhere('email', 'LIKE', "%{$search}%");
                });
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Usuarios/Index', [
            'usuarios' => $usuarios,
            'filters' => ['search' => $search],
            'user' => auth()->user(),
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $request->validate(['estado' => 'required|boolean']);
        $user->estado = $request->estado;
        $user->save();

        return redirect()->back()->with('success', 'Estado del usuario actualizado');
    }
}