import jsCookie from 'js-cookie'

export default function install (Vue) {
  Vue.prototype.$$cookie = jsCookie
}
