// pages/TerminosDeUso.jsx
import React from 'react';

export const TerminosDeUso = () => {
  return (
    <div className="container mx-auto p-6 bg-slate-800 rounded-lg shadow-lg">
      <h1 className="text-slate-300 text-2xl font-bold mb-6">Términos de Uso</h1>
      <div className="space-y-4 text-slate-400">
        <p>
          Bienvenido a nuestra Calculadora de Honorarios. Al utilizar este servicio, aceptas estar sujeto a estos términos y condiciones.
        </p>
        <p>
          Usted es responsable de proporcionar información precisa y actualizada al utilizar la calculadora. No nos hacemos responsables por cualquier daño o pérdida que surja del uso de esta herramienta.
        </p>
        <p>
          Nos reservamos el derecho de modificar estos términos en cualquier momento sin previo aviso. Es su responsabilidad revisar periódicamente los términos de uso.
        </p>
        <p>
          Si tiene alguna pregunta o inquietud, no dude en ponerse en contacto con nuestro equipo de soporte.
        </p>
      </div>
    </div>
  );
};

export default TerminosDeUso;