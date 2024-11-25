// components/Footer.jsx
import React from 'react';

const appVersion = '1.01';

export const Footer = () => {
  return (
    <footer className="text-white py-4 mt-8">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-2">
          <img src="/logoyr.svg" alt="Logo" className="mx-auto h-[40px] w-[40px] mb-2" />
          <p className="text-xs text-gray-400">
            © 2024 Todos los derechos reservados | Versión {appVersion}
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
  );
};

export default Footer;