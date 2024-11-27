import { APP_CONFIG } from './config';

export const SEO_CONFIG = {
    defaultTitle: 'Calculadora de Retención de Honorarios Chile 2024',
    titleTemplate: '%s | VBox Pro',
    defaultDescription: 'Calcula fácilmente tu retención de honorarios para profesionales en Chile. Conoce tu monto bruto, líquido y retención según las tasas vigentes 2024-2028.',
    siteUrl: APP_CONFIG.domain,
    defaultImage: '/og-image.jpg',
    social: {
        twitter: '@vboxpro'
    },
    additionalMetaTags: [
        {
            name: 'keywords',
            content: 'calculadora, retención, honorarios, chile, boleta, impuestos, SII'
        },
        {
            name: 'author',
            content: 'VBox Pro'
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
        title: SEO_CONFIG.defaultTitle,
        description: SEO_CONFIG.defaultDescription,
        path: '/',
        priority: '1.0'
    },
    privacyPolicy: {
        title: 'Política de Privacidad',
        description: 'Política de privacidad de la Calculadora de Retención de Honorarios.',
        path: '/politica-de-privacidad',
        priority: '0.5'
    },
    termsOfUse: {
        title: 'Términos de Uso',
        description: 'Términos y condiciones de uso de la Calculadora de Retención de Honorarios.',
        path: '/terminos-de-uso',
        priority: '0.5'
    }
};

export const STRUCTURED_DATA = {
    organization: {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "VBox Pro",
        "url": APP_CONFIG.domain
    },
    webApplication: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": SEO_CONFIG.defaultTitle,
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "CLP"
        },
        "description": SEO_CONFIG.defaultDescription
    }
};