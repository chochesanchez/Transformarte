import React from 'react';
import Link from 'next/link';

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

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">{t.title}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Register Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">{t.register.title}</h2>
            <p className="text-gray-600 mb-6">{t.register.description}</p>
            
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">{t.register.form.name}</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">{t.register.form.email}</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">{t.register.form.password}</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">{t.register.form.confirmPassword}</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90"
              >
                {t.register.form.button}
              </button>
            </form>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">{t.login.title}</h2>
            <p className="text-gray-600 mb-6">{t.login.description}</p>
            
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">{t.login.form.email}</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">{t.login.form.password}</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90"
                >
                  {t.login.form.button}
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