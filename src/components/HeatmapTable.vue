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
	<b-modal size="xl" id="modal-1" title="Heatmap">
		<h3><b>Slot auswählen: </b></h3>
        <heatmap @update:option="optionUpdate"/>
			<h3><b>Prüfungstag ändern zu: {{config}} </b></h3>
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
			message: "GudeMahude",
		    tableColumns1: [
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
      sendData: function (row) {
        axios.post(this.$IPBE + "/heatmap_input", {
			"exam_id": row
		}, {
			headers: {
				"Content-Type": "application/json"
			}
		})
        .then(response => {
          console.log("success", row)
        })
        .catch(error => {
          console.log("fail")
        })
      },
	  getData () {
        axios.get(this.$IPBE + "/pruefungsansicht")
        .then(res => {this.tableRows1 = res.data;
          console.log(res.data);
        })
        .catch(error => {
          console.log(error)
        })
      },
	  optionUpdate: function(config) {
		  console.log(config);
	  },
	  onRowClick: function (row) {
        //row contains the clicked object from `rows`
        console.log(row)
      },
	  pushTest: function (row) {
		  let sendId = row
		  axios.post(this.$IPBE + "/heatmap_input",
		  sendId, {
			  headers: {
				  "Content-Type": "application/json",
			  },
			  data: {
				  "exam-id": row.exam_id
			  }
		  })
		  .then(function(){
			  consolge.log("gut");
		  })
		  .catch(function(){
			  console.log("fail")
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