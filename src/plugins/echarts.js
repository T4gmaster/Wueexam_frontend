import Vue from 'vue'
import ECharts from 'vue-echarts'
import { use } from 'echarts/core'
// import ECharts modules manually to reduce bundle size

import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  BarChart,
  HeatmapChart
} from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  VisualMapComponent,
  SingleAxisComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent,
  VisualMapComponent,
  HeatmapChart,
  SingleAxisComponent
]);

// register globally (or you can do it locally)
Vue.component('v-chart', ECharts)
