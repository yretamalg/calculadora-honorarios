// src/core/pdf/index.js

// Import local components
import { agregarFooter, generarEncabezado } from './components/common';

// Import formatters
import { formatearMonto, formatearIndicador } from '../formatters/formatters';

// Import and re-export generators
export { default as generarPDFHonorarios } from './generators/honorariosPDF';
export { default as generarPDFIva } from './generators/ivaPDF';
export { default as generarPDFIndicadores } from './generators/indicadoresPDF';
export { default as generarPDFPorcentaje } from './generators/porcentajesPDF';

// Re-export common components
export { agregarFooter, generarEncabezado };