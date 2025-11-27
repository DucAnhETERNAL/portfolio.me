import React, { createContext, useContext, useState, useEffect } from 'react';
import enTranslations from '../i18n/translations/en.json';
import viTranslations from '../i18n/translations/vi.json';

const I18nContext = createContext();

const translations = {
    en: enTranslations,
    vi: viTranslations,
};

export const I18nProvider = ({ children }) => {
    // Get initial language from localStorage or default to 'en'
    const [language, setLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem('language');
        return savedLanguage || 'en';
    });

    // Save language preference to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const t = (key, params = {}) => {
        const keys = key.split('.');
        let value = translations[language];

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                // Fallback to English if translation not found
                value = translations.en;
                for (const fallbackKey of keys) {
                    if (value && typeof value === 'object' && fallbackKey in value) {
                        value = value[fallbackKey];
                    } else {
                        return key; // Return key if translation not found
                    }
                }
                break;
            }
        }

        // Replace parameters in the translation string
        if (typeof value === 'string' && Object.keys(params).length > 0) {
            return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
                return params[paramKey] !== undefined ? params[paramKey] : match;
            });
        }

        return typeof value === 'string' ? value : key;
    };

    const changeLanguage = (lang) => {
        if (translations[lang]) {
            setLanguage(lang);
        }
    };

    return (
        <I18nContext.Provider value={{ language, changeLanguage, t }}>
            {children}
        </I18nContext.Provider>
    );
};

export const useI18n = () => {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
};

