import React from 'react';
import SEO from '../components/SEO';
import Link from 'next/link';
import { Footer } from '../components/Footer';

export default function PoliticaDePrivacidad() {
  return (
    <div className="min-h-screen bg-slate-900 text-gray-300">
      <SEO 
        title="Política de Privacidad - Calculadora de Retención" 
        description="Política de privacidad para la calculadora de retención de honorarios de VBox Pro"
      />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-white">Política de Privacidad</h1>
        
        <div className="space-y-4">
          <section>
            <h2 className="text-xl font-semibold mb-2 text-orange-500">1. Información Recopilada</h2>
            <p>
              No recopilamos ni almacenamos información personal de los usuarios 
              que utilizan la Calculadora de Retención de Honorarios.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-2 text-orange-500">2. Uso de Datos</h2>
            <p>
              Los cálculos realizados son completamente confidenciales y 
              no son registrados ni compartidos con terceros.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-2 text-orange-500">3. Cookies</h2>
            <p>
              Esta aplicación no utiliza cookies para rastrear la información 
              de los usuarios.
            </p>
          </section>
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/" className="text-orange-500 hover:underline">
            Volver a la Calculadora
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}