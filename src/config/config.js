import { parsearMonto } from '../core/formatters/formatters';

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
    // Encontrar la tasa seleccionada en la lista de tasas
    const tasa = TASAS_RETENCION.find(t => t.valor.toString() === tasaSeleccionada.toString());
    
    // Si no se encuentra la tasa, retornar valores en cero
    if (!tasa) return { 
        desdeValoresLiquidos: { bruto: 0, retencion: 0, liquido: 0 },
        desdeValoresBrutos: { bruto: 0, retencion: 0, liquido: 0 }
    };
    
    // Cálculo desde valores líquidos
    // Si quiero recibir X líquido, ¿cuánto debe ser el bruto?
    const montoBrutoDesdeLiquido = Math.round(montoIngresado / (1 - (tasa.valor / 100)));
    const retencionDesdeLiquido = Math.round(montoBrutoDesdeLiquido * (tasa.valor / 100));
    const liquidoFinalDesdeLiquido = montoBrutoDesdeLiquido - retencionDesdeLiquido;
    
    // Cálculo desde valores brutos
    // Si el monto bruto es X, ¿cuánto recibiré líquido?
    const retencionDesdeBruto = Math.round(montoIngresado * (tasa.valor / 100));
    const liquidoDesdeBruto = montoIngresado - retencionDesdeBruto;
    
    return {
        desdeValoresLiquidos: {
            bruto: montoBrutoDesdeLiquido,
            retencion: retencionDesdeLiquido,
            liquido: liquidoFinalDesdeLiquido
        },
        desdeValoresBrutos: {
            bruto: montoIngresado,
            retencion: retencionDesdeBruto,
            liquido: liquidoDesdeBruto
        }
    };
};