<template>
<div>
  <div>
    <b-button class="togglebutton" v-on:click="start()"><i class="fa fa-play"></i> Start Solver</b-button>
    <b-button class="togglebutton" v-on:click="stop()"><i class="fa fa-stop"></i> Stop Solver</b-button>
    <b-button class="togglebutton" v-on:click="toggleFunction()">Prüfungsplan anzeigen</b-button>
  </div>
  <div id="myDIV" style="display:none" class="small-test">
    <wue-exam-result-table></wue-exam-result-table>
  </div>
</div>
</template>

<script>
import WueExamResultTable from '@/components/WueExamResultTable.vue';
import axios from "axios";

export default {
  name: 'bootstrap',
  components: {
    WueExamResultTable,
  },
  methods: {
    toggleFunction() {
      var x = document.getElementById("myDIV");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    },
    start(){
      let formData = new FormData();
      formData.append('file', this.file);
      axios.get('http://localhost:5000/pruefungsansicht',
      formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(function () {
        console.log('Solver wurde gestartet');
      })
      .catch(function(){
        console.log('Problem beim Starten des Solvers');
      });
    },
    stop(){
      let formData = new FormData();
      formData.append('file', this.file);
      axios.get('http://localhost:5000/pruefungsansicht',
      formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(function () {
        console.log('Solver wurde gestoppt');
      })
      .catch(function(){
        console.log('Problem beim Stoppen des Solvers');
      });
    }
  }
}  
</script>

<style>
.small-test {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  }
</style>