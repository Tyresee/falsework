# 各类脚手架

## vue 全家桶

npm install -g vue-cli

vue init webpack [vue-demo]

cd [vue-demo] & yarn

yarn add -D node-sass sass-loader

yarn add babel-polyfill vuex isomorphic-fetch query-string js-cookie

### babel-polyfill 配置

build/webpack.base.conf.js

``` JavaScript
module.exports = {
  entry: {
    app: './src/main.js'
  }
}

// 改为
module.exports = {
  entry: {
    app: ['babel-polyfill', './src/main.js']
  }
}
```

### vue-router 配置

在 src/ 下新建 router 目录

├── router
│   ├── home
│   │   └── index.vue
│   ├── todo
│   │   └── index.vue
│   ├── index.js

在 src/router/index.js 配置路由

``` JavaScript
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
      path: '/home',
      name: 'home',
      component (resolve) {
        require.ensure([], () => {
          resolve(require('./home'))
        })
      }
    },
    {
      path: '/todo/:id',
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

``` JavaScript
import router from './router'

new Vue({
  el: '#app',
  router, // 使用
  store,
  template: '<App/>',
  components: { App }
})
```

### vuex 配置

在 src/ 下新建 store 目录

├── store
│   ├── actions 行为
│   ├── mutations 变化
│   ├── state 状态
│   ├── index.js 入口

在 src/main.js 引用

``` JavaScript
import store from './store'

new Vue({
  el: '#app',
  router,
  store, // 使用
  template: '<App/>',
  components: { App }
})
```

### vuex 组件中使用

在 src/router/components/Hello.vue 中示范

``` JavaScript
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['number'])
  },
  methods: {
    ...mapActions(['updateNumber'])
  }
}
```

### sass/scss 环境

依赖 node-sass sass-loader

在 src/router/components/Hello.vue 中示范

``` HTML
<style lang="scss" scoped>
.hello {
  h1 {
    font-size: 30px;
    color: #121212;
  }

  span {
    font-size: 26px;
    color: #ff0000;
  }

  button {
    display: block;
    padding: 10px 20px;
    margin: 10px auto;
    font-size: 26px;
    color: #fff;
    border: 0;
    background-color: #00baf7;
  }
}
</style>
```

### isomorphic-fetch 使用

在 src/ 下新建 fetch 目录

├── fetch
│   ├── config
│   ├── index.js

在 store/actions/index.js 中示范

当然也可以作为在 src/main.js 中 Vue 实例上全局注册

``` JavaScript
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

├── plugins
│   ├── index.js

``` JavaScript
import jsCookie from 'js-cookie'

export default function install (Vue) {
  Vue.prototype.$$cookie = jsCookie
}
```

在 src/main.js 中 Vue 实例上全局注册

``` JavaScript
import plugins from './plugins'

Vue.use(plugins)
```

在 src/router/components/Hello.vue 中示范
