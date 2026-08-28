import React, { memo } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import Input from '../../../Components/Forms/Input';
import Card from '../../../Components/Forms/Card';

const SITE_KEY = import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY;

const INSTITUTIONAL_FIELDS = [
    { 
        name: 'fecha_ingreso_fundacion', 
        label: 'Fecha Ingreso Fundación', 
        type: 'date',
        error: 'Ingrese la fecha de ingreso a la fundación',
        required: true 
    },
    { 
        name: 'cargo_actual', 
        label: 'Cargo Actual', 
        placeholder: 'Ingrese su cargo actual en la fundación',
        required: true 
    },
    { 
        name: 'oficina_actual', 
        label: 'Oficina Actual', 
        placeholder: 'Ej: Oficina Central - La Paz, etc.',
        required: true 
    },
];

const Paso5InformacionInstitucional = memo(({ form, handleChange, errors = {} }) => {    
    return (
        <Card title="Información Institucional">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                {INSTITUTIONAL_FIELDS.map((field) => (
                    <Input
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        type={field.type || 'text'}
                        placeholder={field.placeholder}
                        value={form[field.name] || ''} // Previene advertencias de inputs no controlados si viene undefined
                        onChange={handleChange}
                        error={errors[field.name]}
                        required={field.required}
                    />
                ))}
            </div>
            <div className="flex flex-col items-center justify-center my-4">
                <Turnstile
                    siteKey={SITE_KEY}
                    onSuccess={(token) => handleChange('cf_turnstile_response', token)}
                    onExpire={() => handleChange('cf_turnstile_response', '')}
                    onError={() => handleChange('cf_turnstile_response', '')}
                    options={{
                        theme: 'light',
                        size: 'normal',
                    }}
                />
                {errors.cf_turnstile_response && (
                    <p className="text-xs text-red-500 mt-2 font-medium">
                        {errors.cf_turnstile_response}
                    </p>
                )}
            </div>
        </Card>
    );
});

Paso5InformacionInstitucional.displayName = 'Paso5InformacionInstitucional';
export default Paso5InformacionInstitucional;