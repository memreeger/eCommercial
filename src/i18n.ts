import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import tr from "./locales/tr.json";

i18n
    .use(LanguageDetector) // <-- bu eklendi
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            tr: { translation: tr },
        },
        fallbackLng: "en",
        interpolation: { escapeValue: false },
        detection: {
            // localStorage kullan
            order: ["localStorage", "navigator"],
            caches: ["localStorage"], // dili localStorage'da saklar, dil değiştirirken key'i ne olarak kaydedelim
            // default: "i18nextLng"
            lookupLocalStorage: "i18next",
        },
    });

export default i18n;
