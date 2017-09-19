<template>
  <div class="home">
    <search />
    <songs />
    <song :song="song" v-if="$route.hash && song.songmid" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import search from '@/components/search'
import songs from '@/components/songs'
import song from '@/components/song'

export default {
  name: 'home',
  components: {
    search,
    songs,
    song
  },
  computed: {
    ...mapState(['song']),
  },
  watch: {
    $route ($route) {
      if ($route.hash) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }
  },
  mounted () {
    if (!this.song.songmid) {
      this.$router.push({
        hash: ''
      })
    }
  }
}
</script>
