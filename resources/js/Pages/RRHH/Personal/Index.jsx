import React from 'react';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '../../../Components/Layouts/AuthenticatedLayout';
import Table from '../../../Components/Tables/Table';
import Pagination from '../../../Components/Tables/Pagination';
import SearchBar from '../../../Components/Shared/SearchBar';
import PersonalTableRow from './components/PersonalTableRow';

export default function PersonalIndex({ personal, filters, user }) {
    const headers = ['Paterno', 'Materno', 'Nombres', 'CI', 'Expedición', 'Email', 'Celular', 'Cargo', 'Acciones'];

    return (
        <AuthenticatedLayout user={user}>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Lista de Personal</h1>

            <SearchBar initialSearch={filters.search || ''} url="/rrhh/personal" />

            <Table headers={headers}>
                {personal.data.map((persona) => (
                    <PersonalTableRow key={persona.id} persona={persona} />
                ))}
            </Table>

            <Pagination
                currentPage={personal.current_page}
                lastPage={personal.last_page}
                url="/rrhh/personal"
            />
        </AuthenticatedLayout>
    );
}