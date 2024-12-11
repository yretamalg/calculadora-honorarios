import { useState } from 'react';
import FormularioIngreso from './components/FormularioIngreso';
import BotonesControl from '../../../shared/ui/BotonesControl';
import ResultadosCalculo from './components/ResultadosCalculo';
import NavigationMenu from '../../../layouts/components/NavigationMenu';
import ShareButtons from '../../../layouts/components/ShareButtons';
import { TASAS_RETENCION, calcularMontos } from '../../../config/config';

const CalculadoraRetencion = () => {
  const [monto, setMonto] = useState('');
  const [tasaRetencion, setTasaRetencion] = useState(TASAS_RETENCION[0].valor.toString());
  const [resultados, setResultados] = useState({
    desdeValoresLiquidos: {
      bruto: 0,
      retencion: 0,
      liquido: 0
    },
    desdeValoresBrutos: {
      bruto: 0,
      retencion: 0,
      liquido: 0
    }
  });

  const parsearMonto = (texto) => {
    if (!texto) return 0;
    // Remover el signo peso, los puntos y los espacios
    const numeroLimpio = texto.replace(/[$\s.]/g, '');
    return parseInt(numeroLimpio) || 0;
  };

  const calcular = () => {
    const montoNumerico = parsearMonto(monto);
    if (!montoNumerico) return;

    const resultadosCalculados = calcularMontos(montoNumerico, tasaRetencion);
    setResultados(resultadosCalculados);
  };

  const limpiar = () => {
    setMonto('');
    setTasaRetencion(TASAS_RETENCION[0].valor.toString());
    setResultados({
      desdeValoresLiquidos: {
        bruto: 0,
        retencion: 0,
        liquido: 0
      },
      desdeValoresBrutos: {
        bruto: 0,
        retencion: 0,
        liquido: 0
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu />
      <div className="flex-grow container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800 rounded-lg shadow-xl p-6 mb-6">
            <h1 className="text-slate-300 text-2xl font-bold text-center mb-6">
              Retención Boleta Honorarios 2024-2028
            </h1>
            <div className="space-y-6">
              <FormularioIngreso
                monto={monto}
                tasaRetencion={tasaRetencion}
                onMontoChange={setMonto}
                onTasaChange={setTasaRetencion}
                tasasRetencion={TASAS_RETENCION}
              />
              <BotonesControl
                onCalcular={calcular}
                onLimpiar={limpiar}
              />
              <ResultadosCalculo
                resultados={resultados}
                tasaRetencion={tasaRetencion}
              />
            </div>
          </div>
          <div className="mb-6">
            <ShareButtons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculadoraRetencion;