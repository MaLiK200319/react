import { useAuth } from '../../contexts/AuthContext';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, GraduationCap, User, Settings, LogOut, Briefcase } from 'lucide-react';
import { cn } from '../../lib/utils'; // Keep usage of utils consistent

const AdminLayout = () => {
    const { user, loading, logout } = useAuth();
    const location = useLocation();

    if (loading) return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Loading system...</div>;

    if (!user) {
        return <Navigate to="/admin/login" replace />;
    }

    const navItems = [
        { name: 'Overview', path: '/admin', icon: <LayoutDashboard size={20} /> },
        { name: 'Projects', path: '/admin/projects', icon: <FolderKanban size={20} /> },
        { name: 'Skills', path: '/admin/skills', icon: <GraduationCap size={20} /> },
        { name: 'Experience', path: '/admin/experience', icon: <Briefcase size={20} /> },
        { name: 'Profile', path: '/admin/profile', icon: <User size={20} /> },
        // { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
    ];

    return (
        <div className="flex h-screen bg-gray-950 text-gray-100 overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-gray-800 bg-gray-900/50 backdrop-blur flex flex-col">
                <div className="p-6 border-b border-gray-800">
                    <h2 className="text-xl font-bold tracking-tight text-white">Control Center</h2>
                    <p className="text-xs text-gray-500 mt-1">v2.0.0 (System)</p>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path))
                                    ? "bg-blue-600/10 text-blue-400 border border-blue-600/20"
                                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                            )}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors"
                    >
                        <LogOut size={20} />
                        Disconnect
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="h-16 border-b border-gray-800 flex items-center justify-between px-8 bg-gray-900/30">
                    <h1 className="text-lg font-medium text-white">
                        {navItems.find(i => i.path === location.pathname)?.name || 'Dashboard'}
                    </h1>
                    <div className="flex items-center gap-4">
                        <Link to="/" target="_blank" className="text-sm text-gray-400 hover:text-white">View Live Site ↗</Link>
                    </div>
                </header>
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
