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
            name: 'Anzahl',
            data: [],
          }],
          chartOptions: {
            title: {
              text: "Verteilung Teilnehmer je Prüfung",
              align: "center",
              style: {
                fontSize: "24px"
              }
            },
            chart: {
              type: 'bar',
              height: 350
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            xaxis: {
              categories:  [],
              title: {
                text: "Teilnehmer"
              }
            },
            yaxis: {
              title: {
                text: 'Prüfungen'
              }
            },
            fill: {
              opacity: 1
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val + " Prüfungen"
                }
              }
            }
          }
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
            axios.get(this.$IPBE + "/abbildung_pruefungsverteilung", {
              headers: {
              "Authorization": `Bearer ${this.token}`
            }})
            .then(res => {
              this.series[0].data = res.data.Anzahl;
              this.chartOptions.xaxis.categories = res.data.Teilnehmerzahl
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