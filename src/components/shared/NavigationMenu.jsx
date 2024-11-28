const NavigationMenu = () => {
    return (
      <nav className="bg-slate-900 py-3 mb-6 border-b border-slate-700">
        <div className="container mx-auto px-4 max-w-4xl flex items-center justify-between">
          <a 
            href="/" 
            className="text-slate-300 hover:text-white transition-colors"
          >
            <div className="flex items-center space-x-2">
              <img src="/logoyr.svg" alt="Logo" className="h-8 w-8" />
              <span className="font-semibold">vBox Pro</span>
            </div>
          </a>
          <div className="flex space-x-4">
            <a 
              href="/honorarios" 
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              Retención
            </a>
            <a 
              href="/iva" 
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              IVA
            </a>
          </div>
        </div>
      </nav>
    );
  };
  
  export default NavigationMenu;