import { APP_CONFIG } from './config';

export const STRUCTURED_DATA = {
    organization: {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "vBox Pro",
        "url": APP_CONFIG.domain,
        "contactPoint": {
            "@type": "ContactPoint",
            "email": APP_CONFIG.contactEmail
        }
    },
    webApplication: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadoras de Impuestos (Chile)",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "CLP"
        }
    }
};

export const SEO_CONFIG = {
    defaultTitle: 'Calculadoras de Impuestos (Chile) | vBox Pro',
    titleTemplate: '%s | vBox Pro',
    defaultDescription: 'Herramientas gratuitas para el cálculo de retención de honorarios e IVA en Chile.',
    siteUrl: APP_CONFIG.domain,
    defaultImage: '/og-image.jpg',
    social: APP_CONFIG.social,
    additionalMetaTags: [
        {
            name: 'keywords',
            content: 'calculadora, retención, honorarios, iva, impuestos, chile, boleta, SII'
        },
        {
            name: 'author',
            content: APP_CONFIG.nombre
        }
    ],
    languageAlternates: [
        {
            hrefLang: 'es-CL',
            href: APP_CONFIG.domain
        }
    ]
};

export const PAGE_METADATA = {
    home: {
        title: 'Calculadoras de Impuestos (Chile)',
        description: 'Herramientas gratuitas para el cálculo de retención de honorarios e IVA en Chile.',
        path: '/',
        priority: '1.0'
    },
    honorarios: {
        title: 'Calculadora de Retención de Honorarios',
        description: 'Calcula fácilmente tu retención de honorarios según las tasas vigentes 2024-2028.',
        path: '/honorarios',
        priority: '1.0'
    },
    iva: {
        title: 'Calculadora de IVA Chile',
        description: 'Calcula el IVA (19%) para tus productos y servicios en Chile.',
        path: '/iva',
        priority: '1.0'
    },
    privacyPolicy: {
        title: 'Política de Privacidad',
        description: 'Política de privacidad de las Calculadoras Tributarias.',
        path: '/politica-de-privacidad',
        priority: '0.5'
    },
    termsOfUse: {
        title: 'Términos de Uso',
        description: 'Términos y condiciones de uso de las Calculadoras Tributarias.',
        path: '/terminos-de-uso',
        priority: '0.5'
    }
};