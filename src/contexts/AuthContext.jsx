import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check session storage for session (clears on browser close)
        const session = sessionStorage.getItem('admin_session');
        if (session) {
            setUser({ role: 'admin' });
        }
        setLoading(false);
    }, []);

    const login = (password) => {
        // Hardcoded password for now - "admin123"
        if (password === 'admin123') {
            const u = { role: 'admin' };
            setUser(u);
            sessionStorage.setItem('admin_session', 'true');
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('admin_session');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
