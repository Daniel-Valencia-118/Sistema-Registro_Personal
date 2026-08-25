import React from 'react';
import { router } from '@inertiajs/react';

export default function Pagination({ links, currentPage, lastPage, url }) {
    const pages = [];
    for (let i = 1; i <= lastPage; i++) {
        pages.push(i);
    }

    const goToPage = (page) => {
        if (page < 1 || page > lastPage || page === currentPage) return;
        router.get(url, { page }, { preserveState: true });
    };

    return (
        <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-700">
                Mostrando página {currentPage} de {lastPage}
            </div>
            <div className="flex space-x-1">
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Anterior
                </button>
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-3 py-1 border rounded ${page === currentPage ? 'bg-blue-500 text-white' : ''}`}
                    >
                        {page}
                    </button>
                ))}
                <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === lastPage}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}