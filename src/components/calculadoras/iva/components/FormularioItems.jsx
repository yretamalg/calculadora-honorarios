import React from 'react';
import { formatearMonto, parsearMonto } from '../../../../core/formatters/formatters';
import ItemLista from './ItemLista';

const FormularioItems = ({ items, setItems, onCalcular, onLimpiar }) => {
  const agregarItem = () => {
    const nuevoItem = {
      id: items.length + 1,
      descripcion: '',
      cantidad: 1,
      valorUnitario: ''
    };
    setItems([...items, nuevoItem]);
  };

  const eliminarItem = (id) => {
    if (items.length <= 3) return;
    const nuevosItems = items.filter(item => item.id !== id);
    setItems(nuevosItems);
  };

  const actualizarItem = (id, campo, valor) => {
    const nuevosItems = items.map(item => {
      if (item.id === id) {
        return { ...item, [campo]: valor };
      }
      return item;
    });
    setItems(nuevosItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const itemsValidos = items.filter(item => {
      const monto = parsearMonto(item.valorUnitario);
      return monto > 0 && item.cantidad > 0;
    });
    
    if (itemsValidos.length > 0) {
      onCalcular(itemsValidos);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800 border-slate-700 rounded-lg p-6">
      <div className="space-y-4">
        <div className="hidden md:grid md:grid-cols-[1fr,80px,120px,40px] gap-2 text-sm text-slate-300 mb-2">
          <div>Descripción del artículo</div>
          <div className="text-center">Cantidad</div>
          <div className="text-center">Valor Unit.</div>
          <div></div>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="space-y-2">
              <ItemLista
                item={item}
                onUpdate={actualizarItem}
                onDelete={eliminarItem}
                isLastItem={items.length <= 3}
              />
              {parsearMonto(item.valorUnitario) > 0 && (
                <div className="text-right text-sm text-slate-400 md:pr-10">
                  Subtotal: {formatearMonto(parsearMonto(item.valorUnitario) * item.cantidad)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <button
          type="button"
          onClick={agregarItem}
          className="px-4 py-2 text-white bg-orange-700 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          <span className="flex items-center justify-center gap-2">
            <span>+</span>
            <span>Agregar Artículo</span>
          </span>
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-orange-700 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          Calcular
        </button>
        <button
          type="button"
          onClick={onLimpiar}
          className="px-4 py-2 text-slate-300 bg-slate-300/20 hover:bg-slate-100/30 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          Limpiar
        </button>
      </div>
    </form>
  );
};

export default FormularioItems;