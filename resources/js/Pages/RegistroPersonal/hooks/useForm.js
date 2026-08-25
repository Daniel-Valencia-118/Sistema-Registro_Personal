import { useState } from 'react';

export function useForm(initialValues) {
    const [form, setForm] = useState(initialValues);
    const [errors, setErrors] = useState({});

    // Maneja inputs planos (texto, número, etc.)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleNestedChange = (section, index, field, value) => {
        setForm((prev) => ({
            ...prev,
            [section]: prev[section].map((item, i) => 
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    // Agrega un ítem a un array
    const addItem = (section, newItem) => {
        setForm((prev) => ({
            ...prev,
            [section]: [...(prev[section] || []), newItem], // Previene errores si no existe
        }));
    };

    // Elimina un ítem de un array por su índice
    const removeItem = (section, index) => {
        setForm((prev) => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index),
        }));
    };

    const resetForm = () => {
        setForm(initialValues);
        setErrors({});
    };

    return {
        form,
        errors,
        setErrors,
        handleChange,
        handleNestedChange,
        addItem,
        removeItem,
        resetForm,
    };
}
