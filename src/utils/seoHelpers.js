import { SEO_CONFIG } from '../constants/seo';

export const generateCanonicalURL = (path) => {
    const baseURL = SEO_CONFIG.siteUrl.replace(/\/$/, '');
    const cleanPath = path.replace(/^\//, '');
    return cleanPath ? `${baseURL}/${cleanPath}` : baseURL;
};

export const generatePageTitle = (title) => {
    if (!title || title === SEO_CONFIG.defaultTitle) {
        return SEO_CONFIG.defaultTitle;
    }
    return SEO_CONFIG.titleTemplate.replace('%s', title);
};

export const generateSocialImageURL = (image) => {
    if (!image) {
        return new URL(SEO_CONFIG.defaultImage, SEO_CONFIG.siteUrl).toString();
    }
    return image.startsWith('http') ? image : new URL(image, SEO_CONFIG.siteUrl).toString();
};

export const generateStructuredData = (type, customData = {}) => {
    const baseSchema = {
        "@context": "https://schema.org",
        "@type": type,
        "url": SEO_CONFIG.siteUrl,
    };

    const schemaData = {
        ...baseSchema,
        ...customData
    };

    return JSON.stringify(schemaData, null, 2);
};

export const validateSEOParams = ({ title, description, image }) => {
    const errors = [];

    if (title && title.length > 60) {
        errors.push('Title should be less than 60 characters');
    }

    if (description && description.length > 160) {
        errors.push('Description should be less than 160 characters');
    }

    if (image && !image.match(/\.(jpg|jpeg|png|gif)$/i)) {
        errors.push('Image should be in a valid format (jpg, jpeg, png, gif)');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

export const generateMetaTags = (metadata) => {
    const { title, description, image, path } = metadata;
    const canonicalURL = generateCanonicalURL(path);
    const socialImageURL = generateSocialImageURL(image);
    const pageTitle = generatePageTitle(title);

    return {
        canonical: canonicalURL,
        title: pageTitle,
        meta: [
            { name: 'description', content: description },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: canonicalURL },
            { property: 'og:title', content: pageTitle },
            { property: 'og:description', content: description },
            { property: 'og:image', content: socialImageURL },
            { property: 'og:site_name', content: 'VBox Pro' },
            { property: 'og:locale', content: 'es_CL' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:site', content: SEO_CONFIG.social.twitter },
            { name: 'twitter:title', content: pageTitle },
            { name: 'twitter:description', content: description },
            { name: 'twitter:image', content: socialImageURL },
            { property: 'og:image:width', content: '1200' },
            { property: 'og:image:height', content: '630' }
        ]
    };
};