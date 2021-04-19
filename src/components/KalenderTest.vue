<template>
<div>
  <div class="container">
    <scheduler class="left-container" :events="events" :key="componentKey"></scheduler>
  </div>
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
      componentKey: 0,
      events: [
        
      ]
    }
  },
  methods: {
    getData () {
      let token = ""
      axios.post(this.$IPBE + "/login", {
        name: this.$NAME,
        password: this.$PW
      })
      .then(response => {
        this.token = response.data.token
        axios.get(this.$IPBE + "/kalender", {
          headers: {
          "Authorization": `Bearer ${this.token}`
        }})
        .then(res => {this.events = res.data;
        console.log(res.data);
        })
        .catch(error => {
          console.log(error)
        })
      })
    },
    startKalender() {
      this.componentKey += 1;
    }
  },
  created() {
    this.getData()
  }
}
</script>
 
<style scoped>
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