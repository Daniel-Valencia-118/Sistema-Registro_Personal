import React, { useEffect } from 'react';
import { router } from '@inertiajs/react';
import { useFormWizard } from './hooks/useFormWizard';
import Wizard from '../../Components/Wizard/Wizard';
import toast, { Toaster } from 'react-hot-toast';

import Paso1DatosGenerales from './components/Paso1DatosGenerales';
import Paso2Estudios from './components/Paso2Estudios';
import Paso3ExperienciaReferencias from './components/Paso3ExperienciaReferencias';
import Paso4Contactos from './components/Paso4Contactos';
import Paso5InformacionInstitucional from './components/Paso5InformacionInstitucional';

const initialValues = {
    cf_turnstile_response: '',
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
    oficina_actual: '',
    foto: null,
    url_croquis: '',
    latitude: null,
    longitude: null,
    estudios: [{ temp_id: crypto.randomUUID(), tipo: '', tituloObtenido: '', institucion: '', anio: new Date().getFullYear() }],
    experiencias: [{ temp_id: crypto.randomUUID(), institucion: '', cargo: '', fecha_inicio: '', fecha_fin: '' }],
    referencias: [{ temp_id: crypto.randomUUID(), nombre_referente: '', institucion: '', telefono_celular: '' }],
    contactos: [{ temp_id: crypto.randomUUID(), nombre: '', paterno: '', materno: '', parentesco_relacion: '', edad: '', telefono_celular: '', es_familiar: true }],
};

const STEP_TITLES = [
    'Datos Generales',
    'Estudios',
    'Experiencia y Referencias',
    'Contactos',
    'Información Institucional',
];


export default function RegistroPersonal() {
    const wizard = useFormWizard(initialValues);
    const { form, errors, processing, post, handleChange, handleNestedChange, handleLocationChange, addItem, removeItem } = wizard;

    useEffect(() => {
        const cantidadErrores = Object.keys(errors).length;
        
        if (cantidadErrores > 0) {
            toast.error(
                `Hay ${cantidadErrores} campo(s) inválido(s) o pendientes. Revisa las pestañas marcadas en rojo.`,
                {
                    duration: 5000, // Visible por 5 segundos
                    style: {
                        background: '#fee2e2', // Fondo rojo suave
                        color: '#991b1b',      // Texto rojo oscuro
                        border: '1px solid #fca5a5',
                    },
                }
            );
        }
    }, [errors]);

    const handleComplete = () => {
        post('/registro-personal', {
            preserveScroll: true,
            onSuccess: () => {
                router.visit('/registro-exitoso')
                toast.success('¡Registro completado con éxito! Tus datos han sido enviados para revisión.');
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Registro de Personal</h1>
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <Wizard 
                        stepTitles={STEP_TITLES} 
                        onComplete={handleComplete} 
                        isSubmitting={processing}
                        errors={errors}
                    >
                        {(currentStep) => {
                            switch (currentStep) {
                                case 0:
                                    return (
                                        <Paso1DatosGenerales
                                            form={form}
                                            handleChange={handleChange}
                                            handleFileChange={handleChange}
                                            handleLocationChange={
                                                handleLocationChange
                                            }
                                            errors={errors}
                                        />
                                    );
                                case 1:
                                    return (
                                        <Paso2Estudios
                                            estudios={form.estudios}
                                            handleNestedChange={
                                                handleNestedChange
                                            }
                                            addItem={addItem}
                                            removeItem={removeItem}
                                            errors={errors}
                                        />
                                    );
                                case 2:
                                    return (
                                        <Paso3ExperienciaReferencias
                                            experiencias={form.experiencias}
                                            referencias={form.referencias}
                                            handleNestedChange={
                                                handleNestedChange
                                            }
                                            addItem={addItem}
                                            removeItem={removeItem}
                                            errors={errors}
                                        />
                                    );
                                case 3:
                                    return (
                                        <Paso4Contactos
                                            contactos={form.contactos}
                                            handleNestedChange={
                                                handleNestedChange
                                            }
                                            addItem={addItem}
                                            removeItem={removeItem}
                                            errors={errors}
                                        />
                                    );
                                case 4:
                                    return (
                                        <Paso5InformacionInstitucional
                                            form={form}
                                            handleChange={handleChange}
                                            errors={errors}
                                        />
                                    );
                                default:
                                    return null;
                            }
                        }}
                    </Wizard>
                </div>
            </div>
            <Toaster position="top-right" reverseOrder={false} />
        </div>
    );
}