import React from 'react';
import ShareButtons from '../../layouts/components/ShareButtons';
import { Receipt, Calculator, Percent, DollarSign } from 'lucide-react';

const CalculadoraSelector = () => {
  const calculadoras = [
    {
      titulo: "Calculadora Boleta Honorarios",
      descripcion: "Calcula retenciones según tasas vigentes 2024-2028",
      href: "/honorarios",
      icon: (className) => <Receipt className={className} />
    },
    {
      titulo: "Calculadora de IVA Facturas",
      descripcion: "Calcula el IVA (19%) para múltiples productos",
      href: "/iva",
      icon: (className) => <Calculator className={className} />
    },
    {
      titulo: "Calculadora de Porcentajes",
      descripcion: "Diferentes cálculos porcentuales para tus finanzas",
      href: "/porcentajes",
      icon: (className) => <Percent className={className} />
    },
    {
      titulo: "Conversor de Indicadores Económicos",
      descripcion: "Convierte entre UF, Dólar, Euro, UTM y Pesos Chilenos",
      href: "/indicadores",
      icon: (className) => <DollarSign className={className} />
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow container max-w-4xl mx-auto p-6">
        <h1 className="text-slate-300 text-3xl font-bold text-center mb-12">
          Calculadoras de Impuestos y Finanzas (Chile)
        </h1>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {calculadoras.map((calc, index) => (
            <div
              key={index}
              className="bg-slate-800 border border-slate-700 hover:border-orange-500 transition-all cursor-pointer group rounded-lg overflow-hidden"
            >
              <a href={calc.href} className="block">
                <div className="p-4">
                  <h2 className="text-slate-300 text-lg font-semibold group-hover:text-orange-500 transition-colors text-center">
                    {calc.titulo}
                  </h2>
                </div>
                <div className="p-4 pt-0">
                  <div className="space-y-4">
                    <div className="aspect-square bg-slate-700 rounded-lg flex items-center justify-center">
                      {calc.icon("w-12 h-12 text-orange-500")}
                    </div>
                    <p className="text-slate-300 text-xs text-center">
                      {calc.descripcion}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <ShareButtons />
        </div>
      </div>
    </div>
  );
};

export default CalculadoraSelector;