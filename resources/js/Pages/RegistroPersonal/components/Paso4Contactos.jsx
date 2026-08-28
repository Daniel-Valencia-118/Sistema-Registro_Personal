import React, { useMemo, useCallback, memo } from 'react';
import Input from '../../../Components/Forms/Input';
import Button from '../../../Components/Forms/Button';
import Card from '../../../Components/Forms/Card';

const ContactoItem = memo(function ContactoItem({
    item,
    globalIndex,
    displayIndex,
    titlePrefix,
    canDelete,
    handleNestedChange,
    removeItem,
    errors = {}
}) {
    const handleChange = (field, value) => {
        handleNestedChange('contactos', globalIndex, field, value);
    };

    return (
        <div className="border-b border-gray-200 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0">
            <div className="flex justify-between items-center mb-3">
                <h5 className="font-semibold text-gray-700 text-sm">
                    {titlePrefix} #{displayIndex + 1}
                </h5>
                {canDelete && (
                    <Button
                        type="button"
                        variant="danger"
                        size="sm"
                        onClick={() => removeItem('contactos', globalIndex)}
                        className="text-xs px-2 py-1"
                    >
                        Eliminar
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label="Nombre"
                    name={`contactos.${globalIndex}.nombre`}
                    placeholder="Ingrese el nombre"
                    value={item.nombre || ''}
                    onChange={(e) => handleChange('nombre', e.target.value)}
                    error={errors[`contactos.${globalIndex}.nombre`]}
                    required
                />
                <Input
                    label="Apellido Paterno"
                    name={`contactos.${globalIndex}.paterno`}
                    placeholder="Ingrese el apellido paterno"
                    value={item.paterno || ''}
                    onChange={(e) => handleChange('paterno', e.target.value)}
                    error={errors[`contactos.${globalIndex}.paterno`]}
                    required
                />
                <Input
                    label="Apellido Materno"
                    name={`contactos.${globalIndex}.materno`}
                    placeholder="Ingrese el apellido materno"
                    value={item.materno || ''}
                    onChange={(e) => handleChange('materno', e.target.value)}
                    error={errors[`contactos.${globalIndex}.materno`]}
                    required
                />
                <Input
                    label={item.es_familiar ? "Parentesco" : "Relación / Vínculo"}
                    name={`contactos.${globalIndex}.parentesco_relacion`}
                    placeholder={item.es_familiar ? "Ej: Hermano, Tío, Primo" : "Ej: Amigo, Compañero de trabajo"}
                    value={item.parentesco_relacion || ''}
                    onChange={(e) => handleChange('parentesco_relacion', e.target.value)}
                    error={errors[`contactos.${globalIndex}.parentesco_relacion`]}
                    required
                />
                <Input
                    label="Edad"
                    type="number"
                    name={`contactos.${globalIndex}.edad`}
                    value={item.edad || ''}
                    onChange={(e) => handleChange('edad', e.target.value)}
                    error={errors[`contactos.${globalIndex}.edad`]}
                    required
                />
                <Input
                    label="Teléfono / Celular"
                    name={`contactos.${globalIndex}.telefono_celular`}
                    placeholder="Ingrese el número de contacto"
                    value={item.telefono_celular || ''}
                    onChange={(e) => handleChange('telefono_celular', e.target.value)}
                    error={errors[`contactos.${globalIndex}.telefono_celular`]}
                    required
                />
            </div>
        </div>
    );
});

export default function Paso4Contactos({
    contactos = [],
    handleNestedChange,
    addItem,
    removeItem,
    errors = {}
}) {
    const { familiares, referencias } = useMemo(() => {
        const fam = [];
        const ref = [];

        contactos.forEach((item, globalIndex) => {
            const entry = { item, globalIndex };
            if (item.es_familiar) {
                fam.push(entry);
            } else {
                ref.push(entry);
            }
        });

        return { familiares: fam, referencias: ref };
    }, [contactos]);

    const handleAddContacto = useCallback((esFamiliar) => {
        addItem('contactos', {
            temp_id: crypto.randomUUID(),
            nombre: '',
            paterno: '',
            materno: '',
            parentesco_relacion: '',
            edad: '',
            telefono_celular: '',
            es_familiar: esFamiliar
        });
    }, [addItem]);

    return (
        <div className="space-y-6">
            <Card title="Información Familiar (Mínimo 1 requerida)">
                {familiares.length === 0 ? (
                    <p className="text-sm text-gray-500 italic mb-4">No ha agregado datos familiares.</p>
                ) : (
                    familiares.map(({ item, globalIndex }, idx) => (
                        <ContactoItem
                            key={item.temp_id || item.id_familiar || globalIndex}
                            item={item}
                            globalIndex={globalIndex}
                            displayIndex={idx}
                            titlePrefix="Familiar"
                            canDelete={familiares.length > 1}
                            handleNestedChange={handleNestedChange}
                            removeItem={removeItem}
                            errors={errors}
                        />
                    ))
                )}
                
                <div className="mt-4">
                    <Button 
                        type="button" 
                        variant="secondary" 
                        onClick={() => handleAddContacto(true)}
                    >
                        + Agregar Familiar
                    </Button>
                </div>
            </Card>

            <Card title="Referencias Personales (Mínimo 1 requerida)">
                {referencias.map(({ item, globalIndex }, idx) => (
                    <ContactoItem
                        key={item.temp_id || item.id_familiar || globalIndex}
                        item={item}
                        globalIndex={globalIndex}
                        displayIndex={idx}
                        titlePrefix="Referencia"
                        canDelete={referencias.length > 1}
                        handleNestedChange={handleNestedChange}
                        removeItem={removeItem}
                        errors={errors}
                    />
                ))}

                <div className="mt-4">
                    <Button 
                        type="button" 
                        variant="secondary" 
                        onClick={() => handleAddContacto(false)}
                    >
                        + Agregar Referencia Personal
                    </Button>
                </div>
            </Card>
        </div>
    );
}