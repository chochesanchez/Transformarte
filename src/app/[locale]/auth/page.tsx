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
    if (signup.password !== signup.confirm) {
      toast.error(locale === 'en' ? 'Passwords do not match' : 'Las contraseñas no coinciden');
      return;
    }
    setSignupError('');
    const res = await fetch('/api/auth?action=signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email: signup.email, password: signup.password, displayName: signup.displayName })
    });
    const data = await res.json();
    if (res.ok && data.ok) {
      toast.success(locale === 'en' ? 'Account created' : 'Cuenta creada');
      setMode('login');
    } else {
      setSignupError(data.error || (locale==='en'?'Error':'Error'));
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
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
      setLoginError(data.error || (locale==='en'?'Error':'Error'));
    }
  };

  const [mode, setMode] = useState<'login'|'signup'>('login');
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <img src="/logo.png" alt="TransformArte" className="h-16 w-16 rounded" />
          <div className="mt-6 inline-flex rounded-full bg-gray-100 p-1">
            <button onClick={()=>setMode('login')} className={`px-4 py-2 rounded-full text-sm font-medium ${mode==='login'?'bg-white shadow':''}`}>{t.login.title}</button>
            <button onClick={()=>setMode('signup')} className={`px-4 py-2 rounded-full text-sm font-medium ${mode==='signup'?'bg-white shadow':''}`}>{t.register.title}</button>
          </div>
          <a href={`/${locale}`} className="mt-4 text-sm text-primary">{locale==='en'?'Back to home':'Volver al inicio'}</a>
        </div>

        {mode==='login' ? (
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-600 mb-6 text-sm">{t.login.description}</p>
            <form className="space-y-2" onSubmit={handleLogin}>
              <input type="email" placeholder={t.login.form.email} className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" value={login.email} onChange={(e)=>setLogin(s=>({ ...s, email: e.target.value }))} required />
              <input type="password" placeholder={t.login.form.password} className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" value={login.password} onChange={(e)=>setLogin(s=>({ ...s, password: e.target.value }))} required />
              {loginError && <p className="text-red-600 text-sm">{loginError}</p>}
              <button type="submit" className="w-full bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90">{t.login.form.button}</button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-4">{locale==='en'?"Don't have an account?":"¿No tienes cuenta?"} <button onClick={()=>setMode('signup')} className="text-primary font-medium">{locale==='en'?'Sign up':'Crear cuenta'}</button></p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-600 mb-6 text-sm">{t.register.description}</p>
            <form className="space-y-2" onSubmit={handleSignup}>
              <input type="text" placeholder={t.register.form.name} className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" value={signup.displayName} onChange={(e)=>setSignup(s=>({ ...s, displayName: e.target.value }))} required />
              <input type="email" placeholder={t.register.form.email} className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" value={signup.email} onChange={(e)=>setSignup(s=>({ ...s, email: e.target.value }))} required />
              <input type="password" placeholder={t.register.form.password} className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" value={signup.password} onChange={(e)=>setSignup(s=>({ ...s, password: e.target.value }))} required />
              <input type="password" placeholder={t.register.form.confirmPassword} className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" value={signup.confirm} onChange={(e)=>setSignup(s=>({ ...s, confirm: e.target.value }))} required />
              {signupError && <p className="text-red-600 text-sm">{signupError}</p>}
              <button type="submit" className="w-full bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90">{t.register.form.button}</button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">{locale==='en'?'Already have an account?':'¿Ya tienes cuenta?'} <button onClick={()=>setMode('login')} className="text-primary font-medium">{t.login.title}</button></p>
          </div>
        )}
      </div>
    </div>
  );
} 