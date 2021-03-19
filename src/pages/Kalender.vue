<template>
  <div class="container">
    <scheduler class="left-container" :events="events"></scheduler>
  </div>
</template>
 
<script>
import Scheduler from "@/components/Kalenderansicht.vue";
import axios from "axios"; 

export default {
  name: 'app',
  components: {Scheduler},
  data () {
    return {
      events: [
      
      ]
    }
  },
  methods: {
    getData () {
      axios.get(this.$IPBE + "/kalender")
      .then(res => {this.events[1] = res.data;
      console.log(res.data);
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>
 
<style>
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
 
  .container {
    height: 100%;
    width: 100%;
  }
 
  .left-container {
    overflow: hidden;
    position: relative;
    height: 100vh;
  }
 
</style>