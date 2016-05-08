import counterpart from 'counterpart';

const translationFiles = require.context(
  "./",
  true,
  /\.json$/
).keys();

const translations = {};

translationFiles.forEach(file => {
  var langKey = file.match(/\.\/(.*?)\//)[0];
  langKey = langKey.substring(2, langKey.length - 1);
  const code = file.substring(file.lastIndexOf('/') + 1, file.length - 5);
  translations[langKey] = Object.assign({
    [code]: JSON.parse(decodeURIComponent(escape(JSON.stringify(require(`${file}`)))))
  }, translations[langKey]);
});

if (translations) {
  for (let key in translations) {
    if (Object.hasOwnProperty.call(translations, key)) {
      counterpart.registerTranslations(key, translations[key]);
    }
  }
}
