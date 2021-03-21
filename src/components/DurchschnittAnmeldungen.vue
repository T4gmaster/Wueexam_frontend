<template>
<div>
  <div class="row">
    <div class="col-md-6 col-xl-3" v-for="stats in statsCards" :key="stats.title">
      <stats-card>
        <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
          <i :class="stats.icon"></i>
        </div>
        <div class="numbers" slot="content">
          <p>{{stats.title}}</p>
          {{stats.value}}
        </div>
      </stats-card>
    </div>
  </div> 
</div>
</template>

<script>
import axios from 'axios';
import { StatsCard, ChartCard } from "@/components/index";

let one = "http://132.187.226.24:5000/anzahl_studenten";
let two = "http://132.187.226.24:5000/anzahl_anmeldungen";

const requestOne = axios.get(one);
const requestTwo = axios.get(two);


export default {
  name: "HelloWorld",
  components: {
    StatsCard,
  },
  data() {
    return {
      statsCards: [
        {
          type: "",
          icon: "ti-pencil-alt",
          title: "Ø Anmeldungen pro Student",
          value: "",
        }
      ]
    };
  },
  methods: {
    getData () {
      axios.all([requestOne, requestTwo])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          let average = responseTwo.data / responseOne.data;
          this.statsCards[0].value = average.toFixed(2);
        console.log(average);  
        })
      )
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