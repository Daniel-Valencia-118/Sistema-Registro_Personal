import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import Input from '../../Components/Forms/Input';
import Button from '../../Components/Forms/Button';
import { Turnstile } from '@marsidev/react-turnstile';

export default function Register() {
    const SITE_KEY = import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY;
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        paterno: '',
        materno: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
    
        post('/register'); 
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Registro de Administrador
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                            label="Nombre"
                            name="nombre"
                            value={data.nombre}
                            onChange={handleChange}
                            error={errors.nombre}
                            required
                        />
                        <Input
                            label="Apellido Paterno"
                            name="paterno"
                            value={data.paterno}
                            onChange={handleChange}
                            error={errors.paterno}
                            required
                        />
                        <Input
                            label="Apellido Materno"
                            name="materno"
                            value={data.materno}
                            onChange={handleChange}
                            error={errors.paterno}
                            required
                        />
                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                            required
                        />
                    </div>

                    <Input
                        label="Contraseña"
                        name="password"
                        type="password"
                        value={data.password}
                        onChange={handleChange}
                        error={errors.password}
                        required
                    />

                    <Input
                        label="Confirmar Contraseña"
                        name="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        onChange={handleChange}
                        required
                    />

                    <div className="flex flex-col items-center justify-center pt-2">
                        <Turnstile
                            siteKey={SITE_KEY}
                            onSuccess={(token) => setData('cf_turnstile_response', token)}
                            onExpire={() => setData('cf_turnstile_response', '')}
                            onError={() => setData('cf_turnstile_response', '')}
                        />
                        {errors.cf_turnstile_response && (
                            <p className="text-xs text-red-500 mt-2">
                                {errors.cf_turnstile_response}
                            </p>
                        )}
                    </div>
                    
                    <Button type="submit" loading={processing} className="w-full mt-2">
                        Registrarse
                    </Button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    ¿Ya tienes cuenta?{' '}
                    <Link href="/login" className="text-blue-500 hover:underline">
                        Inicia Sesión
                    </Link>
                </p>
            </div>
        </div>
    );
}
