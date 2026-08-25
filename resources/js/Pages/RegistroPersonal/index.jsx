import React, { useState, useMemo } from 'react';
import { router } from '@inertiajs/react';
import { useFormWizard } from './hooks/useFormWizard';
import Wizard from '../../Components/Wizard/Wizard';

import Paso1DatosGenerales from './components/Paso1DatosGenerales';
import Paso2Estudios from './components/Paso2Estudios';
import Paso3ExperienciaReferencias from './components/Paso3ExperienciaReferencias';
import Paso4Contactos from './components/Paso4Contactos';

const getInitialValues = () => ({
    paterno: '',
    materno: '',
    nombres: '',
    ci: '',
    ci_expedicion: 'LP',
    sexo: 'M',
    fecha_nacimiento: '',
    lugar_nacimiento_provincia: '',
    lugar_nacimiento_ciudad: 'LA PAZ',
    estado_civil: 'SOLTERO/A',
    numero_hijos: 0,
    email: '',
    telefono: '',
    celular: '',
    direccion_actual: '',
    fecha_ingreso_fundacion: '',
    cargo_actual: '',
    foto: null,
    url_croquis: '',
    estudios: [{ temp_id: crypto.randomUUID(), tipo: '', tituloObtenido: '', institucion: '', anio: new Date().getFullYear() }],
    experiencias: [{ temp_id: crypto.randomUUID(), institucion: '', cargo: '', fecha_inicio: '', fecha_fin: '' }],
    referencias: [{ temp_id: crypto.randomUUID(), nombre_referente: '', institucion: '', telefono_celular: '' }],
    contactos: [{ temp_id: crypto.randomUUID(), nombre: '', paterno: '', materno: '', parentesco_relacion: '', edad: '', telefono_celular: '', es_familiar: true }],
});

export default function RegistroPersonal() {
    const { form, errors, setErrors, handleChange, handleFileChange, handleNestedChange, addItem, removeItem } = useFormWizard(getInitialValues());
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleComplete = () => {
        setIsSubmitting(true);
        router.post('/registro-personal', form, {
            preserveState: true,
            onError: (errs) => {
                setErrors(errs);
                setIsSubmitting(false);
            },
            onSuccess: () => router.visit('/registro-exitoso'),
            onFinish: () => setIsSubmitting(false)
        });
    };

    const steps = useMemo(() => [
        {
            title: 'Datos Generales',
            content: (
                <Paso1DatosGenerales
                    form={form}
                    handleChange={handleChange}
                    handleFileChange={handleFileChange}
                    errors={errors}
                />
            ),
        },
        {
            title: 'Estudios',
            content: (
                <Paso2Estudios
                    estudios={form.estudios}
                    handleNestedChange={handleNestedChange}
                    addItem={addItem}
                    removeItem={removeItem}
                    errors={errors}
                />
            ),
        },
        {
            title: 'Experiencia y Referencias',
            content: (
                <Paso3ExperienciaReferencias
                    experiencias={form.experiencias}
                    referencias={form.referencias}
                    handleNestedChange={handleNestedChange}
                    addItem={addItem}
                    removeItem={removeItem}
                    errors={errors}
                />
            ),
        },
        {
            title: 'Contactos',
            content: (
                <Paso4Contactos
                    contactos={form.contactos}
                    handleNestedChange={handleNestedChange}
                    addItem={addItem}
                    removeItem={removeItem}
                    errors={errors}
                />
            ),
        },
    ], [form, errors, handleChange, handleFileChange, handleNestedChange, addItem, removeItem]);

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Registro de Personal</h1>
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <Wizard steps={steps} onComplete={handleComplete} isSubmitting={isSubmitting} />
                </div>
            </div>
        </div>
    );
}