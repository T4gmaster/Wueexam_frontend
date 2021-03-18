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
        color: ["#063d79"],
        xAxis: {
          data: [],
          name: "Anmeldungen"
        },
        yAxis: {
          type: 'value',
          name: "Anzahl Studenten"
        },
        series: {
          type: 'bar',
          data: [],
          itemStyle: {
            borderRadius: [5, 5, 0, 0]
          }
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
      axios.get('http://132.187.226.24:5000/anmeldungen_distribution')
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