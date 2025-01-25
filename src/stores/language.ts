import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useI18n } from "vue-i18n";
import loadLanguage from '@/i18n/loadLanguage'
/**
 * 语言管理
 */
export const useLanguageStore = defineStore('language', () => {
  const defaultLang = 'zh-cn'
  const language = ref('')
  const { locale } = useI18n()

  const languages: any = loadLanguage()
  const localeContent = computed(() => {
    // console.log(languages)
    return languages[language.value]
  })

  /**
   * 初始化语言配置
   */
  const initLanguage = () => {
    language.value = defaultLang;
    changeLanguage(language.value)
  }

  /**
   * 判断语言是否合法，只有在本地化多语言文件夹"@/i18n/languages/*.ts"存在对应文件的语言，才被认为合法
   * @param language 
   * @returns 
   */
  const checkLanguage = (lang?: string) => {
    if (!lang) return false;
    const files = import.meta.glob("@/i18n/languages/*.ts", { eager: true })
    const languages = Object.keys(files).map((key) => {
      let nameString = key.match(/([a-z-_]+).ts$/i) || [];
      let name = nameString[1]
      return name
    })
    let legal = languages.includes(lang)
    return legal
  }

  /**
   * 修改语言
   * @param lang 
   * @returns 
   */
  const changeLanguage = (lang?: string) => {
    if (!lang) return false;
    let legal = checkLanguage(lang)
    if (!legal) return false;
    language.value = lang;
    locale.value = lang
    return true
  }

  return { language, localeContent, initLanguage, changeLanguage }
}, {
  persist: {
    storage: sessionStorage,
  }
})
