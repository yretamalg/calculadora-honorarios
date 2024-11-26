import Head from 'next/head';
import React from 'react';

export const SEO = ({ 
  title = 'Calculadora de Retención de Honorarios', 
  description = 'Calcula fácilmente tu retención de honorarios para profesionales en Chile. Conoce tu monto bruto, líquido y retención según las tasas vigentes.',
  keywords = 'retención de honorarios, calculadora tributaria, impuestos chile, boleta de honorarios, sii chile',
  canonical = 'https://www.vbox.pro'
}) => {
  return (
    <Head>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="/logoyr.svg" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content="/logoyr.svg" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      
      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#FF5722" />
    </Head>
  );
};

export default SEO;