import React from 'react';
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

export default function Paso2Estudios({ estudios = [], handleNestedChange, addItem, removeItem, errors = {} }) {
    
    const onFieldChange = (index, field, value) => {
        handleNestedChange('estudios', index, field, value);
    };

    const handleAddEstudio = () => {
        addItem('estudios', { 
            temp_id: crypto.randomUUID(), 
            tipo: '', 
            titulo_obtenido: '', 
            institucion: '', 
    
        });
    };

    return (
        <Card title="Estudios Realizados">
            {estudios.map((item, index) => {
                const itemKey = item.temp_id || index;
        
                const baseName = `estudios-${index}`;

                return (
                    <div key={itemKey} className="border-b border-gray-100 pb-5 mb-5 last:border-0 last:pb-0 last:mb-0">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                Estudio #{index + 1}
                            </h4>
                            {estudios.length > 1 && (
                                <Button
                                    type="button"
                                    variant="danger"
                                    onClick={() => removeItem('estudios', index)}
                                    className="text-xs py-1 px-2.5"
                                >
                                    Eliminar
                                </Button>
                            )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                            <Select
                                label="Tipo"
                                id={`${baseName}-tipo`}
                                name={`estudios.${index}.tipo`}
                                value={item.tipo}
                                onChange={(e) => onFieldChange(index, 'tipo', e.target.value)}
                                options={TIPO_ESTUDIO_OPTIONS}
                                error={errors[`estudios.${index}.tipo`]}
                                required
                            />
                            
                            <Input
                                label="Título Obtenido"
                                id={`${baseName}-titulo`}
                                name={`estudios.${index}.titulo_obtenido`}
                                placeholder="Ej: Licenciado en Administración de Empresas"
                                value={item.titulo_obtenido}
                                onChange={(e) => onFieldChange(index, 'titulo_obtenido', e.target.value)}
                                error={errors[`estudios.${index}.titulo_obtenido`]}
                                required
                            />
                            
                            <Input
                                label="Institución"
                                id={`${baseName}-institucion`}
                                name={`estudios.${index}.institucion`}
                                placeholder="Ej: Universidad Mayor de San Andrés"
                                value={item.institucion}
                                onChange={(e) => onFieldChange(index, 'institucion', e.target.value)}
                                error={errors[`estudios.${index}.institucion`]}
                                required
                            />
                            
                            <Input
                                label="Año"
                                type="number"
                                id={`${baseName}-anio`}
                                name={`estudios.${index}.anio`}
                                placeholder="Ingrese el año de finalización del estudio"
                                value={item.anio}
                                onChange={(e) => onFieldChange(index, 'anio', e.target.value)}
                                error={errors[`estudios.${index}.anio`]}
                                min="1900"
                                max={String(new Date().getFullYear() + 5)}
                                required
                            />
                        </div>
                    </div>
                );
            })}
            
            <div className="mt-4">
                <Button type="button" variant="secondary" onClick={handleAddEstudio} className="text-xs">
                    + Agregar Estudio
                </Button>
            </div>
        </Card>
    );
}
