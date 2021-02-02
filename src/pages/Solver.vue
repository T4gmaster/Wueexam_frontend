<template>
  <div>
    <button v-on:click="startSolver()">Solver starten</button>
    <button v-on:click="stopSolver()">Solver beenden</button>
  </div>
</template>

<script>
import axios from 'axios';
import Button from '../components/Button.vue';
export default {
  components: { Button },
  methods: {
      startSolver(){
          axios.post('localhost:5000/startsolver')
          .then(function (response) {
              console.log(response);
          })
          .catch(function() {
              console.log('Solver konnte nicht gestartet werden');
          });
      },
      stopSolver(){
          axios.post('localhost:5000/stopsolver')
          .then(function (response) {
              console.log(response);
          })
          .catch(function () {
              console.log('Solver konnte nicht gestopt werden');
          });
      }
  }
};
</script>
<style>
</style>
