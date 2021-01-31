<template>
<div>
  <div class="grid-container">
    <div>
      <a target="_blank" href="https://wuestudy.zv.uni-wuerzburg.de/"><button class= "kachel" id="k1">WueStudy</button></a>
    </div>
    <div>
      <a href="http://localhost:8081/upload"><button class= "kachel">Upload Prüfungsanmeldung</button></a>
    </div>
    <div>
      <a href="http://localhost:8081/pruefungsplan"><button class= "kachel">Prüfungsplan</button></a>
    </div>
    <div>
      <a href="http://localhost:8081/pruefungsplan"><button class= "kachel">Prüfungsplan</button></a>
    </div>
    <div>
      <a href="http://localhost:8081/pruefungsplan"><button class= "kachel">Prüfungsplan</button></a>
    </div>
    <div>
      <a href="http://localhost:8081/pruefungsplan"><button class= "kachel">Prüfungsplan</button></a>
    </div>
  </div>
</div>

  </div>
</template>
<script>
import { StatsCard, ChartCard } from "@/components/index";
import Chartist from 'chartist';
export default {
  components: {
    StatsCard
  },
  data() {
    return {
      statsCards: [
        {
          type: "warning",
          icon: "ti-server",
          title: "Capacity",
          value: "105GB",
          footerText: "Updated now",
          footerIcon: "ti-reload"
        },
        {
          type: "success",
          icon: "ti-wallet",
          title: "Revenue",
          value: "$1,345",
          footerText: "Last day",
          footerIcon: "ti-calendar"
        },
        {
          type: "danger",
          icon: "ti-pulse",
          title: "Errors",
          value: "23",
          footerText: "In the last hour",
          footerIcon: "ti-timer"
        },
        {
          type: "info",
          icon: "ti-twitter-alt",
          title: "Followers",
          value: "+45",
          footerText: "Updated now",
          footerIcon: "ti-reload"
        }
      ]
    };
  }
};
</script>
<style>
.kachel {
  height: 130px;
  width: 130px;
  border: 1px solid #000000;
  cursor: pointer;
}
.kachel:hover {
  background-color: #ddddeb;
}
.grid-container {
  display: inline-grid;
  grid-template-columns: auto auto auto;
  grid-gap: 2px;
  background-color: #0000000;
  padding: 10px;
}
</style>
