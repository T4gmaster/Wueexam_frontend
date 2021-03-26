<template>
<div>
  <b-tabs content-class="mt-3" 
  fill 
  active-nav-item-class="font-weight-bold">
    <b-tab title="Gesamter Prüfungsplan" active>
      <wue-exam-result-table />
    </b-tab>
    <b-tab class="testtab" title="Prüfungsplan mit Teilnehmern">
      <solved-student-table />
    </b-tab>
    <b-tab title="Kalenderansicht" @click="forceRerender()" >
    <div class="container">
      <kalender-test class="left-container" :key="componentKey"/>
    </div>
    </b-tab>
    <b-tab title="Heatmap">
      <heatmap-table />
    </b-tab>
  </b-tabs>
</div>
</template>

<script>
import WueExamResultTable from '@/components/WueExamResultTable.vue';
import SolvedStudentTable from '@/components/SolvedStudentTable.vue';
import KalenderTest from "@/components/KalenderTest.vue";
import Heatmap from "@/components/Heatmap.vue"; 
import HeatmapTable from "@/components/HeatmapTable.vue"

export default {
  name: 'app',
  data () {
    return {
      componentKey: 0,
    }
  },
  components: {
    WueExamResultTable,
    SolvedStudentTable,
    KalenderTest,
    Heatmap,
    HeatmapTable

  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    }
  }
}  
</script>

<style>

</style>