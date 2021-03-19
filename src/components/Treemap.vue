<template>
  <div class="app">
    <apexcharts
      height="350"
      type="treemap"
      :options="chartOptions"
      :series="series"
    ></apexcharts>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "Chart",
  components: {
    apexcharts: VueApexCharts,
  },
  data: function () {
    return {
      chartOptions: {
        chart: {
          height: 350,
          type: "treemap",
        },
        legend: {
          show: false,
        },
        colors: [
          "#3B93A5",
          "#F7B844",
          "#ADD8C7",
          "#EC3C65",
          "#CDD7B6",
          "#C1F666",
          "#D43F97",
          "#1E5D8C",
          "#421243",
          "#7F94B0",
          "#EF6537",
          "#C0ADDB",
        ],
        plotOptions: {
          treemap: {
            distributed: true,
            enableShades: false,
          },
        },
      },
      series: [
        {
          data: [
            {
              x: "Mikrooekonomik 1",
              y: 120,
            },
            {
              x: "Mathematik fuer Studierende der Wirtschaftswissenschaft 2",
              y: 150,
            },
            {
              x: "Makrooekonomik 1",
              y: 69,
            },
            {
              x: "Konjunktur und Stabilisierung",
              y: 180,
            },
            {
              x: "Investition und Finanzierung fuer Fortgeschrittene",
              y: 67,
            },
            {
              x: "Interne Unternehmensrechnung und -steuerung",
              y: 67,
            },
            {
              x: "Grundlagen marktorientierter Unternehmensfuehrung",
              y: 78,
            },
            {
              x: "Grundlagen der quantitativen Wirtschaftsforschung",
              y: 99,
            },
            {
              x: "Gesellschafts- und Handelsrecht",
              y: 100,
            },
            {
              x: "Entscheidungstheorie",
              y: 10,
            },
            {
              x: "Entrepreneurship",
              y: 50,
            },
            {
              x: "Betriebswirtschaftliche Steuerlehre 1: Steuerrecht & Steuerwirkung",
              y: 46,
            },
            {
              x: "Mikrooekonomik fuer Nebenfaechler/-innen",
              y: 33,
            },
          ],
        },
      ],
    };
  },
};
</script>
