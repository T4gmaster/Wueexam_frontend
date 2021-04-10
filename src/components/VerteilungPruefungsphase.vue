<template>
<div id="chart">
  <apexchart :key="componentKey" type="pie" width="380" :options="chartOptions" :series="series"></apexchart>
</div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      componentKey: 0,
      series: [],
      chartOptions: {
        plotOptions: {
        pie: {
          customScale: 1
        }
      },
        chart: {
          width: 380,
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
              fontSize: "25px"
            }
          }
        }]
      }
    }
  },
  methods: {
    getData () {
      axios.get(this.$IPBE + "/abbildung_piechart")
      .then(res => {
        this.series = res.data.data;
        this.chartOptions.labels = res.data.labels
        console.log(res.data.data);
        this.componentKey += 1;
      })
      .catch(error => {
        console.log(error)
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