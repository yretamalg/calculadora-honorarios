import React, { useState } from 'react';
import { APP_CONFIG } from '../constants/config';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
              © 2024 Todos los derechos reservados | Versión {APP_CONFIG.version} <br />
              No tenemos ninguna relación con el SII.cl
            </p>
          </div>
          <div className="flex justify-center space-x-4">
            <a 
              href="/terminos-de-uso"
              className="text-xs text-gray-300 hover:text-white transition-colors duration-300"
            >
              Términos de Uso
            </a>
            <a
              href="/politica-de-privacidad"
              className="text-xs text-gray-300 hover:text-white transition-colors duration-300"
            >
              Privacidad
            </a>
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
            className="bg-slate-800 rounded-lg p-6 relative"
            style={{ width: '500px', height: '400px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold"
              aria-label="Cerrar"
            >
              ×
            </button>
            <div className="text-center h-full flex items-center justify-center">
              <p className="text-lg font-semibold text-gray-300">
                hola@vbox.pro
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;