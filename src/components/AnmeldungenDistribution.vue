<template>
  <v-chart class="chart" :option="chartOptionsBar" />
</template>

<script>
import axios from 'axios';
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([
  CanvasRenderer,
  PieChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

export default {
  name: "HelloWorld",
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: "white"
  },
  data() {
    return {
      chartOptionsBar: {
        xAxis: {
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          name: "Anmeldungen"
        },
        yAxis: {
          type: 'value',
          name: "Anzahl Studenten"
        },
        series: {
          type: 'bar',
          data: [],
          
        },
        title: {
          text: "Verteilung der Prüfungsanmeldungen",
          x: 'center',
          textStyle: {
            fontSize: 24
          }
        },
        tooltip: {
          show: true
        },
        color: ['#127ac2']
      }
    };
  },
  methods: {
    getData () {
      axios.get('http://132.187.226.24:5000/Anmeldungen_Distribution')
      .then(res => {
        this.chartOptionsBar.xAxis.data = res.data.Anmeldungen;
        this.chartOptionsBar.series.data = res.data.Anzahl;
        console.log(res.data.Anmeldungen);
        console.log(res.data.Anzahl);
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
.chart {
  height: 400px;
}
</style>