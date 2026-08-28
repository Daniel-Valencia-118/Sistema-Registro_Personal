import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import Button from '../Forms/Button';

export default function SearchBar({ initialSearch = '', url, user }) {
    const [search, setSearch] = useState(initialSearch);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(url, { search }, { preserveState: true });
    };

    const handleExport = () => {
        const queryParam = encodeURIComponent(search || '');
        window.location.href = `/personal/exportar?search=${queryParam}`;
    };

    return (
        <form onSubmit={handleSearch} className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex-1 min-w-50">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar por nombre, CI, email..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <Button type="submit" variant="primary">
                Buscar
            </Button>
            <Button type="button" variant="success" onClick={handleExport}>
                Exportar Excel
            </Button>
        </form>
    );
}