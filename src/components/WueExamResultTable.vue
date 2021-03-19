<template>

<datatable
	title="Gesamter Prüfungsplan"
	:columns="tableColumns1"
	:rows="tableRows1"
  :perPage="[25, 50, 100]"
  locale="de"
/>

</template>

<script>
import axios from 'axios';
import DataTable from "vue-materialize-datatable";

  export default {
    components: {
      "datatable": DataTable
    },
    data() {
	    return {
		    tableColumns1: [
			    {
				    label: "Tag",
				    field: "day_id",
				    numeric: false,
				    html: false
			    },
			    {
				    label: "Datum",
				    field: "day_date",
				    numeric: false,
				    html: false
			    },
			    {
				    label: "Prüfungs ID",
				    field: "exam_id",
				    numeric: false,
				    html: false
			    },
			    {
				    label: "Prüfung",
				    field: "exam_name",
				    numeric: false,
				    html: false
			    }
		    ],
		    tableRows1: [
		    ],
	    }
    },
    methods: {
      getData () {
        axios.get(this.$IPBE + "/pruefungsansicht")
        .then(res => {this.tableRows1 = res.data;
          console.log(res.data);
        })
        .catch(error => {
          console.log(error)
        })
      }
    },
    created() {
      this.getData()
    }
  }
</script>

<style scoped>

</style>