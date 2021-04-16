<template>
<div>
<datatable
	title="Bitte Prüfungstermin zum Verschieben auswählen:"
	:columns="tableColumns1"
	:rows="tableRows1"
	:clickable="true"
	:searchable="false"
	:exportable="false"
	:printable="false"
	v-on:row-click="sendData"
	:sortable="false"
  	:perPage="[25, 50, 100]"
  	v-b-modal.modal-1
  	locale="de"
/>
	<b-modal size="xl" id="modal-1" hide-footer title="Heatmap" >
		<h3>Neuen Slot für Prüfung <b> {{pruefungsAuswahl}} </b> auswählen: </b></h3>
        <heatmap :parentmessage="parentmessage"/>
	</b-modal>
</div>
</template>

<script>
import axios from 'axios';
import DataTable from "vue-materialize-datatable";
import Heatmap from "@/components/Heatmap.vue"; 

  export default {
    components: {
      "datatable": DataTable,
	  Heatmap
    },
    data() {
	    return {
			pruefungsAuswahl: "",
			parentmessage: [],
		    tableColumns1: [
			    {
				    label: "Datum",
				    field: "day_date",
				    numeric: false,
				    html: false
			    },
				{
				    label: "Zeitslot",
				    field: "time_slot",
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
      sendData: function (row) {
        axios.post(this.$IPBE + "/heatmap_input", {
			"exam_id": row
		}, {
			headers: {
				"Content-Type": "application/json"
			},
			transformResponse: [(data) => { 
				this.parentmessage = JSON.parse(data);
				console.log(data)
			}]
		})
		this.pruefungsAuswahl = row.exam_name
      },
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