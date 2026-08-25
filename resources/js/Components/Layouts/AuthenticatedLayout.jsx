import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ children }) {
    const { auth } = usePage().props;
    const user = auth.user;

    return (
        // Usamos "group/layout" para que el Sidebar móvil pueda reaccionar al estado de un checkbox oculto
        <div className="flex h-screen bg-gray-50 text-gray-900 overflow-hidden group/layout">
            
            {/* CHECKBOX TRUCO: Controla la apertura del menú en móviles sin usar useState de React */}
            <input type="checkbox" id="sidebar-toggle" className="peer/toggle hidden" />

            {/* SIDEBAR: Componente estático ultraligero */}
            <Sidebar user={user} role={user?.rol} />

            {/* BACKDROP MÓVIL: Cierra el menú al hacer clic afuera (CSS Puro) */}
            <label 
                htmlFor="sidebar-toggle" 
                className="fixed inset-0 z-40 bg-gray-900/20 backdrop-blur-xs hidden peer-checked/toggle:block md:hidden cursor-pointer"
            />

            {/* CONTENEDOR PRINCIPAL */}
            <div className="flex flex-col flex-1 min-w-0">
                {/* TOPBAR MÓVIL: Visible únicamente en pantallas pequeñas (< 768px) */}
                <header className="h-14 bg-white border-b border-gray-100 flex items-center px-4 shrink-0 md:hidden">
                    <label 
                        htmlFor="sidebar-toggle" 
                        className="p-2 -ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </label>
                    <span className="ml-2 font-bold text-xs tracking-wider uppercase text-gray-400">Sistema</span>
                </header>

                {/* CUERPO DE LA PÁGINA */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
