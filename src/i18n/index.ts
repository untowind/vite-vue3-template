import { createI18n } from "vue-i18n";
// 
import loadLanguage from "./loadLanguage";
const languages = loadLanguage();

let lang = "";

const i18n = createI18n({
  legacy: false,
  globalInjection: true, // 全局注入模式，可以直接使用 $t
  locale: lang,
  messages: languages,
});

export default i18n;
