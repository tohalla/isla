'use strict';

angular.module('islaApp')
  .controller(
    'LanguageController',
    function($scope, $translate, Language, tmhDynamicLocale) {
      var vm = this;
      vm.changeLanguage = function(languageKey) {
        $translate.use(languageKey);
        tmhDynamicLocale.set(languageKey);
      };

      Language.getAll().then(function(languages) {
        vm.languages = languages;
      });
    })
  .filter('findLanguageFromKey', function() {
    return function(lang) {
      return {
        'ca': 'Català',
        'da': 'Dansk',
        'de': 'Deutsch',
        'en': 'English',
        'es': 'Español',
        'fr': 'Français',
        'hu': 'Magyar',
        'it': 'Italiano',
        'ja': '日本語',
        'ko': '한국어',
        'nl': 'Nederlands',
        'pl': 'Polski',
        'pt-br': 'Português (Brasil)',
        'pt-pt': 'Português',
        'ro': 'Română',
        'ru': 'Русский',
        'sv': 'Svenska',
        'tr': 'Türkçe',
        'zh-cn': '中文（简体）',
        'zh-tw': '繁體中文'
      }[lang];
    };
  });
