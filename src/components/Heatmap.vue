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
</div>
</template>

<script>
import axios from "axios";

export default {
  props: ["parentmessage"],
  name: "Heatmap",
  data: function () {
    return {
      chartOptions: {
        dataLabels: {
          enabled: false,
        },
        chart: {
          events: {
            click: function(event, chartContext, config) {
              console.log(config.config.series[config.seriesIndex])
              console.log(config.config.series[config.seriesIndex].name)
              console.log(config.config.series[config.seriesIndex].data[config.dataPointIndex].x)
        // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
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
  computed: {
    passSeries() {
      let localOptions = Object.assign({}, this.series)
      localOptions = this.parentmessage;
      return localOptions;
    }
  }
};
</script>
