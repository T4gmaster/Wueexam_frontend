<template>

<datatable
	title="Prüfungsplan mit Teilnehmern"
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
				    label: "Matrikelnummer",
				    field: "student_matnr",
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
			    },
          		{
				    label: "Datum",
				    field: "day_date",
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
		let token = ""
		axios.post(this.$IPBE + "/login", {
			name: this.$NAME,
			password: this.$PW
		})
      .then(response => {
        this.token = response.data.token
        axios.get(this.$IPBE + "/studentenansicht", {
          headers: {
          "Authorization": `Bearer ${this.token}`
        }})
        .then(res => {this.tableRows1 = res.data;
        })
        .catch(error => {
          console.log(error)
        })
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