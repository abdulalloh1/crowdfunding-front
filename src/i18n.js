import { createI18n } from "vue-i18n";

let langs = ['en', 'ru', 'uz'];

let activeLang = localStorage.getItem('lang');
if (!activeLang) {
    localStorage.setItem('lang', 'uz');
    activeLang = 'uz';
}
const { default: translationsPath } = await import(`@/locales/${activeLang}.json`)

export const i18n = createI18n({
    useScope: 'global',
    locale: activeLang,
    fallbackLocale: activeLang,
    messages: {
        [activeLang]: translationsPath
    }
})

export async function updateLang(lang) {
    activeLang = lang
    const { default: translationsPath } = await import(`@/locales/${activeLang}.json`)
    i18n.global.locale = lang;
    i18n.global.fallbackLocale = lang
    i18n.global.messages[activeLang] = translationsPath
}

export function generateLocalesForProperties(object) {
    let arrayOfLocales = [];
    langs.forEach(lang => {
        let objForLocale = JSON.parse(JSON.stringify(object));
        objForLocale.locale = lang
        arrayOfLocales.push(objForLocale);
    });

    return arrayOfLocales;
}

