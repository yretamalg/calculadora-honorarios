import React from 'react';

const CalculadoraSelector = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow container max-w-4xl mx-auto p-6">
        <h1 className="text-slate-300 text-3xl font-bold text-center mb-12">
          Calculadoras Tributarias Chile
        </h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Calculadora de Retención */}
          <div className="bg-slate-800 border border-slate-700 hover:border-orange-500 transition-all cursor-pointer group rounded-lg overflow-hidden">
            <a href="/honorarios" className="block">
              <div className="p-6">
                <h2 className="text-slate-300 text-xl font-semibold group-hover:text-orange-500 transition-colors text-center">
                  Calculadora de Retención
                </h2>
              </div>
              <div className="p-6 pt-0">
                <div className="space-y-4">
                  <div className="aspect-square bg-slate-700 rounded-lg flex items-center justify-center">
                    <svg className="w-24 h-24 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-slate-300 text-sm text-center">
                    Calcula retenciones de boletas de honorarios según las tasas vigentes 2024-2028
                  </p>
                </div>
              </div>
            </a>
          </div>

          {/* Calculadora de IVA */}
          <div className="bg-slate-800 border border-slate-700 hover:border-orange-500 transition-all cursor-pointer group rounded-lg overflow-hidden">
            <a href="/iva" className="block">
              <div className="p-6">
                <h2 className="text-slate-300 text-xl font-semibold group-hover:text-orange-500 transition-colors text-center">
                  Calculadora de IVA
                </h2>
              </div>
              <div className="p-6 pt-0">
                <div className="space-y-4">
                  <div className="aspect-square bg-slate-700 rounded-lg flex items-center justify-center">
                    <svg className="w-24 h-24 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-slate-300 text-sm text-center">
                    Calcula el IVA (19%) para múltiples productos o servicios
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculadoraSelector;