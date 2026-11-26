export const getDefaultLocation = () => {
  if (typeof navigator === 'undefined') return 'en'

  const browserLanguage = navigator.language.toLowerCase().split(/[-_]/)[0]
  const language = browserLanguage === 'uk' ? 'ua' : browserLanguage

  return language === 'en' || language === 'ua' || language === 'ru'
    ? language
    : 'en'
}
