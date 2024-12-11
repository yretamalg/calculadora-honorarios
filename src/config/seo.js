export const SEO_CONFIG = {
    defaultTitle: 'Calculadoras Tributarias Chile | vBox Pro',
    titleTemplate: '%s | vBox Pro',
    defaultDescription: 'Herramientas gratuitas para el cálculo de retención de honorarios, IVA y Porcentajes en Chile.',
    siteUrl: 'https://honorario.netlify.app',
    defaultImage: '/og-image.jpg',
    siteName: 'vBox Pro',
    locale: 'es_CL',
    type: 'website',
    twitter: {
      handle: '@vboxpro',
      site: '@vboxpro',
      cardType: 'summary_large_image',
    },
    facebook: {
      appId: ''
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: 'calculadora, retención, honorarios, iva, impuestos, chile, boleta, SII, porcentajes, uf, dolar, utm'
      },
      {
        name: 'author',
        content: 'vBox Pro'
      }
    ],
    languageAlternates: [
      {
        hrefLang: 'es-CL',
        href: 'https://honorario.netlify.app'
      }
    ]
  };
  
  export const PAGE_METADATA = {
    home: {
      title: 'Calculadoras Tributarias Chile',
      description: 'Herramientas gratuitas para el cálculo de retención de honorarios, IVA y Porcentajes en Chile.',
      path: '/',
      priority: '1.0',
      image: '/og-image.jpg'
    },
    honorarios: {
      title: 'Calculadora de Retención de Honorarios 2024-2028',
      description: 'Calcula fácilmente tu retención de honorarios según las tasas vigentes 2024-2028.',
      path: '/honorarios',
      priority: '1.0',
      image: '/og-image.jpg'
    },
    iva: {
      title: 'Calculadora de IVA Facturas Chile',
      description: 'Calcula el IVA de tus facturas (19%) para tus productos y servicios en Chile.',
      path: '/iva',
      priority: '1.0',
      image: '/og-image.jpg'
    },
    porcentajes: {
      title: 'Calculadora de Porcentajes',
      description: 'Calcula diferentes tipos de porcentajes para tus finanzas personales y profesionales.',
      path: '/porcentajes',
      priority: '1.0',
      image: '/og-image.jpg'
    },
    indicadores: {
      title: 'Calculadora UF, Dólar y UTM',
      description: 'Convierte entre UF, Dólar, Euro, UTM y Pesos Chilenos con valores actualizados del día.',
      path: '/indicadores',
      priority: '1.0',
      image: '/og-image.jpg'
    },
    privacyPolicy: {
      title: 'Política de Privacidad',
      description: 'Política de privacidad de las Calculadoras Tributarias.',
      path: '/politica-de-privacidad',
      priority: '0.5',
      image: '/og-image.jpg'
    },
    termsOfUse: {
      title: 'Términos de Uso',
      description: 'Términos y condiciones de uso de las Calculadoras Tributarias.',
      path: '/terminos-de-uso',
      priority: '0.5',
      image: '/og-image.jpg'
    },
    changelog: {
      title: 'Historial de Cambios',
      description: 'Registro de actualizaciones y mejoras de las Calculadoras Tributarias Chile.',
      path: '/changelog',
      priority: '0.7',
      image: '/og-image.jpg'
    },
    changelogAdmin: {
      title: 'Administrar Changelog',
      description: 'Panel de administración del historial de cambios.',
      path: '/admin/changelog',
      priority: '0.1',
      noindex: true,
      image: '/og-image.jpg'
    }
  };
  
  export const STRUCTURED_DATA = {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "vBox Pro",
      "url": "https://honorario.netlify.app",
      "logo": "https://honorario.netlify.app/logoyr.svg",
      "sameAs": [],
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "hola@vbox.pro"
      }
    },
    webApplication: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Calculadoras Tributarias Chile",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "CLP"
      }
    }
  };
  
  export const generateMetaTags = ({ title, description, image, path }) => {
    return {
      canonical: path,
      title: title,
      meta: [
        { name: 'description', content: description },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: image || SEO_CONFIG.defaultImage },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: image || SEO_CONFIG.defaultImage }
      ]
    };
  };