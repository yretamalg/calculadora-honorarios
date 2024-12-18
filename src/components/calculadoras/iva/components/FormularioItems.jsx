import React from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { formatearMonto, parsearMonto } from '@/core/formatters/formatters';
import ItemLista from './ItemLista';

const FormularioItems = ({ items, setItems, onCalcular, onLimpiar }) => {
  const { trackCalculator } = useAnalytics();

  const agregarItem = () => {
    const nuevoItem = {
      id: items.length + 1,
      descripcion: '',
      cantidad: 1,
      valorUnitario: ''
    };
    setItems([...items, nuevoItem]);

    trackCalculator('iva_add_item', {
      num_items_total: items.length + 1,
      item_position: items.length + 1
    });
  };

  const eliminarItem = (id) => {
    if (items.length <= 3) {
      trackCalculator('iva_delete_blocked', {
        items_minimos: true,
        num_items: items.length
      });
      return;
    }

    const nuevosItems = items.filter(item => item.id !== id);
    setItems(nuevosItems);

    trackCalculator('iva_delete_item', {
      num_items_restantes: nuevosItems.length,
      item_position: id
    });
  };

  const actualizarItem = (id, campo, valor) => {
    const nuevosItems = items.map(item => {
      if (item.id === id) {
        const nuevoItem = { ...item, [campo]: valor };

        trackCalculator('iva_update_item', {
          item_id: id,
          campo_actualizado: campo,
          tiene_valor: valor !== '',
          valor_tipo: campo === 'valorUnitario' ? 'moneda' : 
                     campo === 'cantidad' ? 'numero' : 'texto'
        });

        return nuevoItem;
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
    
    trackCalculator('iva_submit', {
      items_totales: items.length,
      items_validos: itemsValidos.length,
      tiene_items_invalidos: itemsValidos.length < items.length
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
          className="px-4 py-2 text-white bg-orange-700 rounded-md hover:bg-orange-600 
                   focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          <span className="flex items-center justify-center gap-2">
            <span>+</span>
            <span>Agregar Artículo</span>
          </span>
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-orange-700 rounded-md hover:bg-orange-600 
                   focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          Calcular
        </button>
        <button
          type="button"
          onClick={() => {
            onLimpiar();
            trackCalculator('iva_clear_form', {
              items_limpiados: items.length
            });
          }}
          className="px-4 py-2 text-slate-300 bg-slate-300/20 hover:bg-slate-100/30 
                   rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          Limpiar
        </button>
      </div>
    </form>
  );
};

export default FormularioItems;