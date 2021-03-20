<template>
  <div>
    <h2>Informationen:</h2>
      <anzahl-studenten lg="2" class="test" /><anzahl-pruefungen class="test2" /><date-card />
      <h2>Optimierung starten</h2>
    <div class="grid-container">
      <div>
        <b-button v-on:click="startSolver()" variant="primary"><i class="fa fa-play"></i>Optimierung starten</b-button>
      </div>
      <div>  
        <b-button v-on:click="stopSolver()" variant="primary"><i class="fa fa-stop"></i>Optimierung stoppen</b-button>
      </div>    
    </div>
    <solver-status v-if="solverstatus"></solver-status>
    <router-link to=/pruefungsplan tag="b-button" class="continue"><i class="fa fa-arrow-right"></i>Weiter</router-link>
    <p></p>
    <terminal-output-solver />
</div>
</template>

<script>
import axios from 'axios';
import AnzahlStudenten from "@/components/AnzahlStudenten.vue";
import AnzahlPruefungen from "@/components/AnzahlPrüfungen.vue";
import SolverStatus from '@/components/SolverStatus.vue';
import DateCard from '@/components/DateCard.vue';
import TerminalOutputSolver from '@/components/TerminalOutputSolver.vue';

export default { 
  components: { 
    SolverStatus,
    AnzahlStudenten,
    AnzahlPruefungen,
    DateCard,
    TerminalOutputSolver
  },
  data() {
    return {
      solverstatus: false
    };
  },
  methods: {
    startSolver(){
      axios.get(this.$IPOPTIMIZATION + "/startsolver")
      .then(function (response) {
        this.solverstatus = true
        console.log(response);
      })
      .catch(function() {
       console.log('Solver wurde gestartet');
      });
    },
    stopSolver(){
      axios.get(this.$IPOPTIMIZATION + "/stopsolver")
      .then(function (response) {
        this.solverstatus = false
        console.log("Solver wurde gestoppt");
      })
      .catch(function () {
        console.log("Solver konnte nicht gestoppt werden");
      });
    }
  }
};
</script>
<style>
.test {
  float: right;
  width:  100%; 
}
.test2 {
  float: left;
  width: 100%;
}
.grid-container {
  display: inline-grid;
  grid-template-columns: auto auto;
  grid-gap: 2px;
  background-color: #0000000;
  padding: 10px;
}
</style>
