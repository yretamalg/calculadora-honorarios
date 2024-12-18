import React, { useState } from 'react';
import FormularioItems from './components/FormularioItems';
import ResultadosIVA from './components/ResultadosIVA';
import NavigationMenu from '@/layouts/components/NavigationMenu';
import ShareButtons from '@/layouts/components/ShareButtons';
import { useAnalytics } from '@/hooks/useAnalytics';
import { calcularIVA } from './utils/ivaCalculator';
import { parsearMonto } from '@/core/formatters/formatters';

const CalculadoraIVA = () => {
  const [items, setItems] = useState([
    { id: 1, descripcion: '', cantidad: 1, valorUnitario: '' },
    { id: 2, descripcion: '', cantidad: 1, valorUnitario: '' },
    { id: 3, descripcion: '', cantidad: 1, valorUnitario: '' }
  ]);
  
  const [resultados, setResultados] = useState({
    subtotal: 0,
    iva: 0,
    total: 0
  });

  const { trackCalculator, trackError } = useAnalytics();

  const calcular = (itemsActuales) => {
    try {
      const subtotal = itemsActuales.reduce((sum, item) => {
        const monto = parsearMonto(item.valorUnitario);
        const cantidad = parseInt(item.cantidad) || 0;
        return sum + (monto * cantidad);
      }, 0);
      
      const { iva, total } = calcularIVA(subtotal);
      setResultados({ subtotal, iva, total });

      trackCalculator('iva_calculate', {
        num_items: itemsActuales.length,
        subtotal,
        iva,
        total,
        items_con_valor: itemsActuales.filter(i => parsearMonto(i.valorUnitario) > 0).length
      });

    } catch (error) {
      console.error('Error en cálculo:', error);
      trackError(error, {
        component: 'CalculadoraIVA',
        action: 'calcular',
        num_items: items.length
      });
    }
  };

  const limpiar = () => {
    trackCalculator('iva_clear', {
      items_previos: items.length,
      tenia_resultados: resultados.total > 0
    });

    setItems([
      { id: 1, descripcion: '', cantidad: 1, valorUnitario: '' },
      { id: 2, descripcion: '', cantidad: 1, valorUnitario: '' },
      { id: 3, descripcion: '', cantidad: 1, valorUnitario: '' }
    ]);
    setResultados({ subtotal: 0, iva: 0, total: 0 });
  };

  const handleItemsChange = (nuevosItems) => {
    setItems(nuevosItems);
    trackCalculator('iva_items_update', {
      num_items: nuevosItems.length,
      items_con_valor: nuevosItems.filter(i => parsearMonto(i.valorUnitario) > 0).length
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      <NavigationMenu />
      <div className="flex-grow container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800 rounded-lg shadow-xl p-6 mb-6">
            <h1 className="text-slate-300 text-2xl font-bold text-center mb-6">
              19% IVA Facturas
            </h1>
            <div className="space-y-6">
              <FormularioItems
                items={items}
                setItems={handleItemsChange}
                onCalcular={calcular}
                onLimpiar={limpiar}
              />
              <ResultadosIVA 
                resultados={resultados}
                items={items}
              />
            </div>
          </div>
          <div className="mb-6">
            <ShareButtons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculadoraIVA;