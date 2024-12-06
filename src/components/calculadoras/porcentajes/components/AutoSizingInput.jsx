import React, { useState, useRef, useEffect } from 'react';

const AutoSizingInput = ({ 
  value, 
  onChange, 
  className = "", 
  placeholder = "0",
  min = 1,
  max = 999999999999,
  ...props 
}) => {
  const [width, setWidth] = useState('6ch');
  const measureRef = useRef(null);

  // Función para formatear número con separadores de miles
  const formatNumber = (num) => {
    return new Intl.NumberFormat('es-CL').format(num);
  };

  // Función para desformatear el número (quitar separadores)
  const unformatNumber = (str) => {
    return str.replace(/\D/g, '');
  };

  useEffect(() => {
    if (measureRef.current) {
      const textWidth = Math.max(measureRef.current.offsetWidth, 70);
      setWidth(`${textWidth}px`);
    }
  }, [value]);

  const handleChange = (e) => {
    const rawValue = unformatNumber(e.target.value);
    if (rawValue.length <= 15) { // Limitar a 15 dígitos
      const numValue = parseInt(rawValue || '0', 10);
      if (!rawValue || (numValue >= min && numValue <= max)) {
        // Solo formateamos si hay un valor
        const formattedValue = rawValue ? formatNumber(numValue) : '';
        onChange(formattedValue);
      }
    }
  };

  return (
    <div className="relative inline-block">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        style={{ width }}
        className={`min-w-[6ch] bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-center text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${className}`}
        placeholder={placeholder}
        {...props}
      />
      <div
        ref={measureRef}
        className="absolute invisible whitespace-pre px-3"
        style={{
          fontFamily: 'inherit',
          fontSize: 'inherit',
          fontWeight: 'inherit'
        }}
      >
        {value || placeholder}
      </div>
    </div>
  );
};

export default AutoSizingInput;