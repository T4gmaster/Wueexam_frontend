<template>
<div>
<!-- <b-button @click="getData()">Testget</b-button> !-->
  <apexchart
    type="heatmap"
    :options="chartOptions"
    :series="passSeries"
    v-if="parentmessage"
    @click="updateMessage"
    v-on:click="updateSend"
  ></apexchart>
  <h3>Prüfungsslot ändern zu: <b> {{newData}} </b></h3>
  <div class="grid3-container">
  <div>
  <b-button variant="primary" @click="closeModal()"> Abbrechen </b-button>
  </div>
  <div>
  <b-button variant="primary" @click="saveTest()">Speichern</b-button>
  </div>
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  props: ["parentmessage"],
  name: "Heatmap",
  data: function () {
    return {
      newData: "Noch kein Slot ausgewählt",
      sendData: "",
      chartOptions: {
        dataLabels: {
          enabled: false,
        },
        chart: {
          events: {
            click: function(event, chartContext, config) {
              console.log(JSON.stringify({Slot: config.config.series[config.seriesIndex].name, Tag: config.config.series[config.seriesIndex].data[config.dataPointIndex].x}))
            }
          },
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          type: "category",
        },
        plotOptions: {
          heatmap: {
             shadeIntensity: 1,
            colorScale: {
              ranges: [
                {
                  from: 0,
                  to: 0,
                  color: "#1bcf1b",
                  name: "Aktuelles Datum"
                },
                {
                  from: 0.1,
                  to: 100,
                  color: "#e30800",
                  name: "Mögliche Termine (je dunkler, desto schlechter die Alternative)"
                }
              ]
            } 
          }
        }
      },
      series: [],
    };
  },
  methods: {
    saveChange: function (event, chartContext, config) {
    
      axios.post(this.$IPBE + "/heatmap_correction", {
        data: {"Slot":"14:00 - 16:00","Tag":"Freitag 12.02.2021"}
      }
      , {
        headers: {
          "Content-Type": "application/json"
          }
        })
        .then(response => {
          console.log("success", response)
        })
        .catch(error => {
          console.log("fail", error)
        })
    },
    saveTest() {
      axios.post(this.$IPBE + "/heatmap_correction", this.sendData)
      .then(function(response) {
        console.log(response)
      }.bind(this));
      console.log(this.sendData)
      this.$bvModal.hide('modal-1');
      setTimeout(() => this.$parent.$parent.$parent.getData(), 1000);
    },
    updateMessage: function(event, chartContext, config) {
      this.newData = config.config.series[config.seriesIndex].data[config.dataPointIndex].x + ", Uhrzeit: " + config.config.series[config.seriesIndex].name
    },
    updateSend: function(event, chartContext, config) {
      this.sendData = JSON.stringify({Slot: config.config.series[config.seriesIndex].name, Tag: config.config.series[config.seriesIndex].data[config.dataPointIndex].x})
      console.log(this.sendData)
    },
    closeModal() {
      this.$bvModal.hide('modal-1');
    }
  },
  computed: {
    passSeries() {
      let localOptions = Object.assign({}, this.series)
      localOptions = this.parentmessage;
      return localOptions;
    }
  }
};
</script>

<style>
.grid3-container {
  display: inline-grid;
  grid-template-columns: auto auto;
  grid-gap: 2px;
  background-color: #0000000;
  padding: 10px;
  float: right;
}
</style>