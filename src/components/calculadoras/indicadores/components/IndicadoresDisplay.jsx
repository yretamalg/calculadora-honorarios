import React from 'react';
import { getChileDateTime } from './utils/dateUtils';
import { obtenerUFValida, mostrarUFSiguiente } from './utils/ufUtils';

const IndicadoresDisplay = ({ indicadores, loading, error }) => {
  const fechaHoraChile = new Date(getChileDateTime());
  const ufValida = obtenerUFValida(indicadores, fechaHoraChile);
  const mostrarSiguiente = mostrarUFSiguiente(fechaHoraChile.getHours());

  const formatearNumero = (numero) => {
    if (!numero && numero !== 0) return '-';
    return new Intl.NumberFormat('es-CL', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    }).format(numero);
  };

  const formatearIndicador = (valor, tipo) => {
    if (!valor && valor !== 0) return '-';
    const formateado = formatearNumero(valor);
    switch (tipo) {
      case 'EURO':
        return `€ ${formateado}`;
      case 'UTM':
        return `$ ${Math.round(valor).toLocaleString('es-CL')}`;
      default:
        return `$ ${formateado}`;
    }
  };

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
        <p className="text-red-400 text-sm text-center">
          Error al cargar indicadores
        </p>
      </div>
    );
  }

  if (loading || !indicadores) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div 
            key={i} 
            className="bg-slate-700/50 animate-pulse rounded-lg p-4 h-[76px]"
          />
        ))}
      </div>
    );
  }

  const INDICADORES = [
    { 
      id: 'UF', 
      nombre: `UF${mostrarSiguiente ? ' (mañana)' : ''}`,
      valor: ufValida?.valor || indicadores.UF?.valor,
      tipo: 'UF'
    },
    { 
      id: 'DOLAR', 
      nombre: 'Dólar', 
      valor: indicadores.DOLAR?.valor,
      tipo: 'DOLAR'
    },
    { 
      id: 'EURO', 
      nombre: 'Euro', 
      valor: indicadores.EURO?.valor,
      tipo: 'EURO'
    },
    { 
      id: 'UTM', 
      nombre: 'UTM', 
      valor: indicadores.UTM?.valor,
      tipo: 'UTM'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {INDICADORES.map(indicador => (
        <div 
          key={indicador.id}
          className="bg-slate-700 rounded-lg p-4 transition-all hover:bg-slate-600"
        >
          <p className="text-sm text-slate-400 mb-1">
            {indicador.nombre}
          </p>
          <p className="text-xl font-semibold text-slate-200">
            {formatearIndicador(indicador.valor, indicador.tipo)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default IndicadoresDisplay;