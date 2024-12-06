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

export const SEO_CONFIG = {
    defaultTitle: 'Calculadoras Tributarias Chile | vBox Pro',
    titleTemplate: '%s | vBox Pro',
    defaultDescription: 'Herramientas gratuitas para el cálculo de retención de honorarios, IVA y Porcentajes en Chile.',
    siteUrl: APP_CONFIG.domain,
    defaultImage: '/og-image.jpg',
    social: APP_CONFIG.social,
    additionalMetaTags: [
        {
            name: 'keywords',
            content: 'calculadora, retención, honorarios, iva, impuestos, chile, boleta, SII, porcentajes'
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
        title: 'Calculadoras Tributarias Chile',
        description: 'Herramientas gratuitas para el cálculo de retención de honorarios, IVA y Porcentajes en Chile.',
        path: '/',
        priority: '1.0'
    },
    honorarios: {
        title: 'Calculadora de Retención de Honorarios 2024-2028',
        description: 'Calcula fácilmente tu retención de honorarios según las tasas vigentes 2024-2028.',
        path: '/honorarios',
        priority: '1.0'
    },
    iva: {
        title: 'Calculadora de IVA Facturas Chile',
        description: 'Calcula el IVA de tus facturas (19%) para tus productos y servicios en Chile.',
        path: '/iva',
        priority: '1.0'
    },
    porcentajes: {
        title: 'Calculadora de Porcentajes',
        description: 'Calcula diferentes tipos de porcentajes para tus finanzas personales y profesionales.',
        path: '/porcentajes',
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
    },
    changelog: {
        title: 'Historial de Cambios',
        description: 'Registro de actualizaciones y mejoras de las Calculadoras Tributarias Chile.',
        path: '/changelog',
        priority: '0.7'
    },
    changelogAdmin: {
        title: 'Administrar Changelog',
        description: 'Panel de administración del historial de cambios.',
        path: '/admin/changelog',
        priority: '0.1',
        noindex: true
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
            { property: 'og:image', content: image },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: description },
            { name: 'twitter:image', content: image }
        ]
    };
};

export const validateSEOParams = ({ title, description, image }) => {
    const errors = [];
    
    if (title && title.length > 60) {
        errors.push('Title should be less than 60 characters');
    }
    
    if (description && description.length > 160) {
        errors.push('Description should be less than 160 characters');
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
};