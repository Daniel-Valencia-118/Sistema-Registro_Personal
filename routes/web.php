<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\PersonaController;
use App\Http\Controllers\RegistroPersonalController;
use App\Http\Controllers\RRHH\PersonalController;
use App\Http\Controllers\RRHH\CuentaController;
use App\Http\Controllers\Admin\UsuarioController;
use App\Http\Controllers\RRHH\FichaPDFController;


Route::get('/', function () { 
    return redirect()->route('registro.personal'); 
});

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
});

Route::post('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth');

// Route::middleware(['throttle:registro'])->group(function () {
    Route::get('/registro-personal', [RegistroPersonalController::class, 'create'])->name('registro.personal');
    Route::post('/registro-personal', [RegistroPersonalController::class, 'store'])->name('registro.personal.store');
    Route::get('/registro-exitoso', function () {
        return Inertia::render('RegistroExitoso');
    })->name('registro.exitoso');
// });

Route::middleware(['auth'])->group(function () {
    Route::middleware(['auth.role:admin'])->prefix('admin')->group(function () {


        Route::get('/', function () {
            return redirect()->route('admin.personal.index');
        });


        Route::get('/personal', [PersonaController::class, 'index'])->name('admin.personal.index');
        Route::get('/personal/{id}', [PersonaController::class, 'show'])->name('admin.personal.show');
        Route::put('/personal/{id}/estado', [PersonaController::class, 'updateStatus'])->name('admin.personal.updateStatus');


        Route::get('/usuarios', [UsuarioController::class, 'index'])->name('admin.usuarios.index');
        Route::put('/usuarios/{id}/estado', [UsuarioController::class, 'updateStatus'])->name('admin.usuarios.updateStatus');


        Route::get('/cuenta', [CuentaController::class, 'index'])->name('admin.cuenta');
        Route::patch('/cuenta', [CuentaController::class, 'update'])->name('admin.cuenta.update');

    });


    Route::middleware(['auth.role:encargado'])->prefix('rrhh')->group(function () {
        
        Route::get('/', function () {
            return redirect()->route('rrhh.personal.index');
        });


        Route::get('/personal/exportar', [PersonalController::class, 'export'])->name('rrhh.personal.export');
        Route::get('/personal', [PersonalController::class, 'index'])->name('rrhh.personal.index');
        Route::get('/personal/{id}', [PersonalController::class, 'show'])->name('rrhh.personal.show');

        Route::get('/cuenta', [CuentaController::class, 'index'])->name('rrhh.cuenta');
        Route::patch('/cuenta', [CuentaController::class, 'update'])->name('rrhh.cuenta.update');

    });

    Route::middleware(['auth.role:admin,encargado'])->group(function () {
        Route::get('/personal/{id}/ficha-pdf', [FichaPDFController::class, 'generate'])->name('rrhh.personal.ficha.pdf');
    });
});