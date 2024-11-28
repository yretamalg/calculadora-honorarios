import React from 'react';

const ItemLista = ({ item, onUpdate, onDelete, isLastItem }) => {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="text"
        value={item.descripcion}
        onChange={(e) => onUpdate(item.id, 'descripcion', e.target.value)}
        placeholder="Descripción"
        className="flex-grow bg-slate-700 text-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
      />
      <input
        type="number"
        value={item.cantidad}
        onChange={(e) => onUpdate(item.id, 'cantidad', parseInt(e.target.value) || 1)}
        min="1"
        className="w-20 bg-slate-700 text-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
      />
      <input
        type="text"
        value={item.valorUnitario}
        onChange={(e) => onUpdate(item.id, 'valorUnitario', e.target.value)}
        placeholder="$ 0"
        className="w-32 bg-slate-700 text-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
      />
      <button
        onClick={() => onDelete(item.id)}
        className="p-2 text-red-400 hover:text-red-300 focus:outline-none disabled:opacity-50"
        disabled={isLastItem}
      >
        ×
      </button>
    </div>
  );
};

export default ItemLista;