const BotonesControl = ({ onCalcular, onLimpiar }) => {
  return (
    <div className="flex gap-4">
      <button
        onClick={onCalcular}
        className="flex-1 px-4 py-2 text-white bg-orange-700 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
      >
        Calcular
      </button>
      <button
        onClick={onLimpiar}
        className="flex-1 px-4 py-2 text-gray-900 bg-slate-300 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Limpiar
      </button>
    </div>
  );
};

export default BotonesControl;