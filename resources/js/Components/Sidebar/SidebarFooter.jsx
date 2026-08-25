import React from 'react';

export default function SidebarFooter({ user, onLogout }) {
    
    const iniciales = `${user?.nombre?.[0] || 'U'}${user?.paterno?.[0] || ''}`.toUpperCase();

    return (
        <div className="p-4 border-t border-gray-100 bg-gray-50/40">
            <div className="flex items-center justify-between gap-3">
                {/* Bloque de Identidad */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                    {/* Avatar Geométrico Estilo Corporativo Minimalista */}
                    <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-semibold tracking-wider shrink-0 shadow-xs">
                        {iniciales}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-gray-900 truncate">
                            {user?.nombre} {user?.paterno}
                        </p>
                        <p className="text-[11px] text-gray-400 truncate mt-0.5">
                            {user?.email}
                        </p>
                    </div>
                </div>

                {/* Botón de Salida con Ícono Intuitivo */}
                <button
                    onClick={onLogout}
                    title="Cerrar sesión"
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 shrink-0 cursor-pointer group"
                >
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
