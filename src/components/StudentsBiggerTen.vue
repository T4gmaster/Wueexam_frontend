<template>
  <div>
  <b-button class="button" variant="primary" v-b-modal.modal-1 @click="pushData()">Nach Anmeldungen filtern</b-button>
   <b-modal size="lg" id="modal-1" title="" ok-only>
  <b-card>
    <b-row>
      <b-col sm="8">
        <label><b>Anzeigen von Studenten mit Prüfungsanmeldungen mehr als:</b></label>
      </b-col>
      <b-col sm="4">
        <b-form-spinbutton v-model="regisstrationsetting" inline @change="pushData()"></b-form-spinbutton>
      </b-col>
    </b-row>
  </b-card>
  <datatable
  title=""
	:columns="tableColumns1"
  :printable="false"
  :exportable="true"
  :paginate="false"
	:rows="tableRows1"
  :perPage="[25, 50, 100]"
  locale="de"
  :key="componentKey"
/>
</b-modal>
  </div>
</template>

<script>
import axios from "axios";
import DataTable from "vue-materialize-datatable";


  export default {
    components: {
      "datatable": DataTable
    },
    data() {
      return {
        componentKey: 0,
        regisstrationsetting: 7,
        items: null,
        tableColumns1: [
			    {
				    label: "Mtr-Nr.",
				    field: "Matrikelnummer",
				    numeric: false,
				    html: false
			    },
			    {
				    label: "Nachname",
				    field: "Nachname",
				    numeric: false,
				    html: false
			    },
			    {
				    label: "Vorname",
				    field: "Vorname",
				    numeric: false,
				    html: false
			    },
			    {
				    label: "Anmeldungen",
				    field: "Anmeldungen",
				    numeric: false,
				    html: false
			    }
		    ],
		    tableRows1: [
		    ],
      };
    },
    methods: {
      pushData(){
        axios.post(this.$IPBE + "/anzahl_studenten_10", JSON.stringify({Anmeldung: this.regisstrationsetting}))
        .then(function( response ){
          this.tableRows1 = response.data
          console.log(response)
        }.bind(this));
        console.log(JSON.stringify({Anmeldung: this.regisstrationsetting}))
        this.componentKey += 1;
        console.log(this.componentKey)
      } 
    }
  }
</script>