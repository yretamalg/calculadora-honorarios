import { APP_CONFIG } from './config';

export const SEO_CONFIG = {
    defaultTitle: 'Calculadora de Retención de Honorarios Chile 2024',
    titleTemplate: '%s | VBox Pro',
    defaultDescription: 'Calcula fácilmente tu retención de honorarios para profesionales en Chile. Conoce tu monto bruto, líquido y retención según las tasas vigentes 2024-2028.',
    longDescription: `Herramienta gratuita para calcular la retención de honorarios en Chile. 
                     Incluye las tasas actualizadas desde 2024 hasta 2028, permite calcular montos 
                     brutos y líquidos, y proporciona información detallada sobre los cambios en 
                     las tasas de retención según la Ley N°21.133.`,
    siteUrl: APP_CONFIG.domain,
    defaultImage: '/og-image.jpg',
    social: APP_CONFIG.social || {},
    additionalMetaTags: [
        {
            name: 'keywords',
            content: 'calculadora, retención, honorarios, chile, boleta, impuestos, SII, boleta de honorarios, cálculo retención, impuestos chile, honorarios chile'
        },
        {
            name: 'author',
            content: 'VBox Pro'
        },
        {
            name: 'application-name',
            content: 'Calculadora de Retención'
        },
        {
            name: 'apple-mobile-web-app-title',
            content: 'Retención CL'
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
        description: 'Política de privacidad de la Calculadora de Retención de Honorarios. Conoce cómo protegemos tu información y no almacenamos datos personales.',
        path: '/politica-de-privacidad',
        priority: '0.5'
    },
    termsOfUse: {
        title: 'Términos de Uso',
        description: 'Términos y condiciones de uso de la Calculadora de Retención de Honorarios. Información importante sobre el uso de la herramienta y responsabilidades.',
        path: '/terminos-de-uso',
        priority: '0.5'
    }
};

export const STRUCTURED_DATA = {
    organization: {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "vBox Pro",
        "url": APP_CONFIG.domain,
        "logo": `${APP_CONFIG.domain}/android-chrome-512x512.png`,
        "sameAs": [
            `https://x.com/${APP_CONFIG.social.twitter.replace('@', '')}`
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "email": APP_CONFIG.contactEmail,
            "contactType": "customer service"
        }
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
        "description": SEO_CONFIG.defaultDescription,
        "provider": {
            "@type": "Organization",
            "name": "vBox Pro",
            "url": APP_CONFIG.domain
        }
    }
};