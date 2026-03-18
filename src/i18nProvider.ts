
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import frenchMessages from 'ra-language-french';

const messages = {
    fr: frenchMessages,
    en: englishMessages,
} as any;

const i18nProvider = polyglotI18nProvider(locale => messages["fr"]);
export default i18nProvider;
