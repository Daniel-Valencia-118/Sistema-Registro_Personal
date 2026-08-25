import { useState, useCallback } from 'react';

export function useFormWizard(initialValues) {
    const [form, setForm] = useState(initialValues);
    const [errors, setErrors] = useState({});

    // Maneja inputs simples de la raíz (Paso 1)
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }, []);

    // Maneja inputs de tipo File (Fotografías / Documentos)
    const handleFileChange = useCallback((e) => {
        const { name, files, value } = e.target;
        setForm((prev) => ({
            ...prev,
            // Extrae el archivo individual nativo compatible con el FormData de Inertia
            [name]: files && files.length > 0 ? files[0] : value, 
        }));
    }, []);

    // CORRECCIÓN CRÍTICA: Adaptabilidad total para eventos de inputs tradicionales o llamadas directas
    const handleNestedChange = useCallback((section, index, field, valueOrEvent) => {
        // Si lo que viene es un evento sintáctico de React, extraemos su value nativo
        const actualValue = (valueOrEvent && typeof valueOrEvent === 'object' && 'target' in valueOrEvent)
            ? valueOrEvent.target.value
            : valueOrEvent;

        setForm((prev) => ({
            ...prev,
            [section]: (prev[section] || []).map((item, i) =>
                i === index ? { ...item, [field]: actualValue } : item
            ),
        }));
    }, []);

    // Agrega un ítem a un array dinámico
    const addItem = useCallback((section, newItem) => {
        setForm((prev) => ({
            ...prev,
            [section]: [...(prev[section] || []), newItem],
        }));
    }, []);

    // Elimina un ítem de un array por su índice
    const removeItem = useCallback((section, index) => {
        setForm((prev) => ({
            ...prev,
            [section]: (prev[section] || []).filter((_, i) => i !== index),
        }));
    }, []);

    // CORRECCIÓN REACT 19: Eliminamos initialValues de las dependencias para evitar recreaciones infinitas
    const resetForm = useCallback(() => {
        setForm(initialValues);
        setErrors({});
    }, []); 

    return {
        form,
        errors,
        setErrors,
        handleChange,
        handleFileChange,
        handleNestedChange,
        addItem,
        removeItem,
        resetForm,
    };
}
