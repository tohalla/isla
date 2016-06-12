import counterpart from 'counterpart';
import moment from 'moment';

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
    [code]: require(`${file}`)
  }, translations[langKey]);
});

if (translations) {
  for (let key in translations) {
    if (Object.hasOwnProperty.call(translations, key)) {
      counterpart.registerTranslations(key, translations[key]);
      if (translations[key].general.moment) {
        moment.updateLocale(key, {
          months: translations[key].general.moment.months,
          weekdays: translations[key].general.moment.weekdays,
          weekdaysMin: translations[key].general.moment.weekdaysMin
        });
      }
    }
  }
}
