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
          this.chartOptionsBar.xAxis.data = res.data.Anmeldungen;
          this.chartOptionsBar.series.data = res.data.Anzahl;
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
.chart {
  height: 400px;
}
</style>