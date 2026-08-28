import React, { useMemo, useCallback, memo } from 'react';
import Input from '../../../Components/Forms/Input';
import Select from '../../../Components/Forms/Select';
import Button from '../../../Components/Forms/Button';
import Card from '../../../Components/Forms/Card';

const ExperienciaItem = memo(function ExperienciaItem({
    item,
    index,
    canDelete,
    onFieldChange,
    removeItem,
    error = {}
}) {
    const baseName = `experiencias-${index}`;

    return (
        <div className="border-b border-gray-100 pb-5 mb-5 last:border-0 last:pb-0 last:mb-0">
            <div className="flex justify-between items-center mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Experiencia #{index + 1}
                </h4>
                {canDelete && (
                    <Button
                        type="button"
                        variant="danger"
                        onClick={() => removeItem('experiencias', index)}
                        className="text-xs py-1 px-2.5"
                    >
                        Eliminar
                    </Button>
                )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                <Input
                    label="Institución"
                    id={`${baseName}-institucion`}
                    name={`experiencias.${index}.institucion`}
                    placeholder="Ej: Empresa XYZ S.A."
                    value={item.institucion || ''}
                    onChange={(e) => onFieldChange('experiencias', index, 'institucion', e.target.value)}
                    error={error[`experiencias.${index}.institucion`]}
                    required
                />
                <Input
                    label="Cargo"
                    id={`${baseName}-cargo`}
                    name={`experiencias.${index}.cargo`}
                    placeholder="Ej: Gerente de Ventas"
                    value={item.cargo || ''}
                    onChange={(e) => onFieldChange('experiencias', index, 'cargo', e.target.value)}
                    error={error[`experiencias.${index}.cargo`]}
                    required
                />
                <Input
                    label="Fecha Inicio"
                    type="date"
                    id={`${baseName}-fecha-inicio`}
                    name={`experiencias.${index}.fecha_inicio`}
                    value={item.fecha_inicio || ''}
                    onChange={(e) => onFieldChange('experiencias', index, 'fecha_inicio', e.target.value)}
                    error={error[`experiencias.${index}.fecha_inicio`]}
                    required
                />
                <Input
                    label="Fecha Fin (opcional)"
                    type="date"
                    id={`${baseName}-fecha-fin`}
                    name={`experiencias.${index}.fecha_fin`}
                    value={item.fecha_fin || ''}
                    onChange={(e) => onFieldChange('experiencias', index, 'fecha_fin', e.target.value)}
                    error={error[`experiencias.${index}.fecha_fin`]}
                />
            </div>
        </div>
    );
});

const ReferenciaLaboralItem = memo(function ReferenciaLaboralItem({
    item,
    index,
    canDelete,
    institucionesOptions,
    onFieldChange,
    removeItem,
    error = {}
}) {
    const baseName = `referencias-${index}`;

    return (
        <div className="border-b border-gray-100 pb-5 mb-5 last:border-0 last:pb-0 last:mb-0">
            <div className="flex justify-between items-center mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Referencia #{index + 1}
                </h4>
                {canDelete && (
                    <Button
                        type="button"
                        variant="danger"
                        onClick={() => removeItem('referencias', index)}
                        className="text-xs py-1 px-2.5"
                    >
                        Eliminar
                    </Button>
                )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                <Input
                    label="Nombre del Referente"
                    id={`${baseName}-nombre`}
                    name={`referencias.${index}.nombre_referente`}
                    placeholder="Ej: Juan Pérez"
                    value={item.nombre_referente || ''}
                    onChange={(e) => onFieldChange('referencias', index, 'nombre_referente', e.target.value)}
                    error={error[`referencias.${index}.nombre_referente`]}
                    required
                />
                <Select
                    label="Institución (de la experiencia laboral)"
                    id={`${baseName}-institucion`}
                    name={`referencias.${index}.institucion`}
                    placeholder="Ingrese o seleccione la institución"
                    value={item.institucion || ''}
                    onChange={(e) => onFieldChange('referencias', index, 'institucion', e.target.value)}
                    options={institucionesOptions}
                    error={error[`referencias.${index}.institucion`]}
                    required
                />
                <Input
                    label="Teléfono / Celular"
                    id={`${baseName}-telefono`}
                    name={`referencias.${index}.telefono_celular`}
                    placeholder="Ingrese el número de contacto"
                    value={item.telefono_celular || ''}
                    onChange={(e) => onFieldChange('referencias', index, 'telefono_celular', e.target.value)}
                    error={error[`referencias.${index}.telefono_celular`]}
                    required
                />
            </div>
        </div>
    );
});

export default function Paso3ExperienciaReferencias({
    experiencias = [],
    referencias = [],
    handleNestedChange,
    addItem,
    removeItem,
    errors = {}
}) {
    const institucionesOptions = useMemo(() => {
        const unicos = new Set();
        return experiencias
            .map((exp, index) => {
                const nombre = (exp.institucion || '').trim();
                const label = nombre || `Experiencia #${index + 1}`;
                const value = nombre || `exp-${index}`;
                
                if (unicos.has(value)) return null;
                unicos.add(value);
                
                return { value, label };
            })
            .filter(Boolean);
    }, [experiencias]);

    const handleAddExperiencia = useCallback(() => {
        addItem('experiencias', {
            temp_id: crypto.randomUUID(),
            institucion: '',
            cargo: '',
            fecha_inicio: '',
            fecha_fin: ''
        });
    }, [addItem]);

    const handleAddReferencia = useCallback(() => {
        addItem('referencias', {
            temp_id: crypto.randomUUID(),
            nombre_referente: '',
            institucion: '',
            telefono_celular: ''
        });
    }, [addItem]);

    return (
        <>
            <Card title="Experiencia Laboral">
                {experiencias.map((item, index) => (
                    <ExperienciaItem
                        key={item.temp_id || `exp-${index}`}
                        item={item}
                        index={index}
                        canDelete={experiencias.length > 1}
                        onFieldChange={handleNestedChange}
                        removeItem={removeItem}
                        error={errors}
                    />
                ))}
                <div className="mt-4">
                    <Button type="button" variant="secondary" onClick={handleAddExperiencia} className="text-xs">
                        + Agregar Experiencia
                    </Button>
                </div>
            </Card>

            <Card title="Referencias Laborales" className="mt-6">
                <p className="text-xs text-gray-400 mb-4">
                    Selecciona la institución de la experiencia laboral relacionada previamente.
                </p>
                {referencias.map((item, index) => (
                    <ReferenciaLaboralItem
                        key={item.temp_id || `ref-${index}`}
                        item={item}
                        index={index}
                        canDelete={referencias.length > 1}
                        institucionesOptions={institucionesOptions}
                        onFieldChange={handleNestedChange}
                        removeItem={removeItem}
                        error={errors}
                    />
                ))}
                <div className="mt-4">
                    <Button type="button" variant="secondary" onClick={handleAddReferencia} className="text-xs">
                        + Agregar Referencia
                    </Button>
                </div>
            </Card>
        </>
    );
}