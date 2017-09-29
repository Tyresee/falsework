# vue-demo

> A Vue.js project

## Pri

在你的浏览器上安装[vue devtools](https://github.com/vuejs/vue-devtools)

``` bash
# install yarn and vue-cli
npm install -g yarn vue-cli

# use vue-cli init project
vue init webpack vue-demo

# cd project
cd vue-demo
```

## Build Setup

``` bash
# install dependencies
yarn

# serve with hot reload at development
yarn dev

# build for production with minification
yarn build

# build for production and view the bundle analyzer report
yarn build --report

# test
yarn test
```

## Babel 环境、Sass 环境

``` bash
# use babel-polyfill to polyfill es6
yarn add babel-polyfill

# if your don't install vue-router when you inited, you should use install it.
yarn add vue-router

# use vuex
yarn add vuex

# sass
yarn add -D node-sass sass-loader

# use fetch
yarn add isomorphic-fetch fetch-jsonp query-string

# use some dependencies like js-cookie
yarn add js-cookie
```

### babel-polyfill 配置

打开 build/webpack.base.conf.js

``` javascript
module.exports = {
  entry: {
    app: './src/main.js'
  }
}
```

改为：

``` javascript
module.exports = {
  entry: {
    app: ['babel-polyfill', './src/main.js']
  }
}
```

### vue-router 配置

在 src/ 下新建 router 目录

``` bash
├── router
│   ├── home
│   │   └── index.vue
│   ├── todo
│   │   └── index.vue
│   ├── index.js
```

在 src/router/index.js 配置路由

``` javascript
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    const position = {}
    if (to.hash) {
      position.selector = to.hash
    }
    if (to.matched.some(m => m.meta.scrollToTop)) {
      position.x = 0
      position.y = 0
    }
    return position
  }
}

export default new Router({
  mode: 'history', // 设置 history 模式
  scrollBehavior,
  base: '/', // 设置 URL base
  routes: [
    {
      path: '/',
      name: 'home',
      component (resolve) {
        require.ensure([], () => {
          resolve(require('./home'))
        })
      }
    },
    {
      path: '/todo',
      name: 'todo',
      component (resolve) {
        require.ensure([], () => {
          resolve(require('./todo'))
        })
      }
    }
  ]
})
```

在 src/main.js 引用

``` javascript
import router from './router'

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
```

### vuex 配置

在 src/ 下新建 store 目录

``` bash
├── store
│   ├── actions 行为
│   ├── mutations 变化
│   ├── state 状态
│   ├── api.js 汇总 api
│   ├── index.js 入口
```

在 src/main.js 引用

``` javascript
import store from './store'

new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
```

### vuex 组件中使用

在 src/router/components/hello.vue 中示范

``` javascript
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['number'])
  },
  methods: {
    ...mapMutations('setNumber'),
    ...mapActions(['updateNumber'])
  }
}
```

### sass/scss 环境

``` bash
yarn add node-sass sass-loader
```

在 src/router/components/hello.vue 中示范

``` html
<style lang="scss" scoped>
.hello {
  text-align: center;

  span {
    font-size: 26px;
    color: #f00;
  }

  img {
    width: 200px;
    height: 200px;
  }
}
</style>
```

### isomorphic-fetch 和 fetch-jsonp 的使用

在 src/ 下新建 fetch 目录

``` bash
├── fetch
│   ├── config
│   ├── index.js
│   ├── json.js
│   ├── jsonp.js
```

在 store/actions/index.js 中示范

当然也可以作为在 src/main.js 中 Vue 实例上全局注册

``` javascript
import Vue from 'vue'
import fetch from '@/fetch'

function install (Vue) {
  Vue.prototype.$$fetch = fetch
}


Vue.use(install)
```

### plugins 的写法

以 js-cookie 为例

在 src/ 下新建 plugins 目录

``` bash
├── plugins
│   ├── index.js
```

``` javascript
import jsCookie from 'js-cookie'

export default function install (Vue) {
  Vue.prototype.$$cookie = jsCookie
}
```

在 src/main.js 中 Vue 实例上全局注册

``` javascript
import plugins from './plugins'

Vue.use(plugins)
```

在 src/router/components/Hello.vue 中示范

### <base>

<base href="">

### .babelrc

``` json
{
  "presets": [
    [
      "env",
      {
        "modules": false,
        "targets": {
          "browsers": [
            "> 1%",
            "last 3 versions",
            "ios >= 8",
            "android >= 4",
            "ie > 8"
          ]
        }
      }
    ],
    "stage-2"
  ],
  "plugins": [
    "transform-runtime"
  ],
  "env": {
    "test": {
      "presets": [
        "env",
        "stage-2"
      ],
      "plugins": [
        "istanbul"
      ]
    }
  }
}

```

### editorconfig

``` bash
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```

### .eslintignore

``` bash
# build
/build/*.js
/config/*.js

# dependencies
node_modules
```

### .eslintrc

``` javascript
// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    'comma-dangle': 0,
    'no-new': 0
    // ...
  }
}
```

### .gitignore

``` bash
# See https://help.github.com/ignore-files/ for more about ignoring files.

# testing
/test/e2e/reports
/test/unit/coverage

# production
# /dist

# dependencies
node_modules

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

# editor directories and files
.idea
*.suo
*.ntvs*
*.njsproj
*.sln

# log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

### .postcssrc

``` javascript
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
```

### .sass-lint.yml

### package.json

### 其他配置

build/

config/

* 修改端口号
* 修改输入共同目录
* 修改是否生成 .map; 建议生产环境不生成
* 是否采取 Gzip; 建议采取
* 开发环境第一次启动是否自动打开页面，设置打开页面的地址

## Learn More

* [vue devtools](https://github.com/vuejs/vue-devtools/)
* [vue-cli](https://github.com/vuejs/vue-cli/)
* [vuejs-templates and webpack](http://vuejs-templates.github.io/webpack/)
* [docs for vue](https://cn.vuejs.org/)
* [docs for vue-loader](https://vue-loader.vuejs.org/zh-cn/)
* [docs for vue-router](https://router.vuejs.org/zh-cn/)
* [docs for vuex](https://vuex.vuejs.org/zh-cn/)
