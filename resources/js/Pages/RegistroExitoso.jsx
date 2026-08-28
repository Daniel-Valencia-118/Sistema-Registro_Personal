import React from 'react';
import { Link } from '@inertiajs/react';

export default function RegistroExitoso() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                <h1 className="text-2xl font-bold text-green-600 mb-4">¡Registro Exitoso!</h1>
                <p className="text-gray-700 mb-6">
                    Tus datos han sido guardados correctamente. Pronto serán revisados por el administrador.
                </p>
            </div>
        </div>
    );
}