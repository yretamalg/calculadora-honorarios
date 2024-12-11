import React from 'react';
import NavigationMenu from '../../layouts/components/NavigationMenu';
import Footer from '../../layouts/components/Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;