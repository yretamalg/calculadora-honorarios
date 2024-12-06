import { useState } from 'react';
import FormularioIngreso from './FormularioIngreso';
import BotonesControl from './BotonesControl';
import ResultadosCalculo from './ResultadosCalculo';
import NavigationMenu from '../../shared/NavigationMenu';
import ShareButtons from '../../shared/ShareButtons';
import { TASAS_RETENCION } from '../../../constants/config';
import { parsearMonto } from '../../../utils/formatters';

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

  const calcular = () => {
    const montoNumerico = parsearMonto(monto);
    if (!montoNumerico) return;

    const tasa = TASAS_RETENCION.find(t => t.valor.toString() === tasaRetencion);
    if (!tasa) return;
    
    const montoBrutoDesdeLiquido = Math.round(montoNumerico / tasa.factor);
    const retencionDesdeLiquido = montoBrutoDesdeLiquido - montoNumerico;
    
    const retencionDesdeBruto = Math.round(montoNumerico * (tasa.valor / 100));
    const liquidoDesdeBruto = montoNumerico - retencionDesdeBruto;
    
    setResultados({
      desdeValoresLiquidos: {
        bruto: montoBrutoDesdeLiquido,
        retencion: retencionDesdeLiquido,
        liquido: montoNumerico
      },
      desdeValoresBrutos: {
        bruto: montoNumerico,
        retencion: retencionDesdeBruto,
        liquido: liquidoDesdeBruto
      }
    });
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