const TipoIndicadorSelector = ({ tipoSeleccionado, onChange, disabled }) => {
    const tipos = [
      { id: 'UF', nombre: 'UF' },
      { id: 'DOLAR', nombre: 'Dólar' },
      { id: 'EURO', nombre: 'Euro' },
      { id: 'UTM', nombre: 'UTM' }
    ];
  
    return (
      <div> 
        {/* Mostrar el título */}
        <h3 className="text-lg text-slate-300 font-semibold mb-2">Selecciona el Indicador</h3> 
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2"> 
          {tipos.map(tipo => (
            <button 
              key={tipo.id} 
              onClick={() => onChange(tipo.id)} 
              disabled={disabled} 
              className={`p-3 rounded-lg text-sm font-medium transition-colors 
                ${tipoSeleccionado === tipo.id 
                  ? 'bg-orange-700 text-white hover:bg-orange-500' 
                  : 'bg-slate-400 text-slate-900 hover:bg-slate-300'
                } 
                disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {tipo.nombre}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default TipoIndicadorSelector;