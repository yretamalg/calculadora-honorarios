import { useState } from 'react';
import FormularioIngreso from './FormularioIngreso';
import BotonesControl from './BotonesControl';
import ResultadosCalculo from './ResultadosCalculo';
import ShareButtons from './ShareButtons';
import Footer from './Footer';
import { TASAS_RETENCION, parsearMonto, calcularMontos } from '../constants/config';

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
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow mt-5">
        <div className="container max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-slate-800 rounded-lg shadow-xl p-4 sm:p-6">
            <h1 className="text-slate-300 text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">
              Calculadora de Retención de Honorarios
            </h1>
            <div className="space-y-6">
              <FormularioIngreso
                monto={monto}
                tasaRetencion={tasaRetencion}
                onMontoChange={setMonto}
                onTasaChange={setTasaRetencion}
                tasasRetencion={TASAS_RETENCION.map(t => ({
                  valor: t.valor.toString(),
                  etiqueta: t.etiqueta
                }))}
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
        </div>
      </div>
      <div className="w-full mt-auto">
        <div className="pb-2.5">
          <ShareButtons />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default CalculadoraRetencion;