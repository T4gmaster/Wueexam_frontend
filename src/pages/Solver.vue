<template>
  <div>
    <h2>Informationen:</h2>
    <b-row>
     <b-col cols="4">
      <start-datum  class="datum"/>
      <end-datum class="datum" />
      </b-col>
      <b-col cols="8">
      <anzahl-studenten class="schoen" />
      <anzahl-pruefungen class="schoen"/>
      </b-col>
    </b-row>
      <h2>Optimierung starten</h2>
    <div class="grid2-container">
      <div>
        <solver-settings-input></solver-settings-input>
      </div>
      <div>
        <b-button v-on:click="startSolver()" @click="startTerminal()" variant="primary"><i class="fa fa-play"></i>Optimierung starten</b-button>
      </div>
      <div>  
        <b-button v-on:click="stopSolver()" @click="stopTerminal()" variant="primary"><i class="fa fa-stop"></i>Optimierung stoppen</b-button>
      </div>    
    </div>
    <solver-status v-if="solverstatus"></solver-status>
    <router-link to=/pruefungsplan class="continue" tag="b-button" ><i class="fa fa-arrow-right"></i>Weiter</router-link>
    <p></p>
    <terminal-output-solver ref="form"/>
</div>
</template>

<script>
import axios from "axios";
import AnzahlStudenten from "@/components/AnzahlStudenten.vue";
import AnzahlPruefungen from "@/components/AnzahlPrüfungen.vue";
import SolverStatus from "@/components/SolverStatus.vue";
import StartDatum from "@/components/StartDatum.vue";
import EndDatum from "@/components/EndDatum.vue";
import TerminalOutputSolver from "@/components/TerminalOutputSolver.vue";
import SolverSettingsInput from "@/components/SolverSettingsInput.vue";

export default {
  components: {
    SolverStatus,
    AnzahlStudenten,
    AnzahlPruefungen,
    StartDatum,
    EndDatum,
    TerminalOutputSolver,
    SolverSettingsInput,
  },
  data() {
    return {
      token: '',
      solverstatus: false,
      examPeriod: '',
      startDate: '',
      endDate: ''
    };
  },
  methods: {
    startSolver() {
      axios
        .get(this.$IPOPTIMIZATION + "/startsolver")
        .then(function (response) {
          this.solverstatus = true;
          console.log(response);
        })
        .catch(function () {
          console.log("Solver wurde gestartet");
        });
    },
    stopSolver() {
      axios
        .get(this.$IPOPTIMIZATION + "/stopsolver")
        .then(function (response) {
          this.solverstatus = false;
          console.log("Solver wurde gestoppt");
        })
        .catch(function () {
          console.log("Solver konnte nicht gestoppt werden");
        });
    },
    startTerminal() {
      this.$refs.form.startIntervall();
    },
    stopTerminal() {
      this.$refs.form.stopIntervall();
    },
    
  },
};
</script>
<style>
.grid2-container {
  display: inline-grid;
  grid-template-columns: auto auto auto;
  grid-gap: 2px;
  background-color: #0000000;
  padding: 10px;
}
.schoen {
  width: 100%;
  max-width: 100%;
}
.datum {
  width: 275%;
  max-width: 275%;
}
.continue{
  float: right;
  margin-left: 100px
}
</style>
