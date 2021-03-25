<template>
  <div>
  <b-card>
    <b-row>
      <b-col sm="7">
        <label><b>Anzeigen von Studenten mit Prüfungsanmeldungen mehr als:</b></label>
      </b-col>
      <b-col sm="2">
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
/>
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
        regisstrationsetting: "8",
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
      getData () {
        axios.get(this.$IPBE + "/anzahl_studenten_10")
        .then(res => {this.tableRows1 = res.data;
          console.log(res.data);
        })
        .catch(error => {
          console.log(error)
        })
      },
      pushData(){
        axios.post(this.$IPBE + "", this.regisstrationsetting)
        .then(function( response ){
        }.bind(this));
        console.log(this.regisstrationsetting)
      } 
    },
    created() {
      this.getData()
    }
  }
</script>