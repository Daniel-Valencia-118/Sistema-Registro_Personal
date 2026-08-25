<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckRoleAndStatus
{
    /**
     * Maneja la petición entrante.
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login');
        }

        if ((int) $user->estado !== 1) {
            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return redirect()->route('login')->withErrors([
                'email' => 'Su cuenta se encuentra suspendida. Contacte al administrador.'
            ]);
        }


        if (!empty($roles) && !in_array($user->rol, $roles)) {
            abort(403, 'Acceso no autorizado a esta sección.');
        }

        return $next($request);
    }
}
