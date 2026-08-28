import React, { useRef, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '../Components/Layouts/AuthenticatedLayout';
import { formatFecha } from '../../utils/dateUtils';
import MapViewer from '../Components/Forms/MapViewer';
import html2canvas from 'html2canvas-pro';
import { pdf } from '@react-pdf/renderer';
import { FichaPersonalPDF } from './PDFs/FichaPersonalPDF';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function PersonalShow({ persona }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    const basePrefix = user?.rol === 'admin' ? '/admin' : '/rrhh';
    const backUrl = `${basePrefix}/personal`;
    const pdfUrl = `${basePrefix}/personal/${persona?.id}/pdf`;

    const contactosList = persona?.contactos || [];
    const familiares = contactosList.filter((c) => Boolean(c.es_familiar));
    const referenciasPersonales = contactosList.filter((c) => !Boolean(c.es_familiar));

    const estudios = persona?.estudios || [];
    const experiencias = persona?.experiencias_laborales || persona?.experienciasLaborales || [];
    const referenciasLaborales = persona?.referencias_laborales || persona?.referenciasLaborales || [];

    const mapRef = useRef(null);
    const [generating, setGenerating] = useState(false);

    const lat = persona?.latitude ? parseFloat(persona.latitude) : -16.49558;
    const lng = persona?.longitude ? parseFloat(persona.longitude) : -68.13352;

    const handleViewPDF = async () => {
        setGenerating(true);
        try {
            let croquisBase64 = null;

            if (mapRef.current) {
                const canvas = await html2canvas(mapRef.current, {
                    useCORS: true,
                    allowTaint: true,
                    logging: false,
                });
                croquisBase64 = canvas.toDataURL('image/png');
            }

            const blob = await pdf(
                <FichaPersonalPDF persona={persona} croquisImage={croquisBase64} />
            ).toBlob();

            const url = URL.createObjectURL(blob);

            window.open(url, '_blank');

        } catch (error) {
            console.error('Error al generar PDF vectorial:', error);
        } finally {
            setGenerating(false);
        }
    };


    return (
        <AuthenticatedLayout user={user}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        {persona.nombres} {persona.paterno} {persona.materno}
                    </h1>
                    <p className="text-sm text-gray-500">
                        CI: {persona.ci} {persona.ci_expedicion} | Cargo:{" "}
                        {persona.cargo_actual || "Sin asignar"}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={handleViewPDF}
                        disabled={generating}
                        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium px-4 py-2 rounded-lg shadow transition-colors text-sm cursor-pointer mb-6"
                    >
                        <svg
                            className="w-4 h-4 fill-current"
                            viewBox="0 0 20 20"
                        >
                            <path d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" />
                        </svg>
                        {generating
                            ? "Generando Ficha PDF..."
                            : "Descargar Ficha PDF"}
                    </button>
                    <Link
                        href={backUrl}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                        ← Volver
                    </Link>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        {persona.url_foto ? (
                            <img
                                src={persona.url_foto}
                                alt={`Foto de ${persona.nombres}`}
                                className="w-42 h-42 rounded-lg object-cover border border-gray-200 shadow-sm"
                            />
                        ) : (
                            <div className="w-32 h-32 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-2xl border border-gray-200">
                                {persona.nombres?.[0]}
                                {persona.paterno?.[0]}
                            </div>
                        )}

                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                                <strong className="text-gray-500 block">
                                    Nombre Completo:
                                </strong>{" "}
                                {persona.nombres} {persona.paterno}{" "}
                                {persona.materno}
                            </div>
                            <div>
                                <strong className="text-gray-500 block">
                                    Documento de Identidad:
                                </strong>{" "}
                                {persona.ci} {persona.ci_expedicion}
                            </div>
                            <div>
                                <strong className="text-gray-500 block">
                                    Sexo:
                                </strong>{" "}
                                {persona.sexo}
                            </div>
                            <div>
                                <strong className="text-gray-500 block">
                                    Fecha de Nacimiento:
                                </strong>{" "}
                                {formatFecha(persona.fecha_nacimiento)}
                            </div>
                            <div>
                                <strong className="text-gray-500 block">
                                    Edad:
                                </strong>{" "}
                                {persona.fecha_nacimiento
                                    ? Math.floor(
                                          (new Date() -
                                              new Date(
                                                  persona.fecha_nacimiento,
                                              )) /
                                              (365.25 * 24 * 60 * 60 * 1000),
                                      )
                                    : 0}
                            </div>
                            <div>
                                <strong className="text-gray-500 block">
                                    Lugar de Nacimiento:
                                </strong>{" "}
                                {persona.lugar_nacimiento_ciudad || "-"} (
                                {persona.lugar_nacimiento_provincia || "-"})
                            </div>
                            <div>
                                <strong className="text-gray-500 block">
                                    Estado Civil:
                                </strong>{" "}
                                {persona.estado_civil}
                            </div>
                            <div>
                                <strong className="text-gray-500 block">
                                    Número de Hijos:
                                </strong>{" "}
                                {persona.numero_hijos ?? 0}
                            </div>
                            <div>
                                <strong className="text-gray-500 block">
                                    Correo Electrónico:
                                </strong>{" "}
                                {persona.email || "-"}
                            </div>
                            <div>
                                <strong className="text-gray-500 block">
                                    Teléfonos:
                                </strong>{" "}
                                Cel: {persona.celular || "-"} / Tel:{" "}
                                {persona.telefono || "-"}
                            </div>
                            <div className="md:col-span-2">
                                <strong className="text-gray-500 block">
                                    Dirección Actual:
                                </strong>{" "}
                                {persona.direccion_actual || "-"}
                            </div>
                            {/* <div>
                                <strong className="text-gray-500 block">Ubicación / Croquis:</strong>
                                {persona.url_croquis ? (
                                    <a href={persona.url_croquis} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                                        Ver Croquis Mapa
                                    </a>
                                ) : '-'}
                            </div> */}
                            <div>
                                <strong className="text-gray-500 block">
                                    Fecha Ingreso Fundación:
                                </strong>{" "}
                                {formatFecha(persona.fecha_ingreso_fundacion) ||
                                    "-"}
                            </div>
                            <div>
                                <strong className="text-gray-500 block">
                                    Cargo Actual:
                                </strong>{" "}
                                {persona.cargo_actual || "-"}
                            </div>
                            <div>
                                <strong className="text-gray-500 block">
                                    Oficina Actual:
                                </strong>{" "}
                                {persona.oficina_actual || "-"}
                            </div>
                        </div>
                    </div>
                </div>

                {persona.latitude && persona.longitude && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
                            Ubicación / Croquis
                        </h2>
                        <MapViewer
                            lat={persona.latitude || -16.495581349984814}
                            lng={persona.longitude || -68.13352637564697}
                            height="300px"
                            ref={mapRef}
                        />
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
                        Estudios y Formación Académica
                    </h2>
                    {estudios.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-600">
                                <thead className="bg-gray-50 text-gray-700 font-semibold uppercase text-xs">
                                    <tr>
                                        <th className="py-2 px-3">Tipo</th>
                                        <th className="py-2 px-3">
                                            Título Obtenido
                                        </th>
                                        <th className="py-2 px-3">
                                            Institución
                                        </th>
                                        <th className="py-2 px-3">Año</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {estudios.map((est, idx) => (
                                        <tr
                                            key={
                                                est.id_Estudio || est.id || idx
                                            }
                                        >
                                            <td className="py-2 px-3">
                                                {est.tipo}
                                            </td>
                                            <td className="py-2 px-3 font-medium text-gray-800">
                                                {est.tituloObtenido ||
                                                    est.titulo_obtenido}
                                            </td>
                                            <td className="py-2 px-3">
                                                {est.institucion}
                                            </td>
                                            <td className="py-2 px-3">
                                                {est.anio}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 italic">
                            No registra estudios cargados.
                        </p>
                    )}
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
                        Experiencia Laboral
                    </h2>
                    {experiencias.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-600">
                                <thead className="bg-gray-50 text-gray-700 font-semibold uppercase text-xs">
                                    <tr>
                                        <th className="py-2 px-3">
                                            Institución
                                        </th>
                                        <th className="py-2 px-3">Cargo</th>
                                        <th className="py-2 px-3">
                                            Fecha Inicio
                                        </th>
                                        <th className="py-2 px-3">Fecha Fin</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {experiencias.map((exp, idx) => (
                                        <tr
                                            key={
                                                exp.id_exp_lab || exp.id || idx
                                            }
                                        >
                                            <td className="py-2 px-3 font-medium text-gray-800">
                                                {exp.institucion}
                                            </td>
                                            <td className="py-2 px-3">
                                                {exp.cargo}
                                            </td>
                                            <td className="py-2 px-3">
                                                {formatFecha(exp.fecha_inicio)}
                                            </td>
                                            <td className="py-2 px-3">
                                                {formatFecha(exp.fecha_fin) ||
                                                    "Actualidad"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 italic">
                            No registra experiencias laborales.
                        </p>
                    )}
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
                        Referencias Laborales
                    </h2>
                    {referenciasLaborales.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-600">
                                <thead className="bg-gray-50 text-gray-700 font-semibold uppercase text-xs">
                                    <tr>
                                        <th className="py-2 px-3">
                                            Nombre Referente
                                        </th>
                                        <th className="py-2 px-3">
                                            Teléfono / Celular
                                        </th>
                                        <th className="py-2 px-3">
                                            Institución Asociada
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {referenciasLaborales.map((ref, idx) => (
                                        <tr
                                            key={
                                                ref.id_ref_lab || ref.id || idx
                                            }
                                        >
                                            <td className="py-2 px-3 font-medium text-gray-800">
                                                {ref.nombreReferente ||
                                                    ref.nombre_referente}
                                            </td>
                                            <td className="py-2 px-3">
                                                {ref.telefonoCelular ||
                                                    ref.telefono_celular}
                                            </td>
                                            <td className="py-2 px-3">
                                                {ref.experiencia_laboral
                                                    ?.institucion ||
                                                    ref.institucion ||
                                                    "-"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 italic">
                            No registra referencias laborales.
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
                            Familiares
                        </h2>
                        {familiares.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-gray-600">
                                    <thead className="bg-gray-50 text-gray-700 font-semibold uppercase text-xs">
                                        <tr>
                                            <th className="py-2 px-3">
                                                Nombre
                                            </th>
                                            <th className="py-2 px-3">
                                                Parentesco
                                            </th>
                                            <th className="py-2 px-3">Edad</th>
                                            <th className="py-2 px-3">
                                                Teléfono
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {familiares.map((fam, idx) => (
                                            <tr
                                                key={
                                                    fam.id_familiar ||
                                                    fam.id ||
                                                    idx
                                                }
                                            >
                                                <td className="py-2 px-3 font-medium text-gray-800">
                                                    {fam.nombre} {fam.paterno}{" "}
                                                    {fam.materno}
                                                </td>
                                                <td className="py-2 px-3">
                                                    {fam.parentesco_relacion}
                                                </td>
                                                <td className="py-2 px-3">
                                                    {fam.edad || "-"}
                                                </td>
                                                <td className="py-2 px-3">
                                                    {fam.telefonoCelular ||
                                                        fam.telefono_celular}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 italic">
                                No registra familiares.
                            </p>
                        )}
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
                            Referencias Personales
                        </h2>
                        {referenciasPersonales.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-gray-600">
                                    <thead className="bg-gray-50 text-gray-700 font-semibold uppercase text-xs">
                                        <tr>
                                            <th className="py-2 px-3">
                                                Nombre
                                            </th>
                                            <th className="py-2 px-3">
                                                Relación
                                            </th>
                                            <th className="py-2 px-3">
                                                Teléfono
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {referenciasPersonales.map(
                                            (refP, idx) => (
                                                <tr
                                                    key={
                                                        refP.id_familiar ||
                                                        refP.id ||
                                                        idx
                                                    }
                                                >
                                                    <td className="py-2 px-3 font-medium text-gray-800">
                                                        {refP.nombre}{" "}
                                                        {refP.paterno}{" "}
                                                        {refP.materno}
                                                    </td>
                                                    <td className="py-2 px-3">
                                                        {
                                                            refP.parentesco_relacion
                                                        }
                                                    </td>
                                                    <td className="py-2 px-3">
                                                        {refP.telefonoCelular ||
                                                            refP.telefono_celular}
                                                    </td>
                                                </tr>
                                            ),
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 italic">
                                No registra referencias personales.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}