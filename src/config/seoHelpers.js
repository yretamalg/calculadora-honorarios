export const validateSEOParams = ({ title, description }) => {
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