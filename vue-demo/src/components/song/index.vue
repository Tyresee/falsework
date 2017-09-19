<template>
  <div class="vue-song">
    <div class="bg-blur" :style="`
    background-image:url(https://y.gtimg.cn/music/photo_new/T002R150x150M000${song.albummid}.jpg)`"></div>
    <div class="bg-msk"></div>
    <div class="song-wrapper">
      <audio :src="`http://ws.stream.qqmusic.qq.com/C100${song.songmid}.m4a?fromtag=0`" controls preload="auto" loop ref="audio"></audio>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    song: {
      type: Object
    }
  },
  data () {
    return {
      loading: false
    }
  },
  mounted () {
    const el = this.$refs.audio
    console.log(el)
    if (el) {
      el.play()
      el.addEventListener('waiting', () => {
        this.loading = true
        console.log('waiting')
      })
      el.addEventListener('loadstart', () => {
        this.loading = true
        console.log('loadstart')
      })
      el.addEventListener('durationchange', () => {
        // const duration = el.duration || 0
        console.log('durationchange')
      })
      el.addEventListener('canplaythrough', () => {
        this.loading = false
        // el.play()
        console.log('canplaythrough')
      })
      el.addEventListener('progress', () => {
        this.loading = true
        console.log('progress')
      })
      el.addEventListener('timeupdate', () => {
        this.loading = false
        // const currentTime = el.currentTime
        // const duration = el.duration || 0
      })
      el.addEventListener('ended', () => {
        this.loading = false
        console.log('ended')
      })
      el.addEventListener('error', () => {
        this.loading = false
        console.log('网络问题或音频错误')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';
@import '../../assets/css/rem';

.vue-song {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 997;
  width: rem(750);
  height: 100%;
  transform: translate3d(-50%, -50%, 0);

  .bg-blur {
    position: fixed;
    z-index: 998;
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(15px);
    transform: scale(1.15);
  }

  .bg-msk {
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.6;
  }

  .song-wrapper {
    position: relative;
    z-index: 1000;
  }
}
</style>
