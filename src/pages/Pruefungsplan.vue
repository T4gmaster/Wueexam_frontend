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
    <b-tab title="Kalenderansicht (coming soon)" disabled>
      <kalender />
    </b-tab>
  </b-tabs>
</div>
</template>

<script>
import WueExamResultTable from '@/components/WueExamResultTable.vue';
import SolvedStudentTable from '@/components/SolvedStudentTable.vue';
import Kalender from "@/components/Kalenderansicht.vue";

export default {
  name: 'app',
  components: {
    WueExamResultTable,
    SolvedStudentTable,
    Kalender
  }
}  
</script>

<style>
.testtab {
  color: "0000000";
  background-color: "000000";
}
</style>