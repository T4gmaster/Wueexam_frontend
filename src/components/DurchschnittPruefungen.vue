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
          icon: "ti-files",
          title: "Ø Prüfungen pro Tag",
          value: "",
        }
      ]
    };
  },
  methods: {
    getData () {
      axios.get(this.$IPBE + "/pruefungen_pro_tag")
      .then(res => {this.statsCards[0].value = res.data.toFixed(2);
        console.log(res.data);
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