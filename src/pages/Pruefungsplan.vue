<template>
<div>
  <div>
    <b-form-select v-model="selected" :options="options"></b-form-select>
  </div>
  <wue-exam-result-table></wue-exam-result-table>
</div>

</template>

<script>
import WueExamResultTable from '@/components/WueExamResultTable.vue';

export default {
  data() {
    return{
      selected: null,
      options: [
        { value: null, text: 'Bitte Prüfungsplan auswählen' },
        { value: 'a', text: "Gesamter Prüfungsplan" },
        { value: 'b', text: "Prüfungsplan mit Teilnehmern" },
      ]
    }
  },
  name: 'bootstrap',
  components: {
    WueExamResultTable,
  }
}  
</script>

<style>

</style>