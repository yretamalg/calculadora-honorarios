import React from 'react';
import ItemLista from './ItemLista';
import BotonesControl from './BotonesControl';

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
    onCalcular(nuevosItems);
  };

  const actualizarItem = (id, campo, valor) => {
    const nuevosItems = items.map(item => {
      if (item.id === id) {
        if (campo === 'valorUnitario') {
          valor = formatearMonto(parsearMonto(valor));
        }
        return { ...item, [campo]: valor };
      }
      return item;
    });
    setItems(nuevosItems);
    onCalcular(nuevosItems);
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
        
        <button
          onClick={agregarItem}
          className="w-full px-4 py-2 text-white bg-orange-700 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          Agregar Artículo
        </button>

        <BotonesControl
          onCalcular={() => onCalcular(items)}
          onLimpiar={onLimpiar}
        />
      </div>
    </div>
  );
};

export default FormularioItems;