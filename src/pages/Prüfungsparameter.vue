<template>
  <div>
    <h2>Startdatum</h2>
    <b-calendar v-model="startDate" @context="logStartDate" locale="de"></b-calendar>
    <h2>Enddatum</h2>
    <b-calendar v-model="endDate" @context="logEndDate" locale="de"></b-calendar>
    <h3>Prüfungszeitraum: {{ examPeriod }} Tage</h3>
    <button @click="getDates">einzelne Tage (in Console) anzeigen</button>
    <!--<li :v-for="index in dateArray"></li> !-->

  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      startDate: '',
      endDate: ''
    }
  },
  computed: {
    examPeriod () {
      let start = moment(this.startDate)
      let end = moment(this.endDate)
      let days = end.diff(start, "days")
      return days
    }
  },
  methods: {
    logStartDate () {
      console.log('Startdatum Prüfungszeitraum' + ' ' + this.startDate);
    },
    logEndDate () {
      console.log('Enddatum Prüfungszeitraum' + ' ' + this.endDate);
    },
    addDays() {
      let result = new Date ();
      result.setDate(result.getDate() +1);
      return result
    },
    getDates(startDate, stopDate) {
      let dateArray = new Array();
      let firstDate = moment(this.startDate);
      let lastDate = moment(this.endDate);
      while (firstDate <= lastDate) {
        dateArray.push(new Date (firstDate));
        firstDate = moment(firstDate).add (1, "days")
        moment(this.firstDate).format('DD.MM.YYYY')
      }
      console.log(dateArray)
      return dateArray
    }
  }
}
</script>

<style scoped>
.kalender {
  float: left;
}
</style>

<!--
<template>
<div>
<button @click="getDates"></button>
</div>
</template>

<script>
import Button from '../components/Button.vue';

export default {
  components: { Button },
  methods: {
    getDatesBetween {
      function(startDate, endDate) {
        let currentDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate()
        );
        while (currentDate <= endDate) {
          dates.push(currentDate);

          currentDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate() +1,
          );
        }
        return dates;
      }
    }
    

  }
  getDatesBetween = (startDate, endDate) => {
    const dates = [];

    // Strip hours minutes seconds etc.
    let currentDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
    );

    while (currentDate <= endDate) {
        dates.push(currentDate);

        currentDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + 1, // Will increase month if over range
        );
    }

    return dates;
};

// Usage
const dates = getDates(new Date(2018, 0, 30, 11, 30), new Date(2018, 2, 2, 23, 59, 59)); 

console.log(dates);
}
</script>

<!--

<template>
<div>
  <div>
    <router-link to=/solver tag="button" class="continue">Weiter</router-link>
  </div>
    <div>
    <label for="start-timeperiod">Beginn der Prüfungsphase</label>
    <b-form-datepicker
      id="start-timeperiod"
      v-model="start"
      class="mb-2"
    ></b-form-datepicker>
    <label for="end-timeperiod">Ende der Prüfungsphase</label>
    <b-form-datepicker
      id="end-timeperiod"
      v-model="end"
      class="mb-2"
    ></b-form-datepicker>
  </div>
</div>
</template>
<script>
export default {
    data() {
      return {
        value: ''
      }
    }
  }
</script>
<style>
.continue {
  float: right;
  height: 35px;
  width: 125px;
}
</style>
