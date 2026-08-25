import React from 'react';

export default function UserModal({ user, isOpen, onClose }) {
    if (!isOpen || !user) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Detalle del Usuario</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-3">
                    <div><strong>ID:</strong> {user.id}</div>
                    <div><strong>Nombre:</strong> {user.nombre}</div>
                    <div><strong>Paterno:</strong> {user.paterno}</div>
                    <div><strong>Materno:</strong> {user.materno}</div>
                    <div><strong>Email:</strong> {user.email}</div>
                    <div><strong>Rol:</strong> {user.rol}</div>
                    <div>
                        <strong>Estado:</strong>
                        <span className={`ml-2 px-2 py-1 rounded text-xs font-medium
                            ${user.estado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                        `}>
                            {user.estado ? 'Activo' : 'Suspendido'}
                        </span>
                    </div>
                    <div><strong>Fecha registro:</strong> {new Date(user.created_at).toLocaleString()}</div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}