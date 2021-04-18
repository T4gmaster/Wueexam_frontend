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
          type: "info",
          icon: "ti-user",
          title: "Studenten",
          value: null,
        }
      ]
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
        axios.get(this.$IPBE + "/anzahl_studenten", {
          headers: {
          "Authorization": `Bearer ${this.token}`
        }})
        .then(res => {this.statsCards[0].value = res.data;
          console.log(res.data);
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

</style>