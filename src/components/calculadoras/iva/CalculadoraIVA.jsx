import React, { useState } from 'react';
import FormularioItems from './components/FormularioItems';
import ResultadosIVA from './components/ResultadosIVA';
import NavigationMenu from '../../../layouts/components/NavigationMenu';
import ShareButtons from '../../../layouts/components/ShareButtons';
import { calcularIVA } from './utils/ivaCalculator';
import { parsearMonto } from '../../../core/formatters/formatters';

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

  const calcular = (itemsActuales) => {
    const subtotal = itemsActuales.reduce((sum, item) => {
      const monto = parsearMonto(item.valorUnitario);
      const cantidad = parseInt(item.cantidad) || 0;
      return sum + (monto * cantidad);
    }, 0);
    
    const { iva, total } = calcularIVA(subtotal);
    setResultados({ subtotal, iva, total });
  };

  const limpiar = () => {
    setItems([
      { id: 1, descripcion: '', cantidad: 1, valorUnitario: '' },
      { id: 2, descripcion: '', cantidad: 1, valorUnitario: '' },
      { id: 3, descripcion: '', cantidad: 1, valorUnitario: '' }
    ]);
    setResultados({ subtotal: 0, iva: 0, total: 0 });
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
                setItems={setItems}
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