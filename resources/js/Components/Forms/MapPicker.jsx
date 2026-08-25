import React from 'react';
import Input from './Input';

export default function MapPicker({ 
    label, 
    value, 
    onChange, 
    error, 
    placeholder = 'URL del croquis o coordenadas (Ej: -16.50,-68.12)',
    required = false,
    className = '',
    ...props
}) {
    
    // Función utilitaria para comprobar si hay algo escrito y ofrecer previsualización
    const obtenerLinkMapas = () => {
        if (!value) return null;
        // Si ya es una URL completa de Google Maps, la devuelve directa
        if (value.startsWith('http://') || value.startsWith('https://')) return value;
        // Si son coordenadas separadas por coma, construye el buscador dinámico
        return `https://google.com{encodeURIComponent(value)}`;
    };

    const linkMapas = obtenerLinkMapas();

    return (
        <div className={`relative ${className}`}>
            <Input
                label={label}
                name="url_croquis"
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                error={error}
                required={required}
                // Añadimos padding a la derecha si hay link para que el texto no tape el botón
                className={linkMapas ? 'pr-24' : ''} 
                {...props}
            />
            
            {/* Botón flotante interactivo de ayuda al usuario */}
            {linkMapas && !error && (
                <div className="absolute right-2 top-8.5">
                    <a
                        href={linkMapas}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-2 py-1 text-xs bg-blue-50 text-blue-600 border border-blue-200 rounded hover:bg-blue-100 transition"
                    >
                        🗺️ Ver mapa
                    </a>
                </div>
            )}
        </div>
    );
}
