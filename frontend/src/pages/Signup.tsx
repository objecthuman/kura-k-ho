import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { loginAtom } from '@/store/authAtoms';
import { authService } from '@/services/authService';
import { Loader2, Lock, Mail, ArrowRight, UserPlus } from 'lucide-react';

export function Signup() {
  const navigate = useNavigate();
  const login = useSetAtom(loginAtom);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.signup({ email, password });

      // Backend returns: { message, user, session: { access_token, ... } }
      if (response.user && response.session?.access_token) {
        login({ user: response.user, token: response.session.access_token });
        navigate('/preferences');
      } else {
        setError(response.error || 'Signup failed');
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
      <div className="absolute top-32 left-20 w-32 h-32 bg-yellow-300 border-4 border-black -rotate-12 -z-10" />
      <div className="absolute bottom-20 right-32 w-24 h-24 bg-pink-400 border-4 border-black rotate-12 -z-10" />
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-cyan-400 border-4 border-black -rotate-45 -z-10" />

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-pink-500 border-4 border-black px-6 py-3 -rotate-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6">
            <h1 className="text-4xl font-black uppercase text-white">Join Us!</h1>
          </div>
          <p className="text-lg font-bold">Create account & fight fake news</p>
        </div>

        {/* Form Card */}
        <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <form onSubmit={handleSubmit} className="space-y-5">
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

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-black uppercase flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 border-4 border-black font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-4 bg-cyan-500 border-4 border-black font-black text-lg uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Sign Up
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <p className="text-base font-bold">
            Already have an account?{' '}
            <Link to="/login" className="text-cyan-600 underline hover:text-pink-600 transition-colors font-black">
              Sign in here!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
