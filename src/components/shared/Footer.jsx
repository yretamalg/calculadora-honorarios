import { useState } from 'react';
import { APP_CONFIG } from '../../constants/config';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const year = new Date().getFullYear();

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const socialLinks = [
    {
      name: 'Twitter',
      url: `https://twitter.com/${APP_CONFIG.social.twitter}`,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    },
    {
      name: 'GitHub',
      url: `https://github.com/${APP_CONFIG.social.github}`,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: APP_CONFIG.social.linkedin,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    }
  ];

  return (
    <footer className="text-white py-8 mt-8">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-6">
          <img src="/logoyr.svg" alt="Y.R. Logo" className="mx-auto h-[40px] w-[40px] mb-4" />
          <h2 className="text-lg font-semibold mb-2">{APP_CONFIG.nombre}</h2>
          <p className="text-xs text-gray-400">
            © {year} Todos los derechos reservados | Versión {APP_CONFIG.version} <br />
            No tenemos ninguna relación con el SII.cl
          </p>
        </div>

        <div className="flex justify-center space-x-6 mb-6">
          {socialLinks.map(social => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              title={`Síguenos en ${social.name}`}
            >
              {social.icon}
            </a>
          ))}
        </div>

        <div className="flex justify-center space-x-4 mb-6">
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
            Contacto</a>
        </div>

        <div className="flex justify-center items-center space-x-4">
          <img 
            src="/chileflag.svg" 
            alt="Bandera de Chile" 
            className="w-[20px]" 
          />
          <span className="text-xs text-gray-400">Hecho en Chile</span>
        </div>
      </div>

      {/* Modal de Contacto */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div 
            className="bg-slate-800 rounded-lg p-6 relative max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold"
              aria-label="Cerrar"
            >
              ×
            </button>
            
            <div className="text-center space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Contacto</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-300 mb-2">Correo electrónico:</p>
                  <a 
                    href={`mailto:${APP_CONFIG.contactEmail}`}
                    className="text-orange-500 hover:text-orange-400 font-semibold"
                  >
                    {APP_CONFIG.contactEmail}
                  </a>
                </div>
                
                <div>
                  <p className="text-gray-300 mb-2">Redes sociales:</p>
                  <div className="flex justify-center space-x-4">
                    {socialLinks.map(social => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                        title={`Visitar ${social.name}`}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700">
                <p className="text-sm text-gray-400">
                  También puedes encontrarnos en GitHub donde mantenemos el código abierto de esta aplicación.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;