<template>
<div id="chart">
  <apexchart :key="componentKey" type="bar" height="375" :options="chartOptions" :series="series"></apexchart>
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
              text: "Verteilung der Prüfungsanmeldungen",
              align: "center",
              style: {
                fontSize: "24px"
              }
            },
            colors: ["#063d79"],
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
              title: {
                text: "Anmeldungen"
              },
              categories:  []
            },
            yaxis: {
              title: {
                text: 'Anzahl Studenten'
              }
            },
            fill: {
              opacity: 1
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val + " Studenten"
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
            axios.get(this.$IPBE + "/anmeldungen_distribution", {
              headers: {
              "Authorization": `Bearer ${this.token}`
            }})
            .then(res => {
              this.series[0].data = res.data.Anzahl;
              this.chartOptions.xaxis.categories = res.data.Anmeldungen
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