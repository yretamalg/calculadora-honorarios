import { parsearMonto } from '../utils/formatters';

export const TASAS_RETENCION = [
    { 
      valor: 13.75, 
      etiqueta: '13,75% (año 2024)', 
      año: 2024,
      factor: 0.8625
    },
    { 
      valor: 14.50, 
      etiqueta: '14,50% (año 2025)', 
      año: 2025,
      factor: 0.855
    },
    { 
      valor: 15.25, 
      etiqueta: '15,25% (año 2026)', 
      año: 2026,
      factor: 0.8475
    },
    { 
      valor: 16.00, 
      etiqueta: '16,00% (año 2027)', 
      año: 2027,
      factor: 0.84
    },
    { 
      valor: 17.00, 
      etiqueta: '17,00% (año 2028)', 
      año: 2028,
      factor: 0.83
    }
];

export const LIMITES = {
    MIN_MONTO: 0,
    MAX_MONTO: 999999999999
};

export const APP_CONFIG = {
    nombre: 'vBox Pro',
    version: '1.5.9',
    domain: 'https://honorario.netlify.app/',
    contactEmail: 'hola@vbox.pro',
    social: {
        twitter: '@vboxpro'
    }
};

export const calcularMontos = (montoIngresado, tasaSeleccionada) => {
    const tasa = TASAS_RETENCION.find(t => t.valor.toString() === tasaSeleccionada.toString());
    
    if (!tasa) return { 
        desdeValoresLiquidos: { bruto: 0, retencion: 0, liquido: 0 },
        desdeValoresBrutos: { bruto: 0, retencion: 0, liquido: 0 }
    };
    
    // Para valores líquidos (cuando el monto ingresado es lo que quiero recibir)
    const montoBrutoDesdeLiquido = Math.round(montoIngresado / tasa.factor);
    const retencionDesdeLiquido = montoBrutoDesdeLiquido - montoIngresado;
    
    // Para valores brutos (cuando el monto ingresado es el total de la boleta)
    const retencionDesdeBruto = Math.round(montoIngresado * (tasa.valor / 100));
    const liquidoDesdeBruto = montoIngresado - retencionDesdeBruto;
    
    return {
        desdeValoresLiquidos: {
            bruto: montoBrutoDesdeLiquido,
            retencion: retencionDesdeLiquido,
            liquido: montoIngresado
        },
        desdeValoresBrutos: {
            bruto: montoIngresado,
            retencion: retencionDesdeBruto,
            liquido: liquidoDesdeBruto
        }
    };
};