import React, { useState } from 'react';
import Link from 'next/link';

export const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const appVersion = '1.1.4';

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <footer className="text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-2">
            <img src="/logoyr.svg" alt="Y.R. Logo" className="mx-auto h-[40px] w-[40px] mb-2" />
            <p className="text-xs text-gray-400">
              © 2024 Todos los derechos reservados | Versión {appVersion} <br />
              No tenemos ninguna relación con el SII.cl
            </p>
          </div>
          <div className="flex justify-center space-x-4">
            <Link 
              href="/terminos-de-uso"
              className="text-xs text-gray-300 hover:text-white transition-colors duration-300"
            >
              Términos de Uso
            </Link>
            <Link
              href="/politica-de-privacidad"
              className="text-xs text-gray-300 hover:text-white transition-colors duration-300"
            >
              Privacidad
            </Link>
            <a 
              href="#" 
              onClick={openModal}
              className="text-xs text-gray-300 hover:text-white transition-colors duration-300"
            >
              Contacto
            </a>
          </div>
          <div className="flex justify-center mt-2">
            <img 
              src="/chileflag.svg" 
              alt="Chile Flag" 
              className="w-[20px] mx-auto" 
            />
          </div>
        </div>
      </footer>

      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div 
            className="bg-slate-800 rounded-lg p-6"
            style={{ width: '500px', height: '400px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center h-full flex flex-col justify-center">
              <h2 className="text-gray-300 text-xl font-bold mb-4">Contáctanos</h2>
              <p className="text-lg font-semibold text-orange-600 mb-4">
                hola@vbox.pro
              </p>
              <p className="text-sm text-gray-300 mb-6">
                Estamos disponibles para responder tus preguntas
              </p>
              <button 
                onClick={closeModal}
                className="bg-orange-600 text-white px-4 py-2 hover:bg-orange-400 transition-colors rounded-full box-content w-32 mx-auto"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;