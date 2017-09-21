// https://github.com/michael-ciniawsky/postcss-load-config
// http://browserl.ist/?q=>+1%25&q=last+3+versions&q=ios+>=+8&q=android+>=+4&q=ie+>+8

module.exports = {
  "plugins": {
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {
      "browserslist": [
        "> 1%",
        "last 3 versions",
        "ios >= 8",
        "android >= 4",
        "ie > 8"
      ]
    }
  }
}
