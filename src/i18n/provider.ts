import polyglotI18nProvider from 'ra-i18n-polyglot';
import {customEnglishMessages} from './en'

const messages = {en:customEnglishMessages};


export const i18nProvider = polyglotI18nProvider(
    locale => messages[locale],
    'en', // default locale
    [{ locale: 'en', name: 'English' }],
);