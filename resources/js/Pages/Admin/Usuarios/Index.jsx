import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AdminLayout from '../../../Components/Layouts/AdminLayout';
import Table from '../../../Components/Tables/Table';
import Pagination from '../../../Components/Tables/Pagination';
import SearchBar from '../../../Components/Shared/SearchBar';
import UserModal from './components/UserModal';

export default function AdminUsuariosIndex({ usuarios, filters, user }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const headers = ['Nombre', 'Paterno', 'Materno', 'Email', 'Rol', 'Estado', 'Acciones'];

    const handleToggleStatus = (id, currentStatus) => {
        const newStatus = !currentStatus;
        if (confirm(`¿Estás seguro de ${newStatus ? 'activar' : 'suspender'} este usuario?`)) {
            router.put(`/admin/usuarios/${id}/estado`, { estado: newStatus }, {
                preserveState: true,
                onSuccess: () => router.reload()
            });
        }
    };

    const handleViewUser = (usuario) => {
        setSelectedUser(usuario);
        setShowModal(true);
    };

    return (
        <AdminLayout user={user}>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Usuarios</h1>

            <SearchBar initialSearch={filters.search || ''} url="/admin/usuarios" />

            <Table headers={headers}>
                {usuarios.data.map((usuario) => (
                    <tr key={usuario.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{usuario.nombre}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{usuario.paterno}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{usuario.materno}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{usuario.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <span className={`px-2 py-1 rounded text-xs font-medium
                                ${usuario.rol === 'superadmin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}
                            `}>
                                {usuario.rol}
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`px-2 py-1 rounded text-xs font-medium
                                ${usuario.estado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                            `}>
                                {usuario.estado ? 'Activo' : 'Suspendido'}
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button
                                onClick={() => handleViewUser(usuario)}
                                className="text-blue-600 hover:text-blue-900"
                            >
                                Ver
                            </button>
                            <button
                                onClick={() => handleToggleStatus(usuario.id, usuario.estado)}
                                className={`${usuario.estado ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                            >
                                {usuario.estado ? 'Suspender' : 'Activar'}
                            </button>
                        </td>
                    </tr>
                ))}
            </Table>

            <Pagination
                currentPage={usuarios.current_page}
                lastPage={usuarios.last_page}
                url="/admin/usuarios"
            />

            {/* Modal para ver usuario */}
            <UserModal
                user={selectedUser}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
        </AdminLayout>
    );
}