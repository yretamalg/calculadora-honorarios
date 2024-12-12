// src/core/pdf/generators/porcentajesPDF.js
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { formatearMonto } from '@/core/formatters/formatters';
import { agregarFooter, generarEncabezado } from '@/core/pdf/components/common';

export const generarPDFPorcentaje = (datos) => {
  const doc = new jsPDF();

  const obtenerTitulo = (tipo) => {
    switch (tipo) {
      case 1: return 'Calcular Porcentaje de un Número';
      case 2: return 'Encontrar Total desde Porcentaje';
      case 3: return 'Porcentaje entre Números';
      case 4: return 'Porcentaje del Total';
      case 5: return 'Cálculo de Precio con Descuento';
      case 6: return 'Cálculo de Precio con Aumento';
      case 7: return 'Cálculo de Variación Porcentual';
      default: return 'Cálculo de Porcentaje';
    }
  };

  const generarCuerpoTabla = () => {
    switch (datos.tipo) {
      case 1:
        return [
          ['Porcentaje', `${datos.porcentaje}%`],
          ['Número Base', formatearMonto(datos.cantidad)],
          ['Resultado', formatearMonto(datos.resultado)]
        ];
      case 2:
        return [
          ['Porcentaje Conocido', `${datos.porcentaje}%`],
          ['Cantidad Conocida', formatearMonto(datos.valorConocido)],
          ['Total Calculado', formatearMonto(datos.resultado)]
        ];
      case 3:
        return [
          ['Porcentaje Base', `${datos.porcentajeConocido}%`],
          ['Valor Base', formatearMonto(datos.valorConocido)],
          ['Porcentaje Objetivo', `${datos.porcentajeObjetivo}%`],
          ['Resultado', formatearMonto(datos.resultado)]
        ];
      case 4:
        return [
          ['Total', formatearMonto(datos.total)],
          ['Cantidad', formatearMonto(datos.cantidad)],
          ['Porcentaje Calculado', `${datos.resultado}%`]
        ];
      case 5:
        return [
          ['Precio Original', formatearMonto(datos.precioInicial)],
          ['Porcentaje de Descuento', `${datos.descuento}%`],
          ['Monto del Descuento', formatearMonto(datos.montoDescuento)],
          ['Precio Final', formatearMonto(datos.resultado)]
        ];
      case 6:
        return [
          ['Precio Original', formatearMonto(datos.precioInicial)],
          ['Porcentaje de Aumento', `${datos.aumento}%`],
          ['Monto del Aumento', formatearMonto(datos.montoAumento)],
          ['Precio Final', formatearMonto(datos.resultado)]
        ];
      case 7:
        return [
          ['Valor Inicial', formatearMonto(datos.valorInicial)],
          ['Valor Final', formatearMonto(datos.valorFinal)],
          ['Variación Absoluta', formatearMonto(datos.variacionAbsoluta)],
          ['Variación Porcentual', `${datos.resultado}%`]
        ];
      default:
        return [['No hay datos disponibles', '']];
    }
  };

  try {
    // Agregar logo usando scale
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
  
  try {
    generarEncabezado(doc, { 
      titulo: obtenerTitulo(datos.tipo)
    });

    doc.autoTable({
      startY: 60,
      head: [['Detalle', 'Valor']],
      body: generarCuerpoTabla(),
      theme: 'grid',
      headStyles: { fillColor: [255, 87, 34] },
      styles: { fontSize: 12, cellPadding: 5 },
      columnStyles: {
        0: { cellWidth: 100 },
        1: { cellWidth: 80, halign: 'right' }
      }
    });

    agregarFooter(doc);

    const nombreArchivo = `calculo-${datos.tipo === 5 ? 'descuento' : 
                                    datos.tipo === 6 ? 'aumento' : 
                                    datos.tipo === 7 ? 'variacion' : 
                                    'porcentaje'}.pdf`;
    doc.save(nombreArchivo);
    
    return true;
  } catch (error) {
    console.error('Error generando PDF:', error);
    return false;
  }
};

export default generarPDFPorcentaje;