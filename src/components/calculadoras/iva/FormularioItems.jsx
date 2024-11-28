import React from 'react';
import ItemLista from './ItemLista';
import { parsearMonto } from '../../../utils/formatters';

const FormularioItems = ({ items, setItems, onCalcular, onLimpiar }) => {
  const agregarItem = () => {
    setItems([
      ...items,
      {
        id: items.length + 1,
        descripcion: '',
        cantidad: 1,
        valorUnitario: ''
      }
    ]);
  };

  const eliminarItem = (id) => {
    if (items.length === 1) return;
    const nuevosItems = items.filter(item => item.id !== id);
    setItems(nuevosItems);
    calcularTotal(nuevosItems);
  };

  const actualizarItem = (id, campo, valor) => {
    const nuevosItems = items.map(item => {
      if (item.id === id) {
        return { ...item, [campo]: valor };
      }
      return item;
    });
    setItems(nuevosItems);
    calcularTotal(nuevosItems);
  };

  const calcularTotal = (items) => {
    const itemsConValores = items.map(item => ({
      ...item,
      valorNumerico: parsearMonto(item.valorUnitario)
    }));
    onCalcular(itemsConValores);
  };

  return (
    <div className="bg-slate-800 border-slate-700 rounded-lg p-6">
      <div className="space-y-4">
        {items.map((item, index) => (
          <ItemLista
            key={item.id}
            item={item}
            onUpdate={actualizarItem}
            onDelete={eliminarItem}
            isLastItem={items.length === 1}
          />
        ))}
        
        <div className="flex gap-4">
          <button
            onClick={agregarItem}
            className="flex-1 px-4 py-2 text-white bg-orange-700 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Agregar Artículo
          </button>
          <button
            onClick={onLimpiar}
            className="flex-1 px-4 py-2 text-gray-900 bg-slate-300 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormularioItems;