import React, { useState, useRef, useEffect } from 'react';

export default function FileUpload({ 
    label, 
    name, 
    value, 
    onChange, 
    error, 
    accept = 'image/*', 
    required = false,
    className = '',
    ...props 
}) {
    // Si 'value' es un objeto File (Inertia), no se puede meter directo a un <img src>.
    // Controlamos el estado inicial de la preview de forma segura.
    const [preview, setPreview] = useState(() => {
        if (typeof value === 'string') return value;
        if (value instanceof File) return URL.createObjectURL(value);
        return '';
    });
    
    const fileInputRef = useRef(null);

    // Sincroniza la previsualización si el formulario es reseteado desde el padre
    useEffect(() => {
        if (!value) {
            setPreview('');
        } else if (typeof value === 'string') {
            setPreview(value);
        }
    }, [value]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // OPTIMIZACIÓN REACT 19: Generación síncrona y eficiente de preview en memoria
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        // Envía el archivo puro al handler del padre (Inertia necesita el objeto File nativo)
        if (onChange) {
            onChange({
                target: {
                    name: name,
                    value: file,
                },
            });
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div className="flex items-center space-x-4">
                {preview && (
                    <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300 shadow-sm bg-gray-50">
                        <img src={preview} alt="Vista previa" className="w-full h-full object-cover" />
                    </div>
                )}
                <button
                    type="button"
                    onClick={triggerFileInput}
                    className="px-4 py-2 bg-gray-100 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition cursor-pointer"
                >
                    {preview ? 'Cambiar foto' : 'Subir foto'}
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    name={name}
                    accept={accept}
                    onChange={handleFileChange}
                    required={required}
                    className="hidden"
                    {...props}
                />
            </div>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}
