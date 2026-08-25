<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Http\Controllers\Controller;

class ConfiguracionController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Configuracion/Index');
    }
}