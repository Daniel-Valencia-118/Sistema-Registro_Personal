import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        paddingTop: 72,
        paddingBottom: 72,
        paddingLeft: 72,
        paddingRight: 72,
        fontFamily: 'Helvetica',
        fontSize: 8.5,
        color: '#000000',
        backgroundColor: '#FFFFFF',
    },
    
    pageNumber: {
        position: 'absolute',
        top: 36,
        right: 72,
        fontSize: 10,
        fontFamily: 'Helvetica',
        color: '#000000',
    },

    headerTable: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    headerTitleLeft: {
        width: '40%',
        fontSize: 11,
        fontFamily: 'Helvetica-Bold',
    },
    headerTitleRight: {
        width: '60%',
        textAlign: 'right',
        fontSize: 12,
        fontFamily: 'Helvetica-Bold',
        letterSpacing: 0.5,
    },

    sectionBox: {
        marginBottom: 8,
    },
    sectionTitle: {
        backgroundColor: '#e2e2e2',
        fontFamily: 'Helvetica-Bold',
        fontSize: 9,
        textAlign: 'center',
        padding: 3,
        borderWidth: 1,
        borderColor: '#555555',
        textTransform: 'uppercase',
    },
    gridTable: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#555555',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#555555',
        alignItems: 'stretch',
    },
    tableRowLast: {
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    th: {
        backgroundColor: '#f2f2f2',
        fontFamily: 'Helvetica-Bold',
        textAlign: 'center',
        padding: 3,
        fontSize: 9,
        borderRightWidth: 1,
        borderColor: '#555555',
    },
    td: {
        padding: 3,
        fontSize: 9,
        borderRightWidth: 1,
        borderColor: '#555555',
        justifyContent: 'center',
    },
    tdLast: {
        padding: 3,
        fontSize: 9,
        justifyContent: 'center',
    },
    labelCell: {
        fontFamily: 'Helvetica-Bold',
        backgroundColor: '#fafafa',
    },
    textCenter: {
        textAlign: 'center',
    },
    textEmpty: {
        fontFamily: 'Helvetica-Oblique',
        color: '#666666',
        textAlign: 'center',
        padding: 5,
    },

    photoContainer: {
        width: 105,
        height: 115,
        borderWidth: 1,
        borderColor: '#555555',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fafafa',
        marginLeft: 4,
    },
    photo: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    photoPlaceholder: {
        fontSize: 8,
        fontFamily: 'Helvetica-Oblique',
        color: '#777777',
        textAlign: 'center',
    },

    croquisBox: {
        height: 140,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#555555',
        overflow: 'hidden',
    },
    croquisImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },

    signaturesTable: {
        flexDirection: 'row',
        marginTop: 50,
        justifyContent: 'space-between',
    },
    signatureCol: {
        width: '45%',
        alignItems: 'center',
    },
    signatureLine: {
        borderTopWidth: 1,
        borderColor: '#000000',
        width: '75%',
        marginBottom: 4,
    },
    signatureText: {
        fontSize: 9,
        fontFamily: 'Helvetica-Bold',
    },
});

const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

export const FichaPersonalPDF = ({ persona, croquisImage }) => {
    const estudios = persona?.estudios || persona?.estudios_laborales || [];
    const experiencias = persona?.experiencias_laborales || persona?.experienciasLaborales || [];
    const referencias = persona?.referencias_laborales || persona?.referenciasLaborales || [];
    const contactos = persona?.contactos || [];

    const familiares = contactos.filter((c) => c.es_familiar === true || c.es_familiar === 1);
    const personales = contactos.filter((c) => c.es_familiar === false || c.es_familiar === 0);

    return (
        <Document title={`Ficha_Personal_${persona?.ci || 'documento'}`}>
            <Page size="LETTER" style={styles.page}>
                {/* Numeración de página APA */}
                <Text
                    style={styles.pageNumber}
                    render={({ pageNumber }) => `${pageNumber}`}
                    fixed
                />

                {/* Cabecera */}
                <View style={styles.headerTable}>
                    <Text style={styles.headerTitleLeft}>Fundación ALALAY</Text>
                    <Text style={styles.headerTitleRight}>FICHA PERSONAL</Text>
                </View>

                {/* Información General */}
                <View style={styles.sectionBox} wrap={false}>
                    <Text style={styles.sectionTitle}>Información General</Text>
                    <View style={{ flexDirection: 'row' }}>
                        {/* Tabla de campos */}
                        <View style={[styles.gridTable, { flex: 1 }]}>
                            <View style={styles.tableRow}>
                                <Text style={[styles.td, styles.labelCell, { width: '28%' }]}>Apellido Paterno</Text>
                                <Text style={[styles.tdLast, { width: '72%' }]}>{(persona?.paterno || '').toUpperCase()}</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.td, styles.labelCell, { width: '28%' }]}>Apellido Materno</Text>
                                <Text style={[styles.tdLast, { width: '72%' }]}>{(persona?.materno || '').toUpperCase()}</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.td, styles.labelCell, { width: '28%' }]}>Nombres</Text>
                                <Text style={[styles.tdLast, { width: '72%' }]}>{(persona?.nombres || '').toUpperCase()}</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.td, styles.labelCell, { width: '20%' }]}>C.I.</Text>
                                <Text style={[styles.td, { width: '30%' }]}>{persona?.ci} {persona?.ci_expedicion}</Text>
                                <Text style={[styles.td, styles.labelCell, { width: '20%' }]}>Sexo</Text>
                                <Text style={[styles.tdLast, { width: '30%' }]}>{(persona?.sexo || '').toUpperCase()}</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.td, styles.labelCell, { width: '20%' }]}>Teléfono</Text>
                                <Text style={[styles.td, { width: '30%' }]}>{persona?.telefono || '-'}</Text>
                                <Text style={[styles.td, styles.labelCell, { width: '20%' }]}>Celular</Text>
                                <Text style={[styles.tdLast, { width: '30%' }]}>{persona?.celular || '-'}</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.td, styles.labelCell, { width: '25%' }]}>Estado Civil</Text>
                                <Text style={[styles.td, { width: '30%' }]}>{(persona?.estado_civil || '').toUpperCase()}</Text>
                                <Text style={[styles.td, styles.labelCell, { width: '25%' }]}>Nº de Hijos</Text>
                                <Text style={[styles.tdLast, { width: '20%' }]}>{persona?.numero_hijos ?? 0}</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.td, styles.labelCell, { width: '28%' }]}>Fecha Nacimiento</Text>
                                <Text style={[styles.tdLast, { width: '72%' }]}>{formatDate(persona?.fecha_nacimiento)}</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.td, styles.labelCell, { width: '28%' }]}>Lugar Nacimiento</Text>
                                <Text style={[styles.tdLast, { width: '72%' }]}>
                                    Provincia: {persona?.lugar_nacimiento_provincia || '-'}   Ciudad: {persona?.lugar_nacimiento_ciudad || '-'}
                                </Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.td, styles.labelCell, { width: '28%' }]}>Mail Personal</Text>
                                <Text style={[styles.tdLast, { width: '72%' }]}>{persona?.email || '-'}</Text>
                            </View>
                            <View style={styles.tableRowLast}>
                                <Text style={[styles.td, styles.labelCell, { width: '28%' }]}>Domicilio actual</Text>
                                <Text style={[styles.tdLast, { width: '72%' }]}>{persona?.direccion_actual || '-'}</Text>
                            </View>
                        </View>

                        {/* Foto */}
                        <View style={styles.photoContainer}>
                            {persona?.url_foto ? (
                                <Image style={styles.photo} src={persona.url_foto} />
                            ) : (
                                <Text style={styles.photoPlaceholder}>Fotografía</Text>
                            )}
                        </View>
                    </View>
                </View>

                {/* Información Institucional */}
                <View style={styles.sectionBox} wrap={false}>
                    <Text style={styles.sectionTitle}>Información Institucional</Text>
                    <View style={styles.gridTable}>
                        <View style={styles.tableRowLast}>
                            <Text style={[styles.td, styles.labelCell, { width: '22%' }]}>Fecha Ingreso</Text>
                            <Text style={[styles.td, { width: '18%' }]}>{formatDate(persona?.fecha_ingreso_fundacion)}</Text>
                            <Text style={[styles.td, styles.labelCell, { width: '15%' }]}>Cargo</Text>
                            <Text style={[styles.td, { width: '25%' }]}>{persona?.cargo_actual || '-'}</Text>
                            <Text style={[styles.td, styles.labelCell, { width: '10%' }]}>Oficina</Text>
                            <Text style={[styles.tdLast, { width: '10%' }]}>{persona?.oficina_actual || '-'}</Text>
                        </View>
                    </View>
                </View>
                
                {/* Croquis de Domicilio */}
                {persona?.latitude && persona?.longitude && (
                <View style={styles.sectionBox} wrap={false}>
                    <Text style={styles.sectionTitle}>Croquis de Domicilio</Text>
                    <View style={styles.croquisBox}>
                        {croquisImage ? (
                            <Image style={styles.croquisImg} src={croquisImage} />
                        ) : (
                            <Text style={styles.textEmpty}>Croquis o mapa no disponible</Text>
                        )}
                    </View>
                </View>
                )}

                {/* Información Profesional */}
                <View style={styles.sectionBox} wrap={false}>
                    <Text style={styles.sectionTitle}>Información Profesional</Text>
                    <View style={styles.gridTable}>
                        {estudios.length > 0 ? (
                            <>
                                <View style={styles.tableRow}>
                                    <Text style={[styles.th, { width: '20%' }]}>Instrucción</Text>
                                    <Text style={[styles.th, { width: '45%' }]}>Título Obtenido</Text>
                                    <Text style={[styles.th, { width: '25%' }]}>Institución</Text>
                                    <Text style={[styles.th, { width: '10%', borderRightWidth: 0 }]}>Año</Text>
                                </View>
                                {estudios.map((est, i) => (
                                    <View key={i} style={i === estudios.length - 1 ? styles.tableRowLast : styles.tableRow}>
                                        <Text style={[styles.td, { width: '20%' }]}>{est.tipo}</Text>
                                        <Text style={[styles.td, { width: '45%' }]}>{est.titulo_obtenido}</Text>
                                        <Text style={[styles.td, { width: '25%' }]}>{est.institucion}</Text>
                                        <Text style={[styles.tdLast, styles.textCenter, { width: '10%' }]}>{est.anio}</Text>
                                    </View>
                                ))}
                            </>
                        ) : (
                            <Text style={styles.textEmpty}>No registra información profesional cargada.</Text>
                        )}
                    </View>
                </View>

                {/* Experiencia Laboral */}
                <View style={styles.sectionBox} wrap={false}>
                    <Text style={styles.sectionTitle}>Experiencia Laboral</Text>
                    <View style={styles.gridTable}>
                        {experiencias.length > 0 ? (
                            <>
                                <View style={styles.tableRow}>
                                    <Text style={[styles.th, { width: '40%' }]}>Institución</Text>
                                    <Text style={[styles.th, { width: '30%' }]}>Cargo</Text>
                                    <Text style={[styles.th, { width: '30%', borderRightWidth: 0 }]}>Fecha ingreso y salida</Text>
                                </View>
                                {experiencias.map((exp, i) => (
                                    <View key={i} style={i === experiencias.length - 1 ? styles.tableRowLast : styles.tableRow}>
                                        <Text style={[styles.td, { width: '40%' }]}>{exp.institucion}</Text>
                                        <Text style={[styles.td, { width: '30%' }]}>{exp.cargo}</Text>
                                        <Text style={[styles.tdLast, styles.textCenter, { width: '30%' }]}>
                                            {formatDate(exp.fecha_inicio)} - {exp.fecha_fin ? formatDate(exp.fecha_fin) : 'Actualidad'}
                                        </Text>
                                    </View>
                                ))}
                            </>
                        ) : (
                            <Text style={styles.textEmpty}>No registra experiencia laboral.</Text>
                        )}
                    </View>
                </View>

                {/* Referencias Laborales */}
                <View style={styles.sectionBox} wrap={false}>
                    <Text style={styles.sectionTitle}>Referencias Laborales</Text>
                    <View style={styles.gridTable}>
                        {referencias.length > 0 ? (
                            <>
                                <View style={styles.tableRow}>
                                    <Text style={[styles.th, { width: '40%' }]}>Institución</Text>
                                    <Text style={[styles.th, { width: '35%' }]}>Nombre</Text>
                                    <Text style={[styles.th, { width: '25%', borderRightWidth: 0 }]}>Teléfono / Celular</Text>
                                </View>
                                {referencias.map((ref, i) => (
                                    <View key={i} style={i === referencias.length - 1 ? styles.tableRowLast : styles.tableRow}>
                                        <Text style={[styles.td, { width: '40%' }]}>
                                            {ref.institucion || (ref.experiencia_laboral ? ref.experiencia_laboral.institucion : 'N/A')}
                                        </Text>
                                        <Text style={[styles.td, { width: '35%' }]}>{ref.nombre_referente}</Text>
                                        <Text style={[styles.tdLast, styles.textCenter, { width: '25%' }]}>{ref.telefono_celular}</Text>
                                    </View>
                                ))}
                            </>
                        ) : (
                            <Text style={styles.textEmpty}>No registra referencias laborales.</Text>
                        )}
                    </View>
                </View>

                {/* Datos Familiares */}
                <View style={styles.sectionBox} wrap={false}>
                    <Text style={styles.sectionTitle}>Datos familiares</Text>
                    <View style={styles.gridTable}>
                        {familiares.length > 0 ? (
                            <>
                                <View style={styles.tableRow}>
                                    <Text style={[styles.th, { width: '50%' }]}>Nombre</Text>
                                    <Text style={[styles.th, { width: '30%' }]}>Parentesco</Text>
                                    <Text style={[styles.th, { width: '20%', borderRightWidth: 0 }]}>Edad</Text>
                                </View>
                                {familiares.map((fam, i) => (
                                    <View key={i} style={i === familiares.length - 1 ? styles.tableRowLast : styles.tableRow}>
                                        <Text style={[styles.td, { width: '50%' }]}>{`${fam.nombre || ''} ${fam.paterno || ''} ${fam.materno || ''}`}</Text>
                                        <Text style={[styles.td, styles.textCenter, { width: '30%' }]}>{fam.parentesco_relacion}</Text>
                                        <Text style={[styles.tdLast, styles.textCenter, { width: '20%' }]}>{fam.edad || '-'}</Text>
                                    </View>
                                ))}
                            </>
                        ) : (
                            <Text style={styles.textEmpty}>No registra datos familiares.</Text>
                        )}
                    </View>
                </View>

                {/* Referencias Personales */}
                <View style={styles.sectionBox} wrap={false}>
                    <Text style={styles.sectionTitle}>Referencias Personales (Al menos 3 referencias)</Text>
                    <View style={styles.gridTable}>
                        {personales.length > 0 ? (
                            <>
                                <View style={styles.tableRow}>
                                    <Text style={[styles.th, { width: '45%' }]}>Nombre</Text>
                                    <Text style={[styles.th, { width: '30%' }]}>Parentesco / Relación</Text>
                                    <Text style={[styles.th, { width: '25%', borderRightWidth: 0 }]}>Teléfono / Celular</Text>
                                </View>
                                {personales.map((per, i) => (
                                    <View key={i} style={i === personales.length - 1 ? styles.tableRowLast : styles.tableRow}>
                                        <Text style={[styles.td, { width: '45%' }]}>{`${per.nombre || ''} ${per.paterno || ''} ${per.materno || ''}`}</Text>
                                        <Text style={[styles.td, styles.textCenter, { width: '30%' }]}>{per.parentesco_relacion}</Text>
                                        <Text style={[styles.tdLast, styles.textCenter, { width: '25%' }]}>{per.telefono_celular}</Text>
                                    </View>
                                ))}
                            </>
                        ) : (
                            <Text style={styles.textEmpty}>No registra referencias personales.</Text>
                        )}
                    </View>
                </View>

                {/* Firmas */}
                <View style={styles.signaturesTable} wrap={false}>
                    <View style={styles.signatureCol}>
                        <View style={styles.signatureLine} />
                        <Text style={styles.signatureText}>Firma del Postulante</Text>
                    </View>
                    <View style={styles.signatureCol}>
                        <View style={styles.signatureLine} />
                        <Text style={styles.signatureText}>V°B° Talento Humano</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};