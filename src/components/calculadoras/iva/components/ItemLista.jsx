import React from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { formatearMonto, parsearMonto } from '@/core/formatters/formatters';

const ItemLista = ({ item, onUpdate, onDelete, isLastItem }) => {
  const { trackCalculator } = useAnalytics();

  const handleMontoChange = (e) => {
    let valor = e.target.value;
    
    // Si está vacío, resetear el valor
    if (valor === '') {
      trackCalculator('iva_item_clear', {
        item_id: item.id,
        campo: 'valorUnitario'
      });
      
      onUpdate(item.id, 'valorUnitario', '');
      return;
    }

    // Remover todo excepto números
    const numeroLimpio = valor.replace(/[^\d]/g, '');
    if (!numeroLimpio) {
      onUpdate(item.id, 'valorUnitario', '');
      return;
    }

    // Convertir a número y formatear
    const numero = parseInt(numeroLimpio);
    const valorFormateado = formatearMonto(numero);
    onUpdate(item.id, 'valorUnitario', valorFormateado);

    trackCalculator('iva_item_value_change', {
      item_id: item.id,
      valor: numero,
      tiene_descripcion: Boolean(item.descripcion)
    });
  };

  const handleCantidadChange = (e) => {
    const cantidad = parseInt(e.target.value) || 1;
    onUpdate(item.id, 'cantidad', cantidad);

    trackCalculator('iva_item_quantity_change', {
      item_id: item.id,
      cantidad,
      tiene_valor: Boolean(item.valorUnitario)
    });
  };

  const handleDescripcionChange = (e) => {
    const descripcion = e.target.value;
    onUpdate(item.id, 'descripcion', descripcion);

    if (descripcion) {
      trackCalculator('iva_item_description_update', {
        item_id: item.id,
        longitud_descripcion: descripcion.length,
        tiene_valor: Boolean(item.valorUnitario)
      });
    }
  };

  const handleKeyPress = (e) => {
    // Permitir solo números y teclas de control
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    const isNumber = /\d/.test(e.key);
    const isAllowedKey = allowedKeys.includes(e.key);
    
    if (!isNumber && !isAllowedKey) {
      e.preventDefault();
    }
  };

  return (
    <div className="space-y-2 md:space-y-0 p-2 bg-slate-700/30 rounded-lg md:bg-transparent">
      {/* Vista móvil */}
      <div className="md:hidden space-y-2">
        <input
          type="text"
          value={item.descripcion}
          onChange={handleDescripcionChange}
          placeholder="Descripción"
          className="w-full bg-slate-700 text-white border border-gray-300 rounded-md 
                   shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 
                   focus:border-orange-500 text-sm"
        />
        <div className="flex gap-2">
          <input
            type="number"
            value={item.cantidad}
            onChange={handleCantidadChange}
            min="1"
            className="w-1/2 bg-slate-700 text-white border border-gray-300 rounded-md 
                     shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 
                     focus:border-orange-500 text-sm text-center"
          />
          <input
            type="text"
            value={item.valorUnitario}
            onChange={handleMontoChange}
            onKeyDown={handleKeyPress}
            placeholder={formatearMonto(0)}
            className="w-1/2 bg-slate-700 text-white border border-gray-300 rounded-md 
                     shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 
                     focus:border-orange-500 text-sm"
          />
        </div>
      </div>

      {/* Vista desktop */}
      <div className="hidden md:grid md:grid-cols-[1fr,80px,120px,40px] gap-2 items-center">
        <input
          type="text"
          value={item.descripcion}
          onChange={handleDescripcionChange}
          placeholder="Descripción"
          className="w-full bg-slate-700 text-white border border-gray-300 rounded-md 
                   shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 
                   focus:border-orange-500 text-sm"
        />
        <input
          type="number"
          value={item.cantidad}
          onChange={handleCantidadChange}
          min="1"
          className="w-full bg-slate-700 text-white border border-gray-300 rounded-md 
                   shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 
                   focus:border-orange-500 text-sm text-center"
        />
        <input
          type="text"
          value={item.valorUnitario}
          onChange={handleMontoChange}
          onKeyDown={handleKeyPress}
          placeholder={formatearMonto(0)}
          className="w-full bg-slate-700 text-white border border-gray-300 rounded-md 
                   shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 
                   focus:border-orange-500 text-sm"
        />
        {!isLastItem && (
          <button
            onClick={() => {
              trackCalculator('iva_item_delete_click', {
                item_id: item.id,
                tiene_valor: Boolean(item.valorUnitario),
                tiene_descripcion: Boolean(item.descripcion)
              });
              onDelete(item.id);
            }}
            className="p-2 text-slate-400 hover:text-slate-300 focus:outline-none"
            title="Eliminar ítem"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemLista;