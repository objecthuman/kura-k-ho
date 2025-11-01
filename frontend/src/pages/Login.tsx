import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { loginAtom } from '@/store/authAtoms';
import { authService } from '@/services/authService';
import { Loader2, Lock, Mail, ArrowRight } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const login = useSetAtom(loginAtom);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await authService.login({ email, password });

      // Backend returns: { message, user, session, access_token }
      if (response.access_token && response.user) {
        login({ user: response.user, token: response.access_token });
        navigate('/');
      } else {
        setError(response.error || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-pink-400 border-4 border-black rotate-12 -z-10" />
      <div className="absolute bottom-32 left-20 w-24 h-24 bg-cyan-400 border-4 border-black -rotate-12 -z-10" />
      <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-yellow-300 border-4 border-black rotate-45 -z-10" />

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-cyan-400 border-4 border-black px-6 py-3 rotate-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6">
            <h1 className="text-4xl font-black uppercase">Welcome Back!</h1>
          </div>
          <p className="text-lg font-bold">Sign in to start fact-checking</p>
        </div>

        {/* Form Card */}
        <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-400 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <p className="font-bold text-sm">{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-black uppercase flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 border-4 border-black font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-black uppercase flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 border-4 border-black font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-4 bg-pink-500 border-4 border-black font-black text-lg uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-base font-bold">
            Don't have an account?{' '}
            <Link to="/signup" className="text-pink-600 underline hover:text-cyan-600 transition-colors font-black">
              Sign up now!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
