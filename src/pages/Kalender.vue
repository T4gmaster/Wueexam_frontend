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
        { id:1, start_date:"2020-01-20 9:00", end_date:"2020-01-20 10:00", text:"Mathe 2"},
        { id:3, start_date:"2020-01-23 8:00", end_date:"2020-01-23 9:00", text:"Externe Unternehmensrechnung"},
        { id:4, start_date:"2020-01-20 12:00", end_date:"2020-01-20 13:00", text:"I&F"},
        { id:5, start_date:"2020-01-23 14:00", end_date:"2020-01-23 15:00", text:"Jura"},
        { id:6, start_date:"2020-01-20 16:00", end_date:"2020-01-20 17:00", text:"Makro 1"}
      ]
    }
  },
  methods: {
    getData () {
      axios.get('http://132.187.226.24:5000/pruefungsansicht')
      .then(res => {this.events = res.data;
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