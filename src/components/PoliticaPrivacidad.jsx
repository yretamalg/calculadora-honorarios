import React from 'react';

const PoliticaPrivacidad = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white mb-8">Política de Privacidad</h1>

      <section className="bg-slate-800 rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold text-orange-500">1. Recopilación de Datos y Análisis</h2>
        <p className="text-slate-300">
          Utilizamos Google Analytics para mejorar la experiencia del usuario y entender cómo se utiliza nuestra calculadora. Esta herramienta recopila información anónima sobre:
        </p>
        <ul className="list-disc pl-6 text-slate-300 space-y-2">
          <li>Patrones de uso y navegación</li>
          <li>Información del dispositivo y navegador</li>
          <li>País de origen y lenguaje</li>
          <li>Tiempo de permanencia en el sitio</li>
        </ul>
        <p className="text-slate-300">
          Los datos recopilados son anónimos y no incluyen información personal ni los montos calculados.
        </p>
      </section>

      <section className="bg-slate-800 rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold text-orange-500">2. Cálculos y Datos Personales</h2>
        <div className="space-y-4">
          <p className="text-slate-300">
            Los cálculos realizados en la calculadora se procesan localmente en tu navegador. No almacenamos ni transmitimos:
          </p>
          <ul className="list-disc pl-6 text-slate-300 space-y-2">
            <li>Montos ingresados en las calculadoras</li>
            <li>Resultados de los cálculos</li>
            <li>Información de boletas o facturas</li>
            <li>Datos personales o tributarios</li>
          </ul>
          <div className="bg-slate-700 p-4 rounded-lg">
            <p className="text-sm text-slate-300">
              <span className="text-orange-400 font-semibold">Nota importante:</span> Toda la información ingresada en nuestras calculadoras permanece exclusivamente en tu dispositivo y se elimina al cerrar la página.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-800 rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold text-orange-500">3. Cookies y Almacenamiento Local</h2>
        <div className="space-y-4">
          <p className="text-slate-300">
            Utilizamos dos tipos de almacenamiento de datos:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-700 p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-2">Cookies de Analytics</h3>
              <p className="text-sm text-slate-300">
                Utilizadas por Google Analytics para análisis de uso. No contienen información personal y pueden desactivarse.
              </p>
            </div>
            <div className="bg-slate-700 p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-2">Almacenamiento Local</h3>
              <p className="text-sm text-slate-300">
                Usado para guardar preferencias de visualización y mejorar la experiencia de usuario.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-800 rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold text-orange-500">4. Seguridad y Protección de Datos</h2>
        <div className="space-y-4">
          <p className="text-slate-300">
            Implementamos las siguientes medidas de seguridad:
          </p>
          <ul className="list-disc pl-6 text-slate-300 space-y-2">
            <li>Conexión segura HTTPS para toda la aplicación</li>
            <li>Procesamiento local de todos los cálculos</li>
            <li>No almacenamiento de datos sensibles</li>
            <li>Actualizaciones regulares de seguridad</li>
          </ul>
          <div className="bg-slate-700 p-4 rounded-lg">
            <p className="text-sm text-slate-300">
              <span className="text-orange-400 font-semibold">Recomendación:</span> Te sugerimos guardar o imprimir los resultados de tus cálculos si necesitas conservarlos, ya que no se almacenan en nuestros sistemas.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-800 rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold text-orange-500">5. Control de Cookies</h2>
        <p className="text-slate-300">
          Puedes gestionar o desactivar las cookies de Google Analytics en cualquier momento:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-slate-700 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-2">Desde tu Navegador</h3>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>Chrome: Configuración → Privacidad y seguridad</li>
              <li>Firefox: Opciones → Privacidad & Seguridad</li>
              <li>Safari: Preferencias → Privacidad</li>
            </ul>
          </div>
          <div className="bg-slate-700 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-2">Complemento de Google</h3>
            <p className="text-sm text-slate-300">
              Instala el complemento de inhabilitación de Google Analytics disponible para los principales navegadores.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-800 rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold text-orange-500">6. Cambios en la Política</h2>
        <div className="space-y-4">
          <p className="text-slate-300">
            Nos reservamos el derecho de actualizar esta política de privacidad. Los cambios serán efectivos inmediatamente después de su publicación en esta página.
          </p>
          <div className="bg-slate-700 p-4 rounded-lg">
            <p className="text-sm text-slate-300">
              <span className="text-orange-400 font-semibold">Última actualización:</span> Noviembre 2024
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-800 rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold text-orange-500">7. Contacto</h2>
        <p className="text-slate-300">
          Si tienes preguntas sobre nuestra política de privacidad, puedes:
        </p>
        <ul className="list-disc pl-6 text-slate-300 space-y-2">
          <li>Usar el botón de contacto en el pie de página</li>
          <li>Escribirnos directamente a nuestro correo de soporte</li>
          <li>Utilizar el formulario de contacto en nuestra web</li>
        </ul>
      </section>
    </div>
  );
};

export default PoliticaPrivacidad;