import React, { useState } from 'react';
import FormularioItems from './FormularioItems';
import ResultadosIVA from './ResultadosIVA';
import NavigationMenu from '../../shared/NavigationMenu';
import { calcularIVA } from '../../../utils/calculators';
import { parsearMonto } from '../../../utils/formatters';

const CalculadoraIVA = () => {
  const [items, setItems] = useState([
    { id: 1, descripcion: '', cantidad: 1, valorUnitario: '' }
  ]);
  const [resultados, setResultados] = useState({
    subtotal: 0,
    iva: 0,
    total: 0
  });

  const calcular = (items) => {
    const subtotal = items.reduce((sum, item) => {
      return sum + (parsearMonto(item.valorUnitario) * item.cantidad);
    }, 0);
    
    const { iva, total } = calcularIVA(subtotal);
    setResultados({ subtotal, iva, total });
  };

  const limpiar = () => {
    setItems([{ id: 1, descripcion: '', cantidad: 1, valorUnitario: '' }]);
    setResultados({ subtotal: 0, iva: 0, total: 0 });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu />
      <div className="flex-grow container max-w-2xl mx-auto px-4">
        <div className="bg-slate-800 rounded-lg shadow-xl p-6">
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
      </div>
    </div>
  );
};

export default CalculadoraIVA;