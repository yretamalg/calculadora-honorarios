import React from 'react';
import { Home, Receipt, Calculator, Percent, DollarSign } from 'lucide-react';

const NavigationMenu = () => {
  return (
    <nav className="py-3 mb-6">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-center">
          {/* Botón Home a la izquierda */}
          <a 
            href="/" 
            className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors px-4 py-2 rounded-md hover:bg-slate-800"
          >
            <Home size={18} />
            <span>Inicio</span>
          </a>

          {/* Botones de navegación con iconos a la derecha */}
          <div className="flex gap-2">
          <span class="text-xs text-slate-400 align-middle pt-[15px]">Elige tu Herramienta</span>
            <a 
              href="/honorarios" 
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors rounded-md border border-slate-600"
              title="Retención de Honorarios"
            >
              <div className="group relative">
                <Receipt size={24} />
                {/* Tooltip */}
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-12 w-48 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 text-center z-50">
                  Calcular retención de boletas de honorarios según tasas vigentes
                </div>
              </div>
            </a>
            
            <a 
              href="/iva" 
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors rounded-md border border-slate-600"
              title="Calculadora de IVA"
            >
              <div className="group relative">
                <Calculator size={24} />
                {/* Tooltip */}
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-12 w-48 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 text-center z-50">
                  Calcular IVA (19%) para facturas y productos
                </div>
              </div>
            </a>
            
            <a 
              href="/porcentajes" 
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors rounded-md border border-slate-600"
              title="Calculadora de Porcentajes"
            >
              <div className="group relative">
                <Percent size={24} />
                {/* Tooltip */}
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-12 w-48 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 text-center z-50">
                  Diferentes cálculos porcentuales para tus finanzas
                </div>
              </div>
            </a>
            <a 
              href="/indicadores" 
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors rounded-md border border-slate-600"
              title="Conversor de Indicadores"
            >
              <div className="group relative">
                <DollarSign size={24} />
                {/* Tooltip */}
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-12 w-48 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 text-center z-50">
                  Conversor de Indicadores Economicos: Dolar, UF, Euro, Peso Chileno
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationMenu;