<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // RateLimiter::for('login', function (Request $request) {
        //     return Limit::perMinute(5)->by($request->ip())->response(function () {
        //         throw ValidationException::withMessages([
        //             'throttle' => 'Límite de intentos de inicio de sesión excedido. Por favor, espere un momento.',
        //         ]);
        //     });
        // });     


        // RateLimiter::for('registro', function (Request $request) {
        //     return Limit::perMinute(5)->by($request->ip())->response(function () {
        //         return response()->json([
        //             'message' => 'Límite de solicitudes de registro excedido. Por favor, espere un momento.'
        //         ], 429);
        //     });
        // });
    }
}
