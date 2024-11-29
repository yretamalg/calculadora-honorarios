import React from 'react';
import { Home } from 'lucide-react';

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

          {/* Botones de navegación a la derecha */}
          <div className="flex space-x-4">
            <a 
              href="/honorarios" 
              className="px-4 py-2 text-sm bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors rounded-md border border-slate-600"
            >
              Retención Boleta
            </a>
            <a 
              href="/iva" 
              className="px-4 py-2 text-sm bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors rounded-md border border-slate-600"
            >
              19% IVA Facturas
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationMenu;