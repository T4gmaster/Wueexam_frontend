<template>
<div>
  <div>
    <b-form-select v-model="selected" :options="options"></b-form-select>
  </div>
    <div>
      <wue-exam-result-table />
    </div>
    <div>
      <solved-student-table />
    </div>
</div>

</template>

<script>
import WueExamResultTable from '@/components/WueExamResultTable.vue';
import SolvedStudentTable from '@/components/SolvedStudentTable.vue';

export default {
  data() {
    return{
      selected: null,
      options: [
        { value: null, text: 'Bitte Prüfungsplan auswählen' },
        { value: 'a', text: "Gesamter Prüfungsplan" },
        { value: 'b', text: "Prüfungsplan mit Teilnehmern" },
        { value: 'c', text: "Kalenderansicht" }
      ]
    }
  },
  name: 'bootstrap',
  components: {
    WueExamResultTable,
    SolvedStudentTable
  }
}  
</script>

<style>

</style>