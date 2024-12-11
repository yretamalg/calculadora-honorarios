import React from 'react';
import { formatearMonto, parsearMonto } from '../../../../core/formatters/formatters';

const ItemLista = ({ item, onUpdate, onDelete, isLastItem }) => {
  const handleMontoChange = (e) => {
    let valor = e.target.value;
    
    // Si está vacío, resetear el valor
    if (valor === '') {
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
    onUpdate(item.id, 'valorUnitario', formatearMonto(numero));
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
          onChange={(e) => onUpdate(item.id, 'descripcion', e.target.value)}
          placeholder="Descripción"
          className="w-full bg-slate-700 text-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm"
        />
        <div className="flex gap-2">
          <input
            type="number"
            value={item.cantidad}
            onChange={(e) => onUpdate(item.id, 'cantidad', parseInt(e.target.value) || 1)}
            min="1"
            className="w-1/2 bg-slate-700 text-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm text-center"
          />
          <input
            type="text"
            value={item.valorUnitario}
            onChange={handleMontoChange}
            onKeyDown={handleKeyPress}
            onFocus={(e) => {
              if (!e.target.value) {
                onUpdate(item.id, 'valorUnitario', formatearMonto(0));
              }
              const temp = e.target.value;
              e.target.value = '';
              e.target.value = temp;
            }}
            onBlur={(e) => {
              if (e.target.value === formatearMonto(0)) {
                onUpdate(item.id, 'valorUnitario', '');
              }
            }}
            placeholder={formatearMonto(0)}
            className="w-1/2 bg-slate-700 text-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm"
          />
        </div>
      </div>

      {/* Vista desktop */}
      <div className="hidden md:grid md:grid-cols-[1fr,80px,120px,40px] gap-2 items-center">
        <input
          type="text"
          value={item.descripcion}
          onChange={(e) => onUpdate(item.id, 'descripcion', e.target.value)}
          placeholder="Descripción"
          className="w-full bg-slate-700 text-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm"
        />
        <input
          type="number"
          value={item.cantidad}
          onChange={(e) => onUpdate(item.id, 'cantidad', parseInt(e.target.value) || 1)}
          min="1"
          className="w-full bg-slate-700 text-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm text-center"
        />
        <input
          type="text"
          value={item.valorUnitario}
          onChange={handleMontoChange}
          onKeyDown={handleKeyPress}
          onFocus={(e) => {
            if (!e.target.value) {
              onUpdate(item.id, 'valorUnitario', formatearMonto(0));
            }
            const temp = e.target.value;
            e.target.value = '';
            e.target.value = temp;
          }}
          onBlur={(e) => {
            if (e.target.value === formatearMonto(0)) {
              onUpdate(item.id, 'valorUnitario', '');
            }
          }}
          placeholder={formatearMonto(0)}
          className="w-full bg-slate-700 text-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm"
        />
        {!isLastItem && (
          <button
            onClick={() => onDelete(item.id)}
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