
import React, { useState } from 'react';
import { User } from '../types';
import { login, register, signInWithGoogle } from '../authService';

interface AuthModalProps {
  onLogin: (user: User) => void;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onLogin, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { user, token } = await login(email, password);
        localStorage.setItem('auth_token', token);
        onLogin(user);
        onClose();
      } else {
        const user = await register(email, password, name);
        // Auto login after register
        const { token } = await login(email, password);
        localStorage.setItem('auth_token', token);
        onLogin(user);
        onClose();
      }
    } catch (err: any) {
      console.error(err);
      const msg = err.code === 'auth/email-already-in-use'
        ? 'This email is already registered. Please sign in.'
        : err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential'
          ? 'Invalid email or password.'
          : err.code === 'auth/user-not-found'
            ? 'No account found with this email.'
            : err.code === 'auth/weak-password'
              ? 'Password must be at least 6 characters.'
              : err.message || 'Authentication failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const { user, token } = await signInWithGoogle();
      localStorage.setItem('auth_token', token);
      onLogin(user);
      onClose();
    } catch (err: any) {
      console.error(err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setError(err.message || 'Google sign-in failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="glass w-full max-w-md p-8 rounded-3xl space-y-6 animate-in fade-in zoom-in duration-300">
        <div className="text-center">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            {isLogin ? 'Access your personal lab records' : 'Start tracking your chemical simulations'}
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {/* Google Sign In Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold text-sm bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center justify-center gap-3 text-white disabled:opacity-50"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-slate-700"></div>
          <span className="text-xs text-slate-500">or</span>
          <div className="flex-1 h-px bg-slate-700"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-xs text-slate-500 ml-1">Full Name</label>
              <input
                required
                type="text"
                placeholder="John Doe"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50 transition-all text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div className="space-y-1">
            <label className="text-xs text-slate-500 ml-1">Email Address</label>
            <input
              required
              type="email"
              placeholder="chemist@lab.io"
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50 transition-all text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-500 ml-1">Password</label>
            <input
              required
              type="password"
              placeholder="••••••••"
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50 transition-all text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-500/20 mt-4 disabled:opacity-50 disabled:cursor-wait"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Register Account')}
          </button>
        </form>

        <div className="text-center space-y-4">
          <button
            onClick={() => { setIsLogin(!isLogin); setError(null); }}
            className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={onClose}
              className="text-xs text-slate-500 hover:text-white transition-colors"
            >
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
