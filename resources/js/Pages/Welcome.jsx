export default function Welcome() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-slate-900 to-indigo-950 text-white">
            <div className="text-center p-8 bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700/50 target:shadow-indigo-500">
                <h1 className="text-5xl font-black text-indigo-400 tracking-tight mb-3">Tailwind v4 Activo</h1>
                <p className="text-slate-300 font-medium">React + Inertia + Laravel funcionando sin archivos de configuración extra.</p>
            </div>
        </div>
    );
}
