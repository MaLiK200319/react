import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (login(password)) {
            navigate('/admin');
        } else {
            setError('Invalid access code');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
            <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
                <h1 className="text-2xl font-bold mb-6 text-center text-blue-400">System Access</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Access Key"
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-white placeholder-gray-400"
                        />
                    </div>
                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded font-semibold transition-colors"
                    >
                        Authenticate
                    </button>
                    <p className="text-xs text-center text-gray-500 mt-4">Default key: admin123</p>
                </form>
            </div>
        </div>
    );
};

export default Login;
