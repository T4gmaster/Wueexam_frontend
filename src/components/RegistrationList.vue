<template>

<datatable class="table"
	title="Gesamte Anmeldeliste"
	:columns="tableColumns1"
	:rows="tableRows1"
  :perPage="[5, 25, 50, 100]"
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
				    label: "Prüfung",
				    field: "EXAM",
				    numeric: false,
				    html: false
			    },
			    {
				    label: "Prüfungs ID",
				    field: "EXAM_ID",
				    numeric: false,
				    html: false
			    },
			    {
				    label: "Nachname",
				    field: "LAST_NAME",
				    numeric: false,
				    html: false
			    },
			    {
				    label: "Vorname",
				    field: "FIRST_NAME",
				    numeric: false,
				    html: false
			    },
				{
				    label: "Mtr-Nr.",
				    field: "MATRICULATION_NUMBER",
				    numeric: false,
				    html: false
			    },
				{
				    label: "Studiengang",
				    field: "COURSE",
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
        axios.get(this.$IPBE + '/anmeldeliste')
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

<style>
.table {
	margin-top: 20px;
}

</style>