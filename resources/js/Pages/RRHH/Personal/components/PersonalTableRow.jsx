import React from 'react';
import { Link } from '@inertiajs/react';

export default function PersonalTableRow({ persona }) {
    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{persona.paterno}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{persona.materno}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{persona.nombres}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{persona.ci}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{persona.ci_expedicion}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{persona.email}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{persona.celular}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{persona.cargo_actual}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link
                    href={`/rrhh/personal/${persona.id}`}
                    className="text-blue-600 hover:text-blue-900"
                >
                    Ver datos
                </Link>
            </td>
        </tr>
    );
}