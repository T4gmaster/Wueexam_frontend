<template>
<div id="chart">
  <apexchart :key="componentKey" type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
</div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
          componentKey: 0,
          series: [{
            data: []
          }],
          chartOptions: {
            title: {
              text: "Länge der Prüfungsphase für die Studenten (in Tagen)",
              align: "center",
              style: {
                fontSize: "24px"
              }
            },
            tooltip: {
              enabled: false
            },
            chart: {
              type: 'bar',
              height: 350
            },
            plotOptions: {
              bar: {
                borderRadius: 4,
                horizontal: true,
              }
            },
            dataLabels: {
              enabled: true
            },
            yaxis: {
              title: {
                text: "Länge des Prüfungszeitraums (in Tagen)"
              }
            },
            xaxis: {
              title: {
                text: "Studenten"
              },
              categories: [
              ],
            }
          },
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
            axios.get(this.$IPBE + "/abbildung_dauer", {
              headers: {
              "Authorization": `Bearer ${this.token}`
            }})
            .then(res => {
              this.series[0].data = res.data.values;
              this.chartOptions.xaxis.categories = res.data.labels
              this.componentKey += 1;
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

<style>

</style>