<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col>
          <h2>Startdatum</h2>
          <b-calendar
            v-model="startDate"
            @context="logStartDate"
            locale="de"
          ></b-calendar>
        </b-col>
        <b-col>
          <h2>Enddatum</h2>
          <b-calendar
            v-model="endDate"
            @context="logEndDate"
            locale="de"
          ></b-calendar>
        </b-col>
        <b-col>
          <h3>Prüfungszeitraum: {{ examPeriod }} Tage</h3>
          <button @click="getDates">einzelne Tage (in Console) anzeigen</button>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h2>Prüfungsübersicht</h2>
          <b-table striped hover :items="examOverview">
            <template #cell(show_details)="row">
              <b-button size="sm" @click="row.toggleDetails" class="mr-2"
                >Fixdatum festlegen</b-button
              >
            </template>
            <template #row-details="row">
              <b-card>
                <b-row class="mb-2">
                  <h2>test</h2>
                </b-row>
                <b-button size="sm" @click="row.toggleDetails"
                  >Hide Details</b-button
                >
              </b-card>
            </template>
          </b-table>
        </b-col>
        <b-col>
          <h2>Prüfungstage</h2>
          <!-- fix: Prüfungstage anzeigen
          <b-table striped hover :items="period"></b-table>!-->
          <ul>
            <li v-for="item in period" :key="item">
              {{ period.Prüfungstage }}
            </li>
          </ul>
          <p>{{ period }}</p>
          <button @click="testtest">Prüfungen logen</button>
        </b-col>
      </b-row>
    </b-container>
    <solver-settings-input></solver-settings-input>
  </div>
</template>

<script>
import moment from "moment";
import testpruefungen from "@/assets/testpruefungen.json";
import SolverSettingsInput from "@/components/SolverSettingsInput.vue"

export default {
  data() {
    return {
      startDate: "",
      endDate: "",
      examOverview: testpruefungen,
      period: "",
    };
  },
  computed: {
    examPeriod() {
      let start = moment(this.startDate);
      let end = moment(this.endDate);
      let days = end.diff(start, "days");
      return days;
    },
  },
  components: {
    SolverSettingsInput
  },
  methods: {
    logStartDate() {
      console.log("Startdatum Prüfungszeitraum" + " " + this.startDate);
    },
    logEndDate() {
      console.log("Enddatum Prüfungszeitraum" + " " + this.endDate);
    },
    addDays() {
      let result = new Date();
      result.setDate(result.getDate() + 1);
      return result;
    },
    getDates(startDate, stopDate) {
      let dateArray = new Array();
      let firstDate = moment(this.startDate);
      let lastDate = moment(this.endDate);
      while (firstDate <= lastDate) {
        dateArray.push(new Date(firstDate));
        firstDate = moment(firstDate).add(1, "days");
        // moment(this.firstDate).format('DD.MM.YYYY')
      }
      const dateJson = {
        Prüfungstage: dateArray,
      };
      console.log(JSON.stringify(dateJson));
      // fix: Prüfungstage variable korrekt übergeben
      this.period = dateArray;
      return dateArray;
    },
    testtest() {
      console.log(this.examOverview);
    },
  },
};
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
