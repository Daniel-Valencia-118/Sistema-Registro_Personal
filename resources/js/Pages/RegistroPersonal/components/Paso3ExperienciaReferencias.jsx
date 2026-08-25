import React, { useMemo } from 'react';
import Input from '../../../Components/Forms/Input';
import Select from '../../../Components/Forms/Select';
import Button from '../../../Components/Forms/Button';
import Card from '../../../Components/Forms/Card';

export default function Paso3ExperienciaReferencias({
    experiencias = [],
    referencias = [],
    handleNestedChange,
    addItem,
    removeItem,
    errors
}) {
    // Rendimiento: Evitamos evaluar objetos alternos usando una referencia rígida si 'errors' viene nulo
    const err = errors || {};

    // RENDIMIENTO: Memoriza las opciones del selector y limpia nombres vacíos o duplicados automáticamente
    const institucionesOptions = useMemo(() => {
        const unicos = new Set();
        return experiencias
            .map((exp, index) => {
                const nombre = (exp.institucion || '').trim();
                const label = nombre || `Experiencia #{index + 1}`;
                const value = nombre || `exp-${index}`;
                
                if (unicos.has(value)) return null;
                unicos.add(value);
                
                return { value, label };
            })
            .filter(Boolean);
    }, [experiencias]);

    // Manejadores unificados para evitar la creación de funciones flecha en bucle
    const onExperienciaChange = (index, field, value) => {
        handleNestedChange('experiencias', index, field, value);
    };

    const onReferenciaChange = (index, field, value) => {
        handleNestedChange('referencias', index, field, value);
    };

    const handleAddExperiencia = () => {
        addItem('experiencias', {
            temp_id: crypto.randomUUID(),
            institucion: '',
            cargo: '',
            fecha_inicio: '',
            fecha_fin: ''
        });
    };

    const handleAddReferencia = () => {
        addItem('referencias', {
            temp_id: crypto.randomUUID(),
            nombre_referente: '',
            institucion: '',
            telefono_celular: ''
        });
    };

    return (
        <>
            <Card title="Experiencia Laboral">
                {experiencias.map((item, index) => {
                    const itemKey = item.temp_id || index;
                    const baseName = `experiencias-${index}`;

                    return (
                        <div key={itemKey} className="border-b border-gray-100 pb-5 mb-5 last:border-0 last:pb-0 last:mb-0">
                            <div className="flex justify-between items-center mb-3">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                    Experiencia #{index + 1}
                                </h4>
                                {experiencias.length > 1 && (
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
                                    value={item.institucion}
                                    onChange={(e) => onExperienciaChange(index, 'institucion', e.target.value)}
                                    error={err[`experiencias.${index}.institucion`]}
                                    required
                                />
                                <Input
                                    label="Cargo"
                                    id={`${baseName}-cargo`}
                                    name={`experiencias.${index}.cargo`}
                                    placeholder="Ej: Gerente de Ventas"
                                    value={item.cargo}
                                    onChange={(e) => onExperienciaChange(index, 'cargo', e.target.value)}
                                    error={err[`experiencias.${index}.cargo`]}
                                    required
                                />
                                <Input
                                    label="Fecha Inicio"
                                    type="date"
                                    id={`${baseName}-fecha-inicio`}
                                    name={`experiencias.${index}.fecha_inicio`}
                                    value={item.fecha_inicio}
                                    onChange={(e) => onExperienciaChange(index, 'fecha_inicio', e.target.value)}
                                    error={err[`experiencias.${index}.fecha_inicio`]}
                                    required
                                />
                                <Input
                                    label="Fecha Fin (opcional)"
                                    type="date"
                                    id={`${baseName}-fecha-fin`}
                                    name={`experiencias.${index}.fecha_fin`}
                                    value={item.fecha_fin}
                                    onChange={(e) => onExperienciaChange(index, 'fecha_fin', e.target.value)}
                                    error={err[`experiencias.${index}.fecha_fin`]}
                                />
                            </div>
                        </div>
                    );
                })}
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
                {referencias.map((item, index) => {
                    const itemKey = item.temp_id || index;
                    const baseName = `referencias-${index}`;

                    return (
                        <div key={itemKey} className="border-b border-gray-100 pb-5 mb-5 last:border-0 last:pb-0 last:mb-0">
                            <div className="flex justify-between items-center mb-3">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                    Referencia #{index + 1}
                                </h4>
                                {referencias.length > 1 && (
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
                                    value={item.nombre_referente}
                                    onChange={(e) => onReferenciaChange(index, 'nombre_referente', e.target.value)}
                                    error={err[`referencias.${index}.nombre_referente`]}
                                    required
                                />
                                <Select
                                    label="Institución (de la experiencia laboral)"
                                    id={`${baseName}-institucion`}
                                    name={`referencias.${index}.institucion`}
                                    placeholder="Ingrese o seleccione la institución"
                                    value={item.institucion}
                                    onChange={(e) => onReferenciaChange(index, 'institucion', e.target.value)}
                                    options={institucionesOptions}
                                    error={err[`referencias.${index}.institucion`]}
                                    required
                                />
                                <Input
                                    label="Teléfono / Celular"
                                    id={`${baseName}-telefono`}
                                    name={`referencias.${index}.telefono_celular`}
                                    placeholder="Ingrese el número de contacto"
                                    value={item.telefono_celular}
                                    onChange={(e) => onReferenciaChange(index, 'telefono_celular', e.target.value)}
                                    error={err[`referencias.${index}.telefono_celular`]}
                                    required
                                />
                            </div>
                        </div>
                    );
                })}
                <Button type="button" variant="secondary" onClick={handleAddReferencia}>
                    + Agregar Referencia
                </Button>
            </Card>
        </>
    );
}