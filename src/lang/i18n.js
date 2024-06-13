import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import en from "../lang/en";
import es from "../lang/es";
import pt from "./pt.js";

const resources = {
    en: {
        translation: en,
    },
    es: {
        translation: es,
    },
    pt: {
        translation: pt,
    },
};

const language = localStorage.getItem('language') || 'pt';

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: language,
        fallbackLng: "pt",
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;