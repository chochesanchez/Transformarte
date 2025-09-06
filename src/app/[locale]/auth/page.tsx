"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

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

export default function AuthPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = content[locale === 'en' ? 'en' : 'es'];
  const [signup, setSignup] = useState({ displayName: '', email: '', password: '', confirm: '' });
  const [login, setLogin] = useState({ email: '', password: '' });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signup.password !== signup.confirm) {
      toast.error(locale === 'en' ? 'Passwords do not match' : 'Las contraseñas no coinciden');
      return;
    }
    const res = await fetch('/api/auth?action=signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: signup.email, password: signup.password, displayName: signup.displayName })
    });
    const data = await res.json();
    if (res.ok && data.ok) {
      toast.success(locale === 'en' ? 'Account created' : 'Cuenta creada');
    } else {
      toast.error(data.error || 'Error');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth?action=login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: login.email, password: login.password })
    });
    const data = await res.json();
    if (res.ok && data.ok) {
      toast.success(locale === 'en' ? 'Logged in' : 'Sesión iniciada');
    } else {
      toast.error(data.error || 'Error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl">
        <div className="flex justify-center mb-8">
          <img src="/logo.png" alt="TransformArte" className="h-12 w-12 rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Register Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-2">{t.login.title}</h2>
            <p className="text-gray-600 mb-6">{t.login.description}</p>
            
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="block text-gray-700 mb-2">{t.login.form.email}</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={login.email}
                  onChange={(e)=>setLogin(s=>({ ...s, email: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">{t.login.form.password}</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={login.password}
                  onChange={(e)=>setLogin(s=>({ ...s, password: e.target.value }))}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90"
              >
                {t.login.form.button}
              </button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-4">
              {locale === 'en' ? "Don't have an account?" : '¿No tienes cuenta?'}{' '}
              <a href="#signup" className="text-primary font-medium">{locale === 'en' ? 'Sign up' : 'Crear cuenta'}</a>
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 id="signup" className="text-2xl font-semibold mb-4">{t.register.title}</h2>
            <p className="text-gray-600 mb-6">{t.register.description}</p>
            
            <form className="space-y-4" onSubmit={handleSignup}>
              <div>
                <label className="block text-gray-700 mb-2">{t.register.form.name}</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={signup.displayName}
                  onChange={(e)=>setSignup(s=>({ ...s, displayName: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">{t.register.form.email}</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={signup.email}
                  onChange={(e)=>setSignup(s=>({ ...s, email: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">{t.register.form.password}</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={signup.password}
                  onChange={(e)=>setSignup(s=>({ ...s, password: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">{t.register.form.confirmPassword}</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={signup.confirm}
                  onChange={(e)=>setSignup(s=>({ ...s, confirm: e.target.value }))}
                  required
                />
              </div>
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90"
                >
                  {t.register.form.button}
                </button>
                <Link href="#" className="text-sm text-primary hover:underline">
                  {t.login.form.forgotPassword}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 