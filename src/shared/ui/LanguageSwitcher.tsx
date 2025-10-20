import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './shadcn/button';

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    // Update document direction for RTL support
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  };

  return (
    <div className={`flex gap-2 ${className}`} role="group" aria-label="Language selection">
      <Button
        onClick={() => handleLanguageChange('en')}
        variant={i18n.language === 'en' ? 'default' : 'outline'}
        size="sm"
        aria-pressed={i18n.language === 'en'}
      >
        English
      </Button>
      <Button
        onClick={() => handleLanguageChange('ar')}
        variant={i18n.language === 'ar' ? 'default' : 'outline'}
        size="sm"
        aria-pressed={i18n.language === 'ar'}
      >
        العربية
      </Button>
    </div>
  );
};