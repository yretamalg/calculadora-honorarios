import React from 'react';
import ShareButtons from './ShareButtons';

const CalculadoraSelector = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow container max-w-3xl mx-auto p-6">
        <h1 className="text-slate-300 text-3xl font-bold text-center mb-12">
          Calculadoras de Impuestos y Finanzas (Chile)
        </h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Calculadora de Honorarios */}
          <div className="bg-slate-800 border border-slate-700 hover:border-orange-500 transition-all cursor-pointer group rounded-lg overflow-hidden" style={{ maxWidth: '250px', margin: '0 auto' }}>
            <a href="/honorarios" className="block">
              <div className="p-4">
                <h2 className="text-slate-300 text-lg font-semibold group-hover:text-orange-500 transition-colors text-center">
                  Calculadora Boleta Honorarios
                </h2>
              </div>
              <div className="p-4 pt-0">
                <div className="space-y-4">
                  <div className="aspect-square bg-slate-700 rounded-lg flex items-center justify-center">
                    <svg className="w-12 h-12 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-slate-300 text-xs text-center">
                    Calcula retenciones según tasas vigentes 2024-2028
                  </p>
                </div>
              </div>
            </a>
          </div>

          {/* Calculadora de IVA */}
          <div className="bg-slate-800 border border-slate-700 hover:border-orange-500 transition-all cursor-pointer group rounded-lg overflow-hidden" style={{ maxWidth: '250px', margin: '0 auto' }}>
            <a href="/iva" className="block">
              <div className="p-4">
                <h2 className="text-slate-300 text-lg font-semibold group-hover:text-orange-500 transition-colors text-center">
                  Calculadora de IVA Facturas
                </h2>
              </div>
              <div className="p-4 pt-0">
                <div className="space-y-4">
                  <div className="aspect-square bg-slate-700 rounded-lg flex items-center justify-center">
                    <svg className="w-12 h-12 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-slate-300 text-xs text-center">
                    Calcula el IVA (19%) para múltiples productos
                  </p>
                </div>
              </div>
            </a>
          </div>

          {/* Calculadora de Porcentajes */}
          <div className="bg-slate-800 border border-slate-700 hover:border-orange-500 transition-all cursor-pointer group rounded-lg overflow-hidden" style={{ maxWidth: '250px', margin: '0 auto' }}>
            <a href="/porcentajes" className="block">
              <div className="p-4">
                <h2 className="text-slate-300 text-lg font-semibold group-hover:text-orange-500 transition-colors text-center">
                  Calculadora de Porcentajes
                </h2>
              </div>
              <div className="p-4 pt-0">
                <div className="space-y-4">
                  <div className="aspect-square bg-slate-700 rounded-lg flex items-center justify-center">
                    <svg className="w-12 h-12 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="text-slate-300 text-xs text-center">
                    Diferentes cálculos porcentuales para tus finanzas
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>

        <div className="mt-8">
          <ShareButtons />
        </div>
      </div>
    </div>
  );
};

export default CalculadoraSelector;