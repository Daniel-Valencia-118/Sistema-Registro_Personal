import React from 'react';

export default function Button({
    type = 'button',
    children,
    onClick,
    variant = 'primary',
    loading = false,
    className = '',
    ...props
}) {
    const variants = {
        primary: 'bg-blue-500 hover:bg-blue-700 text-white',
        secondary: 'bg-gray-500 hover:bg-gray-700 text-white',
        success: 'bg-green-500 hover:bg-green-700 text-white',
        danger: 'bg-red-500 hover:bg-red-700 text-white',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            // Asegura que no se disparen eventos si el botón está cargando
            disabled={loading} 
            className={`px-4 py-2 rounded-md font-medium transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant] ?? variants.primary} ${className}`}
            {...props}
        >
            {loading ? (
                <div className="flex items-center justify-center gap-2">
                    {/* SVG de spinner minimalista compatible con Tailwind v4 */}
                    <svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Cargando...</span>
                </div>
            ) : (
                children
            )}
        </button>
    );
}
