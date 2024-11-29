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