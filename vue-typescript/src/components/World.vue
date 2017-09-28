<template>
  <div class="world">
    <h1>{{ propMessage }} : {{ msg }}</h1>
    <input v-model="value">
    <p>{{ value }}</p>
    <button @click="increase">{{ computedMsg }}</button>
    <Hello />
    <div v-loading="fun">loading</div>
    <div class="ifOne">{{ testIfOne | ifOne}}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Hello from '@/components/Hello'

@Component({
  props: {
    propMessage: String
  },
  components: {
    Hello
  },
  directives: {
    loading: {
      bind (el, binding) {
        console.log(binding.value())
      }
    }
  },
  filters: {
    ifOne (value) {
      return value === 1 ? 2 : 1
    }
  }
})

export default class World extends Vue {
  // data
  msg: string = 'world'
  value: string = ''
  number: number = 0
  testIfOne: number = 1
  // computed
  get computedMsg () {
    return 'computed ' + this.number
  }
  // method
  increase () {
    this.number ++
  }
  fun () {
    return 'hello loading'
  }
  // mounted
  mounted () {
    console.log(this.number)
  }
}
</script>
