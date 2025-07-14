import { useState, useEffect } from 'react';
import type { AdminCredentials } from '~/lib/types';
import { useAuth } from '~/lib/hooks';
import { DEFAULT_ADMIN_CREDENTIALS } from '~/lib/auth';
import { useNavigate } from '@remix-run/react';

export function AdminLogin() {
  const [credentials, setCredentials] = useState<AdminCredentials>({
    username: '',
    password: ''
  });
  const { login, isLoading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!credentials.username.trim() || !credentials.password.trim()) {
      return;
    }

    const success = await login(credentials);
    if (success) {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  // Auto-fill with default credentials for demo
  const handleAutoFill = () => {
    setCredentials(DEFAULT_ADMIN_CREDENTIALS);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-law-dark to-gray-900 px-4">
      <div className="bg-law-cream rounded-3xl p-10 max-w-md w-full shadow-2xl relative border-4 border-transparent bg-clip-padding before:absolute before:inset-[-4px] before:bg-gold-texture before:rounded-3xl before:z-[-1] before:brightness-75 before:contrast-125">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-xs font-medium z-10"
        >
          ← Back
        </button>
        <div className="text-center mb-8">
          <h1 className="bg-gold-texture bg-clip-text text-transparent font-merriweather font-semibold text-3xl mb-2 bg-cover bg-center">
            Admin Access
          </h1>
          <p className="text-gray-600 font-source-sans-pro text-lg">
            LawVriksh Dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="font-montserrat font-medium text-base text-gray-800">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              className="p-3 border-2 border-gray-300 rounded-xl text-base bg-white transition-colors focus:outline-none focus:border-law-gold"
              placeholder="Enter username"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-montserrat font-medium text-base text-gray-800">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              className="p-3 border-2 border-gray-300 rounded-xl text-base bg-white transition-colors focus:outline-none focus:border-law-gold"
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-800 p-3 rounded-lg border border-red-200 text-sm text-center">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className={`p-4 border-none rounded-full bg-gold-texture text-black font-montserrat font-semibold text-lg cursor-pointer transition-all hover:scale-105 hover:opacity-90 ${
              isLoading ? 'opacity-60 cursor-not-allowed transform-none' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            Enter your admin credentials to access the dashboard
          </p>
          
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
