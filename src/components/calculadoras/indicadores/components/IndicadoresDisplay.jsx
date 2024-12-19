import React from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { getChileDateTime } from '../utils/dateUtils';
import { obtenerUFValida, mostrarUFSiguiente } from '../utils/ufUtils';

const IndicadoresDisplay = ({ indicadores, loading, error }) => {
  const { trackCalculator, trackError } = useAnalytics();
  const fechaHoraChile = new Date(getChileDateTime());
  const ufValida = obtenerUFValida(indicadores, fechaHoraChile);
  const mostrarSiguiente = mostrarUFSiguiente(fechaHoraChile.getHours());

  const formatearNumero = (numero) => {
    if (!numero && numero !== 0) return '-';
    try {
      return new Intl.NumberFormat('es-CL', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      }).format(numero);
    } catch (error) {
      trackError(error, {
        component: 'IndicadoresDisplay',
        action: 'formatearNumero',
        numero
      });
      return '-';
    }
  };

  const formatearIndicador = (valor, tipo) => {
    if (!valor && valor !== 0) return '-';
    try {
      const formateado = formatearNumero(valor);
      switch (tipo) {
        case 'EURO':
          return `€ ${formateado}`;
        case 'UTM':
          return `$ ${Math.round(valor).toLocaleString('es-CL')}`;
        default:
          return `$ ${formateado}`;
      }
    } catch (error) {
      trackError(error, {
        component: 'IndicadoresDisplay',
        action: 'formatearIndicador',
        tipo,
        valor
      });
      return '-';
    }
  };

  React.useEffect(() => {
    if (indicadores) {
      trackCalculator('indicadores_load', {
        success: true,
        has_all_indicators: Boolean(indicadores.UF && indicadores.DOLAR && 
                                  indicadores.EURO && indicadores.UTM),
        timestamp: new Date().toISOString(),
        uf_valid: Boolean(ufValida),
        show_next_uf: mostrarSiguiente
      });
    }
  }, [indicadores, ufValida]);

  React.useEffect(() => {
    if (error) {
      trackError(error, {
        component: 'IndicadoresDisplay',
        action: 'load_indicators',
        error_message: error.message
      });
    }
  }, [error]);

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

  const handleIndicadorClick = (indicador) => {
    trackCalculator('indicador_card_click', {
      tipo_indicador: indicador.id,
      valor: indicador.valor,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {INDICADORES.map(indicador => (
        <div 
          key={indicador.id}
          onClick={() => handleIndicadorClick(indicador)}
          className="bg-slate-700 rounded-lg p-4 transition-all hover:bg-slate-600 cursor-pointer"
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