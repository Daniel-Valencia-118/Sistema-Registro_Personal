import React from 'react';
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

export default function Paso1DatosGenerales({ form, handleChange, handleFileChange, errors }) {
    const err = errors || {};

    return (
        <Card title="Datos Personales y Ubicación">
            {/* Grid nativo optimizado con espaciados de Tailwind v4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                <Input
                    label="Apellido Paterno"
                    name="paterno"
                    placeholder="Ingrese su apellido paterno"
                    value={form.paterno}
                    onChange={handleChange}
                    error={err.paterno}
                />
                <Input
                    label="Apellido Materno"
                    name="materno"
                    placeholder="Ingrese su apellido materno"
                    value={form.materno}
                    onChange={handleChange}
                    error={err.materno}
                />
                <Input
                    label="Nombres"
                    name="nombres"
                    placeholder="Ingrese sus nombres"
                    value={form.nombres}
                    onChange={handleChange}
                    error={err.nombres}
                    required
                />
                <Input
                    label="CI"
                    name="ci"
                    placeholder="Ingrese su número de Carnet de Identidad"
                    value={form.ci}
                    onChange={handleChange}
                    error={err.ci}
                    required
                />
                <Input
                    label="Expedición (Ej: LP)"
                    name="ci_expedicion"
                    placeholder="Ingrese el lugar de expedición del CI"
                    value={form.ci_expedicion}
                    onChange={handleChange}
                    error={err.ci_expedicion}
                    required
                />
                <Select
                    label="Sexo"
                    name="sexo"
                    value={form.sexo}
                    onChange={handleChange}
                    options={SEXO_OPTIONS}
                    error={err.sexo}
                    required
                />
                <Input
                    label="Fecha de Nacimiento"
                    name="fecha_nacimiento"
                    type="date"
                    value={form.fecha_nacimiento}
                    onChange={handleChange}
                    error={err.fecha_nacimiento}
                    required
                />
                <Input
                    label="Provincia de Nacimiento"
                    name="lugar_nacimiento_provincia"
                    placeholder="Ingrese la provincia de nacimiento"
                    value={form.lugar_nacimiento_provincia}
                    onChange={handleChange}
                    error={err.lugar_nacimiento_provincia}
                />
                <Input
                    label="Ciudad de Nacimiento"
                    name="lugar_nacimiento_ciudad"
                    placeholder="Ingrese la ciudad de nacimiento"
                    value={form.lugar_nacimiento_ciudad}
                    onChange={handleChange}
                    error={err.lugar_nacimiento_ciudad}
                />
                <Select
                    label="Estado Civil"
                    name="estado_civil"
                    value={form.estado_civil}
                    onChange={handleChange}
                    options={ESTADO_CIVIL_OPTIONS}
                    error={err.estado_civil}
                />
                <Input
                    label="Número de Hijos"
                    name="numero_hijos"
                    type="number"
            
                    value={form.numero_hijos}
                    onChange={handleChange}
                    error={err.numero_hijos}
                />
                <Input
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Ej: usuario@dominio.com"
                    value={form.email}
                    onChange={handleChange}
                    error={err.email}
                    required
                />
                <Input
                    label="Teléfono"
                    name="telefono"
                    placeholder="Ingrese su número de teléfono"
                    value={form.telefono}
                    onChange={handleChange}
                    error={err.telefono}
                />
                <Input
                    label="Celular"
                    name="celular"
                    placeholder="Ingrese su número de celular"
                    value={form.celular}
                    onChange={handleChange}
                    error={err.celular}
                    required
                />
                <Input
                    label="Dirección Actual"
                    name="direccion_actual"
                    placeholder="Ej: Calle Falsa 123, Zona, #123"
                    value={form.direccion_actual}
                    onChange={handleChange}
                    error={err.direccion_actual}
                    required
                />
                <Input
                    label="Fecha Ingreso Fundación"
                    name="fecha_ingreso_fundacion"
                    type="date"
                    value={form.fecha_ingreso_fundacion}
                    onChange={handleChange}
                    error={err.fecha_ingreso_fundacion}
                />
                <Input
                    label="Cargo Actual"
                    name="cargo_actual"
                    placeholder="Ingrese su cargo actual en la fundación"
                    value={form.cargo_actual}
                    onChange={handleChange}
                    error={err.cargo_actual}
                />
            </div>

            {/* Separador estático limpio */}
            <div className="mt-5 border-t border-gray-100 pt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FileUpload
                        label="Foto de Perfil"
                        name="foto"
                        value={form.foto}
                        onChange={handleFileChange}
                        error={err.foto}
                    />
                    {/* <MapPicker
                        label="Croquis (URL de Google Maps)"
                        name="url_croquis"
                        value={form.url_croquis}
                        onChange={handleChange}
                        error={err.url_croquis}
                    /> */}
                </div>
            </div>
        </Card>
    );
}
