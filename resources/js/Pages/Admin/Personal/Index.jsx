import React from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Components/Layouts/AdminLayout';
import Table from '../../../Components/Tables/Table';
import Pagination from '../../../Components/Tables/Pagination';
import SearchBar from '../../../Components/Shared/SearchBar';
import Button from '../../../Components/Forms/Button';

export default function AdminPersonalIndex({ personal, filters, user }) {
    const headers = ['Paterno', 'Materno', 'Nombres', 'CI', 'Expedición', 'Email', 'Celular', 'Cargo', 'Estado', 'Acciones'];

    const handleChangeStatus = (id, newStatus) => {
        if (confirm(`¿Estás seguro de cambiar el estado a "${newStatus}"?`)) {
            router.put(`/admin/personal/${id}/estado`, { estado: newStatus }, {
                preserveState: true,
                onSuccess: () => {
                    // Recargar la página para reflejar cambios
                    router.reload();
                }
            });
        }
    };

    return (
        <AdminLayout user={user}>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Personal</h1>

            <SearchBar initialSearch={filters.search || ''} url="/admin/personal" />

            <Table headers={headers}>
                {personal.data.map((persona) => (
                    <tr key={persona.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{persona.paterno}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{persona.materno}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{persona.nombres}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{persona.ci}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{persona.ci_expedicion}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{persona.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{persona.celular}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{persona.cargo_actual}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`px-2 py-1 rounded text-xs font-medium
                                ${persona.estado === 'aprobado' ? 'bg-green-100 text-green-800' : ''}
                                ${persona.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' : ''}
                                ${persona.estado === 'rechazado' ? 'bg-red-100 text-red-800' : ''}
                                ${persona.estado === 'observado' ? 'bg-orange-100 text-orange-800' : ''}
                            `}>
                                {persona.estado}
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <Link
                                href={`/admin/personal/${persona.id}`}
                                className="text-blue-600 hover:text-blue-900"
                            >
                                Ver
                            </Link>

                            {persona.estado !== 'aprobado' && (
                                <button
                                    onClick={() => handleChangeStatus(persona.id, 'aprobado')}
                                    className="text-green-600 hover:text-green-900"
                                >
                                    Aprobar
                                </button>
                            )}

                            {persona.estado !== 'rechazado' && (
                                <button
                                    onClick={() => handleChangeStatus(persona.id, 'rechazado')}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    Rechazar
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
            </Table>

            <Pagination
                currentPage={personal.current_page}
                lastPage={personal.last_page}
                url="/admin/personal"
            />
        </AdminLayout>
    );
}