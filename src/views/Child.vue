<template>
    <div>
        <h3>Child</h3>
        <h5>{{msg}}</h5>
        <button @click="passMsg">走你！</button>
    </div>
</template>

<script>
import bus from '../util/bus.js'
export default {
  props: {
    msg: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      childMsg: '吃了?'
    }
  },
  methods: {
    passMsg () {
      this.$emit('showMsg', 'i am from child')
    }
  },
  mounted () {
    bus.$on('msg', (val) => {
      bus.childMsg = val
    })
  }
}
</script>

<style scoped>
</style>
