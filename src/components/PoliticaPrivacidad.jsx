import React from 'react';

const PoliticaPrivacidad = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white mb-8">Política de Privacidad</h1>

      <section className="bg-slate-800 rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold text-orange-500">1. Recopilación y Uso de Datos</h2>
        
        <div className="space-y-4">
          <div className="bg-slate-700 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-2">1.1 Análisis y Métricas</h3>
            <p className="text-slate-300">
              Utilizamos Google Analytics para mejorar la experiencia del usuario y comprender el uso de nuestras calculadoras. Recopilamos:
            </p>
            <ul className="list-disc pl-6 mt-2 text-slate-300 space-y-1">
              <li>Patrones de uso y navegación</li>
              <li>Información del dispositivo y navegador</li>
              <li>País de origen y lenguaje</li>
              <li>Tiempo de permanencia en el sitio</li>
            </ul>
          </div>

          <div className="bg-slate-700 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-2">1.2 Datos de Cálculo</h3>
            <p className="text-slate-300">Los cálculos se procesan localmente en tu navegador. No almacenamos:</p>
            <ul className="list-disc pl-6 mt-2 text-slate-300 space-y-1">
              <li>Montos ingresados en calculadoras</li>
              <li>Resultados de cálculos</li>
              <li>Información de boletas/facturas</li>
              <li>Datos personales o tributarios</li>
            </ul>
          </div>

          <div className="bg-slate-700 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-2">1.3 Exportación de Datos</h3>
            <ul className="list-disc pl-6 text-slate-300 space-y-1">
              <li>Permitimos exportar resultados a PDF</li>
              <li>Los PDFs se generan localmente</li>
              <li>No almacenamos copias de los documentos generados</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-slate-800 rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold text-orange-500">2. Almacenamiento y Cookies</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-slate-700 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-2">2.1 Cookies Analíticas</h3>
            <ul className="list-disc pl-6 text-slate-300 space-y-1">
              <li>Google Analytics utiliza cookies para análisis</li>
              <li>No contienen información personal</li>
              <li>Pueden desactivarse desde el navegador</li>
            </ul>
          </div>

          <div className="bg-slate-700 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-2">2.2 Almacenamiento Local</h3>
            <ul className="list-disc pl-6 text-slate-300 space-y-1">
              <li>Usado para preferencias de visualización</li>
              <li>No almacena datos sensibles</li>
              <li>Se limpia al cerrar el navegador</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-slate-800 rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold text-orange-500">3. Seguridad</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-slate-700 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-2">3.1 Medidas Implementadas</h3>
            <ul className="list-disc pl-6 text-slate-300 space-y-1">
              <li>Conexión HTTPS para toda la aplicación</li>
              <li>Procesamiento local de cálculos</li>
              <li>Sin almacenamiento de datos sensibles</li>
              <li>Actualizaciones regulares de seguridad</li>
            </ul>
          </div>

          <div className="bg-slate-700 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-2">3.2 Compartir Contenido</h3>
            <ul className="list-disc pl-6 text-slate-300 space-y-1">
              <li>Funciones de compartir en redes sociales</li>
              <li>Solo se comparten URLs, no datos de cálculos</li>
              <li>Integración con redes sociales principales</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 bg-slate-700 p-4 rounded-lg">
          <p className="text-sm text-slate-300">
            <span className="text-orange-400 font-semibold">Importante:</span> Para preguntas sobre privacidad o para ejercer tus derechos sobre tus datos, contáctanos a través del formulario en el pie de página o escribe directamente a hola@vbox.pro
          </p>
        </div>
      </section>
    </div>
  );
};

export default PoliticaPrivacidad;