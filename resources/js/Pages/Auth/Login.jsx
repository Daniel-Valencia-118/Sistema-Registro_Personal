import { useForm, Head, Link } from '@inertiajs/react';
import { Turnstile } from '@marsidev/react-turnstile';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
        cf_turnstile_response: '',
    });

    const SITE_KEY = import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY;  

    const submit = (e) => {
        e.preventDefault();
        post('/login', {
            onError: (err) => {
                // console.error("error: ", err);
            }
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <Head title="Iniciar Sesión" />
            
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Sistema de Fichas</h2>
                    <p className="text-sm text-gray-500 mt-1">Ingreso exclusivo para administradores y revisores</p>
                </div>

                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            placeholder="ejemplo@fundacion.org"
                            required
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            placeholder="••••••••"
                            required
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                            />
                            <span className="ml-2">Recordar sesión</span>
                        </label>
                    </div>

                    {/* Turnstile Captcha */}
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

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition duration-200 disabled:opacity-50"
                    >
                        {processing ? 'Iniciando sesión...' : 'Ingresar'}
                    </button>

                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    ¿No tienes cuenta?{' '}
                    <Link href="/register" className="text-blue-600 hover:underline font-medium">
                        Registrar usuario
                    </Link>
                </div>
            </div>
        </div>
    );
}