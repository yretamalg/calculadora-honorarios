import React from 'react';

const ItemLista = ({ item, onUpdate, onDelete, isLastItem }) => {
  const handleMontoChange = (e) => {
    let valor = e.target.value;
    if (valor === '') {
      onUpdate(item.id, 'valorUnitario', '');
      return;
    }
    const montoNumerico = parsearMonto(valor);
    const montoFormateado = formatearMonto(montoNumerico);
    onUpdate(item.id, 'valorUnitario', montoFormateado);
  };

  return (
    <div className="relative space-y-2 md:space-y-0 p-2 bg-slate-700/30 rounded-lg md:bg-transparent">
      {/* Botón eliminar - Ahora en la esquina superior derecha para ambas vistas */}
      <button
        onClick={() => onDelete(item.id)}
        className="absolute top-2 right-2 p-2 text-red-400 hover:text-red-300 focus:outline-none disabled:opacity-50 z-10"
        disabled={isLastItem}
        title={isLastItem ? "No se puede eliminar el último ítem" : "Eliminar ítem"}
      >
        ×
      </button>

      {/* Vista móvil */}
      <div className="md:hidden space-y-2 pr-8"> {/* Añadido pr-8 para dar espacio al botón eliminar */}
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
            onFocus={(e) => {
              if (!e.target.value) {
                onUpdate(item.id, 'valorUnitario', '$ ');
              }
              const temp = e.target.value;
              e.target.value = '';
              e.target.value = temp;
            }}
            onBlur={(e) => {
              if (e.target.value === '$ ') {
                onUpdate(item.id, 'valorUnitario', '');
              }
            }}
            placeholder="$ 0"
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
          onFocus={(e) => {
            if (!e.target.value) {
              onUpdate(item.id, 'valorUnitario', '$ ');
            }
            const temp = e.target.value;
            e.target.value = '';
            e.target.value = temp;
          }}
          onBlur={(e) => {
            if (e.target.value === '$ ') {
              onUpdate(item.id, 'valorUnitario', '');
            }
          }}
          placeholder="$ 0"
          className="w-full bg-slate-700 text-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm"
        />
      </div>
    </div>
  );
};

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
        {/* Encabezados - Solo visibles en desktop */}
        <div className="hidden md:grid md:grid-cols-[1fr,80px,120px,40px] gap-2 text-sm text-slate-300 mb-2">
          <div>Descripción del artículo</div>
          <div className="text-center">Cantidad</div>
          <div className="text-center">Valor Unit.</div>
          <div></div>
        </div>

        {/* Items con subtotales */}
        {items.map((item, index) => (
          <div key={item.id} className="space-y-2">
            <ItemLista
              item={item}
              onUpdate={actualizarItem}
              onDelete={eliminarItem}
              isLastItem={items.length === 1}
            />
            {/* Subtotal por ítem - Ajustado para móvil */}
            {parsearMonto(item.valorUnitario) > 0 && (
              <div className="text-right text-sm text-slate-400 md:pr-10">
                Subtotal: {formatearMonto(parsearMonto(item.valorUnitario) * item.cantidad)}
              </div>
            )}
          </div>
        ))}
        
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-6">
          <button
            onClick={agregarItem}
            className="px-4 py-1.5 md:py-2 text-sm text-white bg-orange-700 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Agregar Artículo
          </button>
          <button
            onClick={onLimpiar}
            className="px-4 py-1.5 md:py-2 text-sm text-gray-900 bg-slate-300 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormularioItems;