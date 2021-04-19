<template>
<b-card>
<div id="chart">
  <apexchart :key="componentKey" type="pie" width="475" :options="chartOptions" :series="series"></apexchart>
</div>
</b-card>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      componentKey: 0,
      series: [],
      chartOptions: {
        title: {
          text: "Verteilung der Studiengänge",
          align: "center",
          style: {
            fontSize: "24px"
          }
        },
        legend: {
          show: true,
          fontSize: "15px",
          position: "bottom"
        },
        plotOptions: {
          pie: {
            customScale: 1,
          }
        },
        chart: {
          width: "150%",
          type: 'pie',
        },
        labels: [],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom',
              show: false, 
              fontSize: "30px"
            }
          }
        }]
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
        axios.get(this.$IPBE + "/abbildung_piechart", {
          headers: {
          "Authorization": `Bearer ${this.token}`
        }})
        .then(res => {
          this.series = res.data.data;
          this.chartOptions.labels = res.data.labels
          console.log(res.data.data);
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
};
</script>

<style>

</style>