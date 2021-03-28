<template>
<div>
<!-- <b-button @click="getData()">Testget</b-button> !-->
  <apexchart
    type="heatmap"
    :options="chartOptions"
    :series="passSeries"
    v-if="parentmessage"
  ></apexchart>
  <h2>Prüfungstag ändern zu: {{}}</h2>
  <b-button @click="saveChange">Speichern</b-button>
</div>
</template>

<script>
import axios from "axios";

export default {
  props: ["parentmessage"],
  name: "Heatmap",
  newData: "",
  data: function () {
    return {
      chartOptions: {
        dataLabels: {
          enabled: false,
        },
        chart: {
          events: {
            click: function(event, chartContext, config) {
              let newData = JSON.stringify({Slot: config.config.series[config.seriesIndex].name, Tag: config.config.series[config.seriesIndex].data[config.dataPointIndex].x})
              console.log(newData)
              return newData
              /*this.newData = newData
              newData.push(config.config.series[config.seriesIndex].name, config.config.series[config.seriesIndex].data[config.dataPointIndex].x)
              /*console.log(this.newData)*/
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
    saveChange: function (newData) {
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
