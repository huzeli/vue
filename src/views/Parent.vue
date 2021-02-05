<template>
    <div>
       <h1>Parent</h1>
       <m-child msg="from parent msg" @showMsg="showMsg"></m-child>
       <h3>{{msg}}</h3>
    </div>
</template>

<script>
import MChild from './Child'
export default {
  data () {
    return {
      msg: ''
    }
  },
  components: {
    MChild
  },
  methods: {
    showMsg (val) {
      this.msg = val
    }
  },
  mounted () {
    console.log(this.$children)
  }
}
</script>

<style scoped>
</style>
