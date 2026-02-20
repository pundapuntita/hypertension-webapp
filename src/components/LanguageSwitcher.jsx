import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
    const { i18n, t } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'th' ? 'en' : 'th';
        i18n.changeLanguage(newLang);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="absolute top-[max(1.5rem,env(safe-area-inset-top))] right-[max(1.5rem,env(safe-area-inset-right))] z-50 flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-sm hover:shadow-md border border-white/50 transition-all group"
            title="Switch Language"
        >
            <Globe className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" />
            <span className="font-semibold text-sm text-gray-700">
                {i18n.language === 'th' ? 'EN' : 'TH'}
            </span>
        </button>
    );
}

