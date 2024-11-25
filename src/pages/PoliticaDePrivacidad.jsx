// pages/PoliticaDePrivacidad.jsx
import React from 'react';

export const PoliticaDePrivacidad = () => {
  return (
    <div className="container mx-auto p-6 bg-slate-800 rounded-lg shadow-lg">
      <h1 className="text-slate-300 text-2xl font-bold mb-6">Política de Privacidad</h1>
      <div className="space-y-4 text-slate-400">
        <p>
          Nos comprometemos a proteger la privacidad de nuestros usuarios. Esta política describe cómo recopilamos, utilizamos y protegemos la información personal que nos proporciona.
        </p>
        <p>
          Recopilamos únicamente la información necesaria para brindarle el servicio de la Calculadora de Honorarios, como el monto y la tasa de retención. Esta información no se compartirá ni se utilizará para ningún otro fin.
        </p>
        <p>
          Implementamos medidas de seguridad adecuadas para proteger su información contra accesos no autorizados, uso indebido o divulgación.
        </p>
        <p>
          Si tiene alguna pregunta o inquietud sobre nuestra política de privacidad, no dude en ponerse en contacto con nuestro equipo de soporte.
        </p>
      </div>
    </div>
  );
};

export default PoliticaDePrivacidad;