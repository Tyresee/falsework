<template>
  <div class="hello">
    <h1>{{msg}}</h1>
    <span>{{number}}</span>
    <button @click="updateNumber(1)">更新 number</button>
    <img v-if="picUrl" :src="picUrl">
    <button @click="cookie">获取cookie中uid,如果没有则写入</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Hello Vue.js App'
    }
  },
  computed: {
    ...mapState(['number', 'cms']),
    picUrl () {
      return this.cms.data && this.cms.data.shareInfo && this.cms.data.shareInfo.imgUrl
    }
  },
  methods: {
    ...mapActions(['updateNumber', 'getCms']),
    cookie () {
      const uid = this.$$cookie('uid')
      if (!uid) {
        this.$$cookie.set('uid', 'zhouyu')
      } else {
        alert(uid)
      }
    }
  },
  created () {
    this.getCms()
  }
}
</script>

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

  img {
    width: 200px;
    height: 200px;
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
