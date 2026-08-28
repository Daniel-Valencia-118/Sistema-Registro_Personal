import React, { useEffect } from 'react';

// Clases globales para el modo claro
const BACKDROP_CLASSES = "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-200 animate-fade-in";
const MODAL_CONTAINER_CLASSES = "bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-auto transform transition-all scale-100 overflow-hidden border border-gray-200";
const CLOSE_BTN_CLASSES = "text-gray-400 hover:text-gray-600 rounded-lg p-1 hover:bg-gray-100 transition-colors focus:outline-hidden focus:ring-2 focus:ring-gray-300";
const ACTION_BTN_CLASSES = "px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors cursor-pointer text-sm focus:outline-hidden focus:ring-2 focus:ring-gray-400 focus:ring-offset-2";

const DetailRow = ({ label, value }) => {
    if (value === undefined || value === null || value === '') return null;
    return (
        <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-200 last:border-0 text-sm">
            <span className="font-semibold text-gray-600">{label}</span>
            <span className="text-gray-800 text-left sm:text-right mt-0.5 sm:mt-0 font-medium">
                {value}
            </span>
        </div>
    );
};

export default function UserModal({ user, isOpen, onClose }) {
    if (!isOpen || !user) return null;

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    const formattedDate = user.created_at 
        ? new Date(user.created_at).toLocaleString(undefined, { 
            dateStyle: 'medium', 
            timeStyle: 'short' 
          }) 
        : 'N/A';

    return (
        <div 
            className={BACKDROP_CLASSES} 
            onClick={handleBackdropClick}
            aria-modal="true"
            role="dialog"
        >
            <div className={MODAL_CONTAINER_CLASSES}>
                {/* Cabecera */}
                <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900">
                        Detalle del Usuario
                    </h2>
                    <button
                        onClick={onClose}
                        className={CLOSE_BTN_CLASSES}
                        aria-label="Cerrar modal"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Contenido / Listado de Detalles */}
                <div className="space-y-1 my-4">
                    <DetailRow label="ID" value={user.id} />
                    <DetailRow label="Nombre Completo" value={`${user.nombre} ${user.paterno} ${user.materno}`} />
                    <DetailRow label="Email" value={user.email} />
                    <DetailRow label="Rol" value={user.rol} />
                    
                    {/* Fila de Estado con lógica adaptada al modo claro */}
                    <div className="flex justify-between py-2 border-b border-gray-200 text-sm">
                        <span className="font-semibold text-gray-600">Estado</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide border
                            ${user.estado 
                                ? 'bg-green-50 text-green-700 border-green-200' 
                                : 'bg-red-50 text-red-700 border-red-200'
                            }
                        `}>
                            {user.estado ? 'Activo' : 'Suspendido'}
                        </span>
                    </div>

                    <DetailRow label="Fecha de Registro" value={formattedDate} />
                </div>

                {/* Pie de página */}
                <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className={ACTION_BTN_CLASSES}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}
