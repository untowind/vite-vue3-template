/**
 * 加载languages语言文件夹下所有语言文件
 * 并入elementPlus语言文件
 */
// import zhLocale from "element-plus/lib/locale/lang/zh-cn";
export default function loadLanguage() {
  // console.log(import.meta)
  const files: any = import.meta.glob("./languages/*.ts", { eager: true });
  // console.log(files)
  // console.log(Object.keys(files));
  const languages = Object.keys(files)
    .map((key) => {
      let name_arr = key.match(/([a-z_-]+)\.ts$/i) || []
      let name = name_arr[1]
      // console.log(name)
      return {
        key,
        name: name
      }
      // ({ key, name: key.match(/([a-z_-]+)\.js$/i)[1] })
    })
    .reduce((languages, { key, name }) => {
      let lang;
      // console.log(key, name);
      // console.log(files[key]);
      try {
        // 引入 element-plus 语言包
        let elementPlusLangs: any = import.meta.glob("../../node_modules/element-plus/dist/locale/*.mjs", { eager: true });
        // console.log(elementPlusLangs);
        // let a = import.meta.globEager("../../node_modules/element-plus/lib/locale/lang/*.js");
        let elementLang =
          elementPlusLangs[
            `../../node_modules/element-plus/dist/locale/${name}.min.mjs`
          ].default;
        // console.log(elementLang);
        // lang = files[key].default;
        lang = Object.assign(files[key].default, elementLang);
        // console.log(lang);
      } catch (err) {
        // console.log(err);
        lang = files[key];
      }
      // console.log(languages);
      //   console.log({
      //     ...languages,
      //     [name]: lang,
      //   });
      return {
        ...languages,
        [name]: lang,
      };
    }, {});

  // console.log(languages)
  return languages;
}
