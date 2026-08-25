import React from 'react';
import Sidebar from '../Sidebar/Sidebar';

export default function AdminLayout({ children, user }) {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar user={user} role="admin" />
            <main className="flex-1 overflow-y-auto p-6">
                {children}
            </main>
        </div>
    );
}