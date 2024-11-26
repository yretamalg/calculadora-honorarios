import React from 'react';
import SEO from '../components/SEO';
import Link from 'next/link';
import { Footer } from '../components/Footer';

export default function TerminosDeUso() {
  return (
    <div className="min-h-screen bg-slate-900 text-gray-300">
      <SEO 
        title="Términos de Uso - Calculadora de Retención" 
        description="Términos de uso para la calculadora de retención de honorarios de VBox Pro"
      />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-white">Términos de Uso</h1>
        
        <div className="space-y-4">
          <section>
            <h2 className="text-xl font-semibold mb-2 text-orange-500">1. Introducción</h2>
            <p>
              Bienvenido a la Calculadora de Retención de Honorarios de VBox Pro. 
              Al utilizar esta herramienta, aceptas los siguientes términos de uso.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-2 text-orange-500">2. Uso de la Herramienta</h2>
            <p>
              Esta calculadora proporciona estimaciones basadas en las tasas de retención 
              vigentes. Los resultados son solo referenciales y no constituyen 
              asesoramiento tributario oficial.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-2 text-orange-500">3. Responsabilidad</h2>
            <p>
              VBox Pro no se hace responsable por decisiones tomadas basadas 
              en los cálculos de esta herramienta. Siempre consulte con un 
              profesional tributario para confirmación.
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