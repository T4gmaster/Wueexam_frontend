<template>
    <link rel="stylesheet" href="https://unpkg.com/primitive-ui/dist/css/main.css" />
        <div id="app" class="small-container">
            <wue-exam-result-table />
            <test-table />
        </div>
</template>


<script>
import WueExamResultTable from '@/components/WueExamResultTable.vue'
import TestTable from '@/components/TestTable'

  export default {
    name: 'app',
    components: {
      WueExamResultTable,
      TestTable
    },
  }
</script>

<style>
  button {
    background: #ebebf7;
    height: 20px;
    width: 100px;
    border: 1px solid #000000;
  }
  .small-container {
    max-width: 68px;
  }
</style>