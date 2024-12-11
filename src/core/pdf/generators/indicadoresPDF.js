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
    // Si es conversión a pesos y es el valor destino
    if (resultado.direccion === 'to_clp' && esDestino) {
      return `$ ${valor.toLocaleString('es-CL')}`;
    }

    // Si es conversión desde pesos y es el valor origen
    if (resultado.direccion === 'from_clp' && !esDestino) {
      return `$ ${valor.toLocaleString('es-CL')}`;
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

  generarEncabezado(doc, { 
    titulo: `Conversión de ${getTipoConversion()}`
  });

  // Tabla de conversión
  doc.autoTable({
    startY: 45,
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
    // Definir estilos específicos para la última fila
    didParseCell: function(data) {
      if (data.row.index === 2) { // última fila
        data.cell.styles.fontSize = 10; // tamaño de letra más pequeño
        data.cell.styles.textColor = [128, 128, 128]; // color gris
      }
    }
  });

  // Ajustar el logo al final
  agregarFooter(doc, { logoWidth: 50, logoHeight: 50 });

  doc.save('conversion-indicadores.pdf');
};

export default generarPDFIndicadores;