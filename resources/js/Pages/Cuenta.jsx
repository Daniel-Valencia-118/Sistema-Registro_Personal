import React, { useEffect, useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '../Components/Layouts/AuthenticatedLayout';
import Input from '../Components/Forms/Input';
import Button from '../Components/Forms/Button';

export default function CuentaIndex({ user }) {
    const { flash } = usePage().props;
    const [notificacion, setNotificacion] = useState(null);

    const { data, setData, patch, errors, processing } = useForm({
        nombre: user.nombre || '',
        paterno: user.paterno || '',
        materno: user.materno || '',
        email: user.email || '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        if (flash?.success) {
            setNotificacion(flash.success);

            // Desaparecer la alerta automáticamente después de 4 segundos
            const timer = setTimeout(() => {
                setNotificacion(null);
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [flash]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.rol === 'admin') {
            patch('/admin/cuenta');
        } else {
            patch('/rrhh/cuenta');
        }
    };

    return (
        <AuthenticatedLayout user={user}>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Mi Cuenta</h1>

            {notificacion && (
                <div className="fixed top-5 right-5 z-50 flex items-center p-4 mb-4 text-emerald-800 rounded-lg bg-emerald-50 border border-emerald-200 shadow-xl transition-all duration-300 animate-bounce">
                    <span className="mr-2 text-lg">✅</span>
                    <div className="text-sm font-medium">{notificacion}</div>
                    <button 
                        onClick={() => setNotificacion(null)}
                        className="ml-auto mx-1.5 p-1 rounded-md hover:bg-emerald-200 text-emerald-600 cursor-pointer"
                    >
                        ✕
                    </button>
                </div>
            )}

            <div className="bg-white shadow-md rounded-lg p-6">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Nombre"
                            name="nombre"
                            value={data.nombre}
                            onChange={(e) => setData('nombre', e.target.value)}
                            error={errors.nombre}
                            required
                        />
                        <Input
                            label="Apellido Paterno"
                            name="paterno"
                            value={data.paterno}
                            onChange={(e) => setData('paterno', e.target.value)}
                            error={errors.paterno}
                            required
                        />
                        <Input
                            label="Apellido Materno"
                            name="materno"
                            value={data.materno}
                            onChange={(e) => setData('materno', e.target.value)}
                            error={errors.materno}
                            required
                        />
                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            error={errors.email}
                            required
                        />
                    </div>

                    <div className="border-t pt-4 mt-4">
                        <h3 className="text-lg font-medium mb-4">Cambiar Contraseña</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Nueva Contraseña"
                                name="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                error={errors.password}
                            />
                            <Input
                                label="Confirmar Contraseña"
                                name="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button type="submit" loading={processing}>
                            Actualizar
                        </Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}