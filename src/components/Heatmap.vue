<template>
<div>
<!-- <b-button @click="getData()">Testget</b-button> !-->
  <apexchart
    type="heatmap"
    :options="chartOptions"
    :series="series"
    v-on:click="sendData"
  ></apexchart>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "Heatmap",
  data: function () {
    return {
      chartOptions: {
        dataLabels: {
          enabled: false,
        },
        chart: {
          events: {
            click: function(event, chartContext, config) {
              console.log(config.config.series[config.seriesIndex])
              console.log(config.config.series[config.seriesIndex].name)
              console.log(config.config.series[config.seriesIndex].data[config.dataPointIndex])
        // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
            }
          },
          toolbar: {
            show: false,
          },
        },
        colors: ["#cf2213"],
        xaxis: {
          type: "category",
        },
      },
      series:  [{'name': '08:00 - 10:00',
  'data': [{'x': 'Montag 01.02.2021', 'y': 883.4837078642672},
   {'x': 'Dienstag 02.02.2021', 'y': 92.31127541645756},
   {'x': 'Mittwoch 03.02.2021', 'y': 856.4703157173371},
   {'x': 'Donnerstag 04.02.2021', 'y': 886.7675220531927},
   {'x': 'Freitag 05.02.2021', 'y': 267.3047240167824},
   {'x': 'Samstag 06.02.2021', 'y': 743.2442144105862},
   {'x': 'Sonntag 07.02.2021', 'y': 325.98509839552605},
   {'x': 'Montag 08.02.2021', 'y': 564.0672537911626},
   {'x': 'Dienstag 09.02.2021', 'y': 132.78512742485515},
   {'x': 'Mittwoch 10.02.2021', 'y': 365.73370031925066},
   {'x': 'Donnerstag 11.02.2021', 'y': 839.1639153706498},
   {'x': 'Freitag 12.02.2021', 'y': 513.1918003044503},
   {'x': 'Samstag 13.02.2021', 'y': 918.4855361186511},
   {'x': 'Sonntag 14.02.2021', 'y': 446.8028491768177}]},
 {'name': '10:00 -12:00',
  'data': [{'x': 'Montag 01.02.2021', 'y': 689.8351738383326},
   {'x': 'Dienstag 02.02.2021', 'y': 281.05889042838396},
   {'x': 'Mittwoch 03.02.2021', 'y': 583.4083287676351},
   {'x': 'Donnerstag 04.02.2021', 'y': 12.053931698718712},
   {'x': 'Freitag 05.02.2021', 'y': 443.16235729516006},
   {'x': 'Samstag 06.02.2021', 'y': 780.7688017060956},
   {'x': 'Sonntag 07.02.2021', 'y': 149.09072326851756},
   {'x': 'Montag 08.02.2021', 'y': 753.6599788068461},
   {'x': 'Dienstag 09.02.2021', 'y': 406.10289889643434},
   {'x': 'Mittwoch 10.02.2021', 'y': 298.6962087082042},
   {'x': 'Donnerstag 11.02.2021', 'y': 645.5047814364844},
   {'x': 'Freitag 12.02.2021', 'y': 361.98732668881416},
   {'x': 'Samstag 13.02.2021', 'y': 541.0019645455719},
   {'x': 'Sonntag 14.02.2021', 'y': 266.2409778555216}]},
 {'name': '12:00 -14:00',
  'data': [{'x': 'Montag 01.02.2021', 'y': 610.7393631314651},
   {'x': 'Dienstag 02.02.2021', 'y': 830.1275408093571},
   {'x': 'Mittwoch 03.02.2021', 'y': 616.9527110525966},
   {'x': 'Donnerstag 04.02.2021', 'y': 663.7930198146768},
   {'x': 'Freitag 05.02.2021', 'y': 376.8788830638198},
   {'x': 'Samstag 06.02.2021', 'y': 612.3499044916741},
   {'x': 'Sonntag 07.02.2021', 'y': 490.4921415106519},
   {'x': 'Montag 08.02.2021', 'y': 979.7996885074703},
   {'x': 'Dienstag 09.02.2021', 'y': 621.2353817567845},
   {'x': 'Mittwoch 10.02.2021', 'y': 149.8534161076217},
   {'x': 'Donnerstag 11.02.2021', 'y': 131.93603967909206},
   {'x': 'Freitag 12.02.2021', 'y': 240.50916609882677},
   {'x': 'Samstag 13.02.2021', 'y': 716.1587217134372},
   {'x': 'Sonntag 14.02.2021', 'y': 398.03954177794645}]},
 {'name': '14:00 - 16:00',
  'data': [{'x': 'Montag 01.02.2021', 'y': 440.0542660422706},
   {'x': 'Dienstag 02.02.2021', 'y': 6.234913080826909},
   {'x': 'Mittwoch 03.02.2021', 'y': 193.36076336649853},
   {'x': 'Donnerstag 04.02.2021', 'y': 81.08931195991809},
   {'x': 'Freitag 05.02.2021', 'y': 55.55069646484168},
   {'x': 'Samstag 06.02.2021', 'y': 196.98855426559214},
   {'x': 'Sonntag 07.02.2021', 'y': 163.50528182372048},
   {'x': 'Montag 08.02.2021', 'y': 823.3487549710092},
   {'x': 'Dienstag 09.02.2021', 'y': 913.0877199975158},
   {'x': 'Mittwoch 10.02.2021', 'y': 733.3386576481566},
   {'x': 'Donnerstag 11.02.2021', 'y': 397.4633504672156},
   {'x': 'Freitag 12.02.2021', 'y': 122.50625750227928},
   {'x': 'Samstag 13.02.2021', 'y': 907.5596937327643},
   {'x': 'Sonntag 14.02.2021', 'y': 495.2693288978447}]},
 {'name': '16:00 - 18:00',
  'data': [{'x': 'Montag 01.02.2021', 'y': 837.7011057489514},
   {'x': 'Dienstag 02.02.2021', 'y': 579.4845571300885},
   {'x': 'Mittwoch 03.02.2021', 'y': 116.43357798658782},
   {'x': 'Donnerstag 04.02.2021', 'y': 864.8716673253277},
   {'x': 'Freitag 05.02.2021', 'y': 31.50640989295239},
   {'x': 'Samstag 06.02.2021', 'y': 440.64630574968345},
   {'x': 'Sonntag 07.02.2021', 'y': 599.2614331981047},
   {'x': 'Montag 08.02.2021', 'y': 507.7124700578316},
   {'x': 'Dienstag 09.02.2021', 'y': 275.6254109761673},
   {'x': 'Mittwoch 10.02.2021', 'y': 237.02317900713143},
   {'x': 'Donnerstag 11.02.2021', 'y': 354.3585112897887},
   {'x': 'Freitag 12.02.2021', 'y': 216.37937956157748},
   {'x': 'Samstag 13.02.2021', 'y': 554.6723570771711},
   {'x': 'Sonntag 14.02.2021', 'y': 329.668098605694}]},
 {'name': '18:00 - 20:00',
  'data': [{'x': 'Montag 01.02.2021', 'y': 564.4144346327413},
   {'x': 'Dienstag 02.02.2021', 'y': 979.4531839043133},
   {'x': 'Mittwoch 03.02.2021', 'y': 33.89328709686901},
   {'x': 'Donnerstag 04.02.2021', 'y': 687.3403945347579},
   {'x': 'Freitag 05.02.2021', 'y': 773.4937007224461},
   {'x': 'Samstag 06.02.2021', 'y': 257.6628786513493},
   {'x': 'Sonntag 07.02.2021', 'y': 898.0410338988098},
   {'x': 'Montag 08.02.2021', 'y': 9.700912499557845},
   {'x': 'Dienstag 09.02.2021', 'y': 631.0407399928199},
   {'x': 'Mittwoch 10.02.2021', 'y': 175.9244403826},
   {'x': 'Donnerstag 11.02.2021', 'y': 478.740510943739},
   {'x': 'Freitag 12.02.2021', 'y': 287.3455700034152},
   {'x': 'Samstag 13.02.2021', 'y': 120.89305809790973},
   {'x': 'Sonntag 14.02.2021', 'y': 275.343269818645}]}],
    };
  },
  methods: {
    sendData: function(config) {
      this.$emit("update:option", this.chartOptions.chart.events.click)
    },
    getData () {
      axios.get(this.$IPBE + "/heatmap_input")
      .then(res => {this.series = res.data;
        console.log(res.data);
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
};
</script>
