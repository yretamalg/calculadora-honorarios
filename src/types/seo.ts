export interface SocialConfig {
    twitter?: string;
}

export interface SEOConfig {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    siteUrl: string;
    defaultImage: string;
    social?: SocialConfig;
    additionalMetaTags: Array<{ [key: string]: string }>;
    languageAlternates: Array<{
        hrefLang: string;
        href: string;
    }>;
}