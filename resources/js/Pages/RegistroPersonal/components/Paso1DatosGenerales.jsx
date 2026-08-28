import React, { memo } from 'react';
import Input from '../../../Components/Forms/Input';
import Select from '../../../Components/Forms/Select';
import FileUpload from '../../../Components/Forms/FileUpload';
import MapPicker from '../../../Components/Forms/MapPicker';
import Card from '../../../Components/Forms/Card';

const SEXO_OPTIONS = [
    { value: 'M', label: 'Masculino' },
    { value: 'F', label: 'Femenino' },
];

const ESTADO_CIVIL_OPTIONS = [
    { value: 'SOLTERO/A', label: 'Soltero/a' },
    { value: 'CASADO/A', label: 'Casado/a' },
    { value: 'DIVORCIADO/A', label: 'Divorciado/a' },
    { value: 'VIUDO/A', label: 'Viudo/a' },
    { value: 'UNION LIBRE', label: 'Unión Libre' },
];

const GENERAL_FIELDS = [
    { name: 'paterno', label: 'Apellido Paterno', placeholder: 'Ingrese su apellido paterno' },
    { name: 'materno', label: 'Apellido Materno', placeholder: 'Ingrese su apellido materno' },
    { name: 'nombres', label: 'Nombres', placeholder: 'Ingrese sus nombres', required: true },
    { name: 'ci', label: 'CI', placeholder: 'Ingrese su número de Carnet de Identidad', required: true },
    { name: 'ci_expedicion', label: 'Expedición (Ej: LP)', placeholder: 'Ingrese el lugar de expedición', required: true },
    { name: 'sexo', label: 'Sexo', type: 'select', options: SEXO_OPTIONS, required: true },
    { name: 'fecha_nacimiento', label: 'Fecha de Nacimiento', type: 'date', required: true },
    { name: 'lugar_nacimiento_provincia', label: 'Provincia de Nacimiento', placeholder: 'Ingrese la provincia' },
    { name: 'lugar_nacimiento_ciudad', label: 'Ciudad de Nacimiento', placeholder: 'Ingrese la ciudad' },
    { name: 'estado_civil', label: 'Estado Civil', type: 'select', options: ESTADO_CIVIL_OPTIONS },
    { name: 'numero_hijos', label: 'Número de Hijos', type: 'number' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Ej: usuario@dominio.com', required: true },
    { name: 'telefono', label: 'Teléfono', placeholder: 'Ingrese su número de teléfono' },
    { name: 'celular', label: 'Celular', placeholder: 'Ingrese su número de celular', required: true },
    { name: 'direccion_actual', label: 'Dirección Actual', placeholder: 'Ej: Calle Falsa 123, Zona, #123', required: true },
];

const Paso1DatosGenerales = memo(({ form, handleChange, handleLocationChange, errors = {} }) => {       
    return (
        <Card title="Datos Personales y Ubicación">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                {GENERAL_FIELDS.map((field) => {
                    if (field.type === 'select') {
                        return (
                            <Select
                                key={field.name}
                                label={field.label}
                                name={field.name}
                                value={form[field.name]}
                                onChange={handleChange}
                                options={field.options}
                                error={errors[field.name]}
                                required={field.required}
                            />
                        );
                    }

                    return (
                        <Input
                            key={field.name}
                            label={field.label}
                            name={field.name}
                            type={field.type || 'text'}
                            placeholder={field.placeholder}
                            value={form[field.name]}
                            onChange={handleChange}
                            error={errors[field.name]}
                            required={field.required}
                        />
                    );
                })}
            </div>

            <div className="mt-5 border-t border-gray-100 pt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FileUpload
                        label="Foto de Perfil"
                        name="foto"
                        value={form.foto}
                        onChange={handleChange}
                        error={errors.foto}
                    />
                </div>
            </div>

            <div className="space-y-2 mt-4">
                <label className="block font-medium text-gray-700">
                    Seleccione la ubicación en el mapa:
                </label>

                <MapPicker
                    lat={form.latitude}
                    lng={form.longitude}
                    onChange={(coords) => handleLocationChange('latitude', 'longitude', coords)}
                    height="350px"
                />

                {errors.latitude && (
                    <p className="text-red-500 text-sm">{errors.latitude}</p>
                )}
            </div>
        </Card>
    );
});

Paso1DatosGenerales.displayName = 'Paso1DatosGenerales';
export default Paso1DatosGenerales;