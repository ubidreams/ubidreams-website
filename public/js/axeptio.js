window.axeptioSettings = {
  clientId: '61767cd8bb7099079e9e3df1'
}

if (document.documentElement.lang === 'en') {
  window.axeptioSettings.cookiesVersion = 'ubidreams-base-en'
}

if (document.documentElement.lang === 'fr') {
  window.axeptioSettings.cookiesVersion = 'ubidreams-base'
}

;(function (d, s) {
  var t = d.getElementsByTagName(s)[0],
    e = d.createElement(s)
  e.async = true
  e.src = '//static.axept.io/sdk-slim.js'
  t.parentNode.insertBefore(e, t)
})(document, 'script')
