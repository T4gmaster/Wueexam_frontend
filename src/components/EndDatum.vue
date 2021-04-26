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
          {{endDate}}
        </div>
      </stats-card>
    </div>
  </div> 
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
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
          icon: "ti-calendar",
          title: "Ende:",
          value: "21.03.2021"
        }
      ],
      token: '',
      examPeriod: '',
      endDate: ''
    };
  },
  async created() {
    await this.getLogin();
    setTimeout(() => this.getEndDate(),1000);
  },
  methods: {
    getLogin() {
      axios.post(this.$IPBE + "/login", {
        name: this.$NAME,
        password: this.$PW 
      })
      .then(response => {
        this.token = response.data.token
        console.log(this.token)
      })
    },
    async getEndDate() {
          await axios
            .get(this.$IPBE + "/download_day_mapping", {
              headers: {
                Authorization: `Bearer ${this.token}`,
              },
            })
            .then((res) => {
              this.examPeriod = res.data;
              console.log("daymapping from be: ", this.examPeriod);
              let lastDateString = this.examPeriod.slice(-1)[0]
              this.endDate = moment(lastDateString.ISO_date).format('DD.MM.YYYY')
              console.log('asdasd', this.endDate)

            })
            .catch((error) => {
              console.log(error);
            });
    },

  }
};
</script>

<style>

</style>