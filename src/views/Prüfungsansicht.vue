<template lang="html">
<p></p>
  <div>
    <button class="togglebutton" v-on:click="toggleFunction()">Prüfungsplan anzeigen</button>
  </div>
  <div id="myDIV" style="display:none">
    <div id="app" class="small-test">
        <wue-exam-result-table />
    </div>
  </div>
</template>

<script>
import WueExamResultTable from '@/components/WueExamResultTable.vue';

export default {
  name: 'app',
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
    }
  }
}  
</script>

<style>
.togglebutton {
  background: #ebebf7;
  color: black;
  height: 25px;
  width: 200px;
  border: 1px solid #000000;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
.small-test {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  }
</style>