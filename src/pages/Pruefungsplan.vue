<template>
<div>
  <b-tabs content-class="mt-3" 
  fill 
  active-nav-item-class="font-weight-bold">
    <b-tab title="Gesamter Prüfungsplan" @click="forceRerender()" active>
      <wue-exam-result-table :key="componentKey" />
    </b-tab>
    <b-tab class="testtab" title="Prüfungsplan mit Teilnehmern">
      <solved-student-table :key="componentKey" />
    </b-tab>
    <b-tab title="Kalenderansicht" @click="startKalender()" >
      <kalender-test :key="componentKey" ref="form" />
    </b-tab>
    <b-tab title="Prüfungstermin verschieben">
      <heatmap-table :key="componentKey" />
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
    },
    startKalender () {
      this.$refs.form.startKalender();
      this.$refs.form.getData();
    }
  }
}  
</script>

<style>

</style>