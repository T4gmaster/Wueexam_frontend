<template>
  <div>
    <navigation-bar></navigation-bar>
    <bootstrap-table></bootstrap-table>
    <input-exam-plan></input-exam-plan>
  </div>
</template>

<script>
// @ is an alias to /src
import BootstrapTable from "@/components/BootstrapTable.vue";
import NavigationBar from "@/components/NavigationBar.vue";
import InputExamPlan from "@/components/InputExamPlan.vue";

export default {
  name: "Bootstrap",
  components: {
    BootstrapTable,
    NavigationBar,
    InputExamPlan
  }
}
</script>