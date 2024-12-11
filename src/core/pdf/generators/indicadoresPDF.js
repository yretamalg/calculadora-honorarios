// src/core/pdf/generators/indicadoresPDF.js

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { agregarFooter, generarEncabezado } from '../components/common';
import { formatearIndicador } from '../../formatters/formatters';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const generarPDFIndicadores = (resultado) => {
  const doc = new jsPDF();

  const getTipoConversion = () => {
    const nombreIndicador = {
      'UF': 'UF',
      'DOLAR': 'Dólar',
      'EURO': 'Euro',
      'UTM': 'UTM'
    }[resultado.tipoIndicador] || resultado.tipoIndicador;

    return resultado.direccion === 'to_clp' 
      ? `${nombreIndicador} a Pesos`
      : `Pesos a ${nombreIndicador}`;
  };

  const getMontoIngresadoLabel = () => {
    if (resultado.direccion === 'to_clp') {
      return `Monto Ingresado en ${resultado.tipoIndicador}`;
    } else {
      return 'Monto Ingresado en Pesos';
    }
  };

  const getMontoConvertidoLabel = () => {
    if (resultado.direccion === 'to_clp') {
      return 'Monto Convertido a Pesos';
    } else {
      return `Monto Convertido a ${resultado.tipoIndicador}`;
    }
  };

  const formatearValor = (valor, tipo, esDestino = false) => {
    // Si es pesos chilenos (ya sea origen o destino)
    const esPesos = (resultado.direccion === 'to_clp' && esDestino) || 
                   (resultado.direccion === 'from_clp' && !esDestino);
    
    if (esPesos) {
      return `$ ${Math.round(valor).toLocaleString('es-CL')}`;
    }

    // Para otros casos según el tipo
    switch (tipo) {
      case 'UF':
        return `UF ${valor.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      case 'UTM':
        return `UTM ${valor.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      case 'DOLAR':
        return `US$ ${valor.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      case 'EURO':
        return `€ ${valor.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      default:
        return `${valor.toLocaleString('es-CL')}`;
    }
  };

  // Formatear la fecha actual
  const fechaActual = format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: es });

  // Generar encabezado con título y fecha
  generarEncabezado(doc, { 
    titulo: `Conversión de ${getTipoConversion()}`
  });

  try {
    // Agregar logo en la esquina superior derecha usando scale
    doc.addImage(
      '/logoyr_gris.png',
      'PNG',
      100,
      235,
      undefined,
      undefined,
      undefined,
      'FAST',
      0.3
    );
  } catch (error) {
    console.warn('No se pudo cargar el logo:', error);
  }

  // Tabla de conversión
  doc.autoTable({
    startY: 80,
    head: [['Detalle', 'Valor']],
    body: [
      [getMontoIngresadoLabel(), formatearValor(resultado.montoOriginal, resultado.tipoIndicador, false)],
      [getMontoConvertidoLabel(), formatearValor(resultado.montoConvertido, resultado.tipoIndicador, true)],
      [
        `Valor ${resultado.tipoIndicador} (${fechaActual})`, 
        formatearValor(resultado.valorIndicador, resultado.tipoIndicador)
      ]
    ],
    theme: 'grid',
    headStyles: { fillColor: [255, 87, 34] },
    styles: { fontSize: 12 },
    columnStyles: {
      0: { cellWidth: 100 },
      1: { cellWidth: 80, halign: 'right' }
    },
    didParseCell: function(data) {
      if (data.row.index === 2) {
        data.cell.styles.fontSize = 10;
        data.cell.styles.textColor = [128, 128, 128];
      }
    }
  });

  // Agregar footer con disclaimer y logo
  agregarFooter(doc);

  doc.save('conversion-indicadores.pdf');
};

export default generarPDFIndicadores;