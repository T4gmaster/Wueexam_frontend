<template>

  <b-tabs content-class="mt-3">
    <b-tab title="Gesamter Prüfungsplan">
      <wue-exam-result-table />
    </b-tab>
    <b-tab title="Prüfungsplan mit Teilnehmern">
      <solved-student-table />
    </b-tab>
  </b-tabs>

</template>

<script>
import WueExamResultTable from '@/components/WueExamResultTable.vue';
import SolvedStudentTable from '@/components/SolvedStudentTable.vue';

export default {
  name: 'app',
  components: {
    WueExamResultTable,
    SolvedStudentTable
  }
}  
</script>

<style>

</style>