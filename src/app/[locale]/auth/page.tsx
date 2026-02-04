"use client";
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useLocale } from 'next-intl';

const content = {
  en: {
    title: "Account Management",
    register: {
      title: "Create Account",
      description: "Create an account to manage your forum posts and participate in discussions.",
      form: {
        name: "Full Name",
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm Password",
        button: "Create Account"
      }
    },
    login: {
      title: "Login",
      description: "Login to manage your posts and participate in the forum.",
      form: {
        email: "Email",
        password: "Password",
        button: "Login",
        forgotPassword: "Forgot Password?"
      }
    }
  },
  es: {
    title: "Gestión de Cuenta",
    register: {
      title: "Crear Cuenta",
      description: "Crea una cuenta para gestionar tus publicaciones y participar en las discusiones.",
      form: {
        name: "Nombre Completo",
        email: "Correo Electrónico",
        password: "Contraseña",
        confirmPassword: "Confirmar Contraseña",
        button: "Crear Cuenta"
      }
    },
    login: {
      title: "Iniciar Sesión",
      description: "Inicia sesión para gestionar tus publicaciones y participar en el foro.",
      form: {
        email: "Correo Electrónico",
        password: "Contraseña",
        button: "Iniciar Sesión",
        forgotPassword: "¿Olvidaste tu Contraseña?"
      }
    }
  }
};

export default function AuthPage() {
  const params = useParams() as { locale?: string };
  const routeLocale = typeof params?.locale === 'string' ? params.locale : undefined;
  const intlLocale = useLocale() || undefined;
  const locale = (routeLocale === 'en' || routeLocale === 'es') ? routeLocale : (intlLocale === 'en' ? 'en' : 'es');
  const t = content[locale === 'en' ? 'en' : 'es'];
  const router = useRouter();
  const [signup, setSignup] = useState({ displayName: '', email: '', password: '', confirm: '' });
  const [login, setLogin] = useState({ email: '', password: '' });
  const [signupError, setSignupError] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');
    
    // Client-side validation
    if (signup.password !== signup.confirm) {
      setSignupError(locale === 'en' ? 'Passwords do not match' : 'Las contraseñas no coinciden');
      return;
    }
    if (signup.password.length < 6) {
      setSignupError(locale === 'en' ? 'Password must be at least 6 characters' : 'La contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (!signup.displayName.trim()) {
      setSignupError(locale === 'en' ? 'Name is required' : 'El nombre es requerido');
      return;
    }
    
    try {
    const res = await fetch('/api/auth?action=signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email: signup.email, password: signup.password, displayName: signup.displayName })
    });
    const data = await res.json();
    if (res.ok && data.ok) {
        toast.success(locale === 'en' ? 'Account created! Please log in.' : 'Cuenta creada. Por favor inicia sesión.');
      setMode('login');
        setLogin({ email: signup.email, password: '' });
    } else {
        // Parse error message properly
        let errorMsg = data.error;
        if (typeof errorMsg === 'string') {
          try {
            const parsed = JSON.parse(errorMsg);
            if (Array.isArray(parsed) && parsed[0]?.message) {
              errorMsg = parsed[0].message;
            }
          } catch {
            // Not JSON, use as is
          }
        }
        // Translate common errors
        if (errorMsg?.includes('Email already')) {
          errorMsg = locale === 'en' ? 'Email is already registered' : 'Este correo ya está registrado';
        } else if (errorMsg?.includes('at least 6')) {
          errorMsg = locale === 'en' ? 'Password must be at least 6 characters' : 'La contraseña debe tener al menos 6 caracteres';
        }
        setSignupError(errorMsg || (locale === 'en' ? 'Registration failed' : 'Error al registrarse'));
      }
    } catch (err) {
      setSignupError(locale === 'en' ? 'Connection error' : 'Error de conexión');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    // Client-side validation
    if (login.password.length < 6) {
      setLoginError(locale === 'en' ? 'Password must be at least 6 characters' : 'La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    try {
    const res = await fetch('/api/auth?action=login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email: login.email, password: login.password })
    });
    const data = await res.json();
    if (res.ok && data.ok) {
      toast.success(locale === 'en' ? 'Logged in' : 'Sesión iniciada');
      // Force full reload so Navbar/UserMenu reflects new session on mobile
      window.location.href = `/${locale}`;
    } else {
        // Parse error message properly
        let errorMsg = data.error;
        if (typeof errorMsg === 'string') {
          // Check if it's a JSON string
          try {
            const parsed = JSON.parse(errorMsg);
            if (Array.isArray(parsed) && parsed[0]?.message) {
              errorMsg = parsed[0].message;
            }
          } catch {
            // Not JSON, use as is
          }
        }
        // Translate common errors
        if (errorMsg?.includes('Invalid credentials')) {
          errorMsg = locale === 'en' ? 'Invalid email or password' : 'Correo o contraseña incorrectos';
        } else if (errorMsg?.includes('at least 6')) {
          errorMsg = locale === 'en' ? 'Password must be at least 6 characters' : 'La contraseña debe tener al menos 6 caracteres';
        }
        setLoginError(errorMsg || (locale === 'en' ? 'Login failed' : 'Error al iniciar sesión'));
      }
    } catch (err) {
      setLoginError(locale === 'en' ? 'Connection error' : 'Error de conexión');
    }
  };

  const [mode, setMode] = useState<'login'|'signup'>('login');

  const inputClass = "w-full bg-white text-gray-900 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 transition-all";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Mini Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12 text-center text-white">
        <div className="text-4xl mb-3">🔐</div>
        <h1 className="text-3xl font-bold">{t.title}</h1>
      </div>

      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-8">
            <img src="/logo.png" alt="TransformArte" className="h-20 w-20 rounded-xl shadow-lg" />
            <div className="mt-6 inline-flex rounded-full bg-gray-100 p-1 shadow-inner">
              <button 
                onClick={() => setMode('login')} 
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${mode === 'login' ? 'bg-white shadow-md text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {t.login.title}
              </button>
              <button 
                onClick={() => setMode('signup')} 
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${mode === 'signup' ? 'bg-white shadow-md text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {t.register.title}
              </button>
            </div>
            <a href={`/${locale}`} className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium">
              ← {locale === 'en' ? 'Back to home' : 'Volver al inicio'}
            </a>
          </div>

          {mode === 'login' ? (
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <p className="text-gray-600 mb-6">{t.login.description}</p>
              <form className="space-y-4" onSubmit={handleLogin}>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t.login.form.email}</label>
                  <input 
                    type="email" 
                    placeholder="ejemplo@correo.com" 
                    className={inputClass}
                    value={login.email} 
                    onChange={(e) => setLogin(s => ({ ...s, email: e.target.value }))} 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t.login.form.password}</label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className={inputClass}
                    value={login.password} 
                    onChange={(e) => setLogin(s => ({ ...s, password: e.target.value }))} 
                    required 
                  />
                </div>
                {loginError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                    ⚠️ {loginError}
                  </div>
                )}
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
                >
                  {t.login.form.button}
                </button>
              </form>
              <p className="text-center text-sm text-gray-600 mt-6">
                {locale === 'en' ? "Don't have an account?" : "¿No tienes cuenta?"}{' '}
                <button onClick={() => setMode('signup')} className="text-blue-600 font-semibold hover:text-blue-800">
                  {locale === 'en' ? 'Sign up' : 'Crear cuenta'}
                </button>
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <p className="text-gray-600 mb-6">{t.register.description}</p>
              <form className="space-y-4" onSubmit={handleSignup}>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t.register.form.name}</label>
                  <input 
                    type="text" 
                    placeholder={locale === 'en' ? 'John Doe' : 'Juan Pérez'}
                    className={inputClass}
                    value={signup.displayName} 
                    onChange={(e) => setSignup(s => ({ ...s, displayName: e.target.value }))} 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t.register.form.email}</label>
                  <input 
                    type="email" 
                    placeholder="ejemplo@correo.com" 
                    className={inputClass}
                    value={signup.email} 
                    onChange={(e) => setSignup(s => ({ ...s, email: e.target.value }))} 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t.register.form.password}</label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className={inputClass}
                    value={signup.password} 
                    onChange={(e) => setSignup(s => ({ ...s, password: e.target.value }))} 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t.register.form.confirmPassword}</label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className={inputClass}
                    value={signup.confirm} 
                    onChange={(e) => setSignup(s => ({ ...s, confirm: e.target.value }))} 
                    required 
                  />
                </div>
                {signupError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                    ⚠️ {signupError}
                  </div>
                )}
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
                >
                  {t.register.form.button}
                </button>
              </form>
              <p className="text-center text-sm text-gray-600 mt-6">
                {locale === 'en' ? 'Already have an account?' : '¿Ya tienes cuenta?'}{' '}
                <button onClick={() => setMode('login')} className="text-blue-600 font-semibold hover:text-blue-800">
                  {t.login.title}
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
