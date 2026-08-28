import React, { memo, useCallback } from 'react';
import Input from '../../../Components/Forms/Input';
import Select from '../../../Components/Forms/Select';
import Button from '../../../Components/Forms/Button';
import Card from '../../../Components/Forms/Card';

const TIPO_ESTUDIO_OPTIONS = [
    { value: 'Diplomado', label: 'Diplomado' },
    { value: 'Especialización', label: 'Especialización' },
    { value: 'Maestría', label: 'Maestría' },
    { value: 'Licenciatura', label: 'Licenciatura' },
    { value: 'Técnico', label: 'Técnico' },
    { value: 'Bachillerato', label: 'Bachillerato' },
];


const EstudioRow = memo(({ item, index, showRemove, onFieldChange, onRemove, errors }) => {
    const baseName = `estudios.${index}`;

    return (
        <div className="border-b border-gray-100 pb-5 mb-5 last:border-0 last:pb-0 last:mb-0">
            <div className="flex justify-between items-center mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Estudio #{index + 1}
                </h4>
                {showRemove && (
                    <Button
                        type="button"
                        variant="danger"
                        onClick={() => onRemove(index)}
                        className="text-xs py-1 px-2.5"
                    >
                        Eliminar
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                <Select
                    label="Tipo"
                    id={`${baseName}.tipo`}
                    name={`${baseName}.tipo`}
                    value={item.tipo}
                    onChange={(e) => onFieldChange(index, 'tipo', e.target.value)}
                    options={TIPO_ESTUDIO_OPTIONS}
                    error={errors[`${baseName}.tipo`]}
                    required
                />

                <Input
                    label="Título Obtenido"
                    id={`${baseName}.titulo_obtenido`}
                    name={`${baseName}.titulo_obtenido`}
                    placeholder="Ej: Licenciado en Administración de Empresas"
                    value={item.titulo_obtenido}
                    onChange={(e) => onFieldChange(index, 'titulo_obtenido', e.target.value)}
                    error={errors[`${baseName}.titulo_obtenido`]}
                    required
                />

                <Input
                    label="Institución"
                    id={`${baseName}.institucion`}
                    name={`${baseName}.institucion`}
                    placeholder="Ej: Universidad Mayor de San Andrés"
                    value={item.institucion}
                    onChange={(e) => onFieldChange(index, 'institucion', e.target.value)}
                    error={errors[`${baseName}.institucion`]}
                    required
                />

                <Input
                    label="Año"
                    type="number"
                    id={`${baseName}.anio`}
                    name={`${baseName}.anio`}
                    placeholder="Año de finalización"
                    value={item.anio}
                    onChange={(e) => onFieldChange(index, 'anio', e.target.value)}
                    error={errors[`${baseName}.anio`]}
                    min="1900"
                    max={String(new Date().getFullYear() + 5)}
                    required
                />
            </div>
        </div>
    );
});

EstudioRow.displayName = 'EstudioRow';

const Paso2Estudios = memo(({ estudios = [], handleNestedChange, addItem, removeItem, errors = {} }) => {
    
    const onFieldChange = useCallback((index, field, value) => {
        handleNestedChange('estudios', index, field, value);
    }, [handleNestedChange]);

    const handleRemove = useCallback((index) => {
        removeItem('estudios', index);
    }, [removeItem]);

    const handleAddEstudio = () => {
        addItem('estudios', {
            temp_id: crypto.randomUUID(),
            tipo: '',
            titulo_obtenido: '',
            institucion: '',
            anio: new Date().getFullYear(),
        });
    };

    return (
        <Card title="Estudios Realizados">
            {estudios.map((item, index) => (
                <EstudioRow
                    key={item.temp_id || index}
                    item={item}
                    index={index}
                    showRemove={estudios.length > 1}
                    onFieldChange={onFieldChange}
                    onRemove={handleRemove}
                    errors={errors}
                />
            ))}

            <div className="mt-4">
                <Button type="button" variant="secondary" onClick={handleAddEstudio} className="text-xs">
                    + Agregar Estudio
                </Button>
            </div>
        </Card>
    );
});

Paso2Estudios.displayName = 'Paso2Estudios';
export default Paso2Estudios;