<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\RegistroPersonalController;

Route::post('/registro-personal', [RegistroPersonalController::class, 'store']);