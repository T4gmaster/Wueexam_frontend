<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col lg="2.5">
          <h2>Startdatum</h2>
          <b-calendar
            v-model="startDate"
            @context="logStartDate"
            locale="de"
            @click="getDates"
          ></b-calendar>
        </b-col>
        <b-col lg="3">
          <h2>Enddatum</h2>
          <b-calendar
            v-model="endDate"
            @context="logEndDate"
            locale="de"
            @click="getDates"
          ></b-calendar>
        </b-col>
        <b-col>
          <p></p>
          <h2>Prüfungszeitraum: {{ examPeriod }} Tage</h2>
          <p></p>
          <b-row>

            <p></p>

            <b-list-group size="sm" v-for="(day, index) in period" :key="index">
              <b-list-group-item size="sm">{{ day }}
              <b-form-checkbox></b-form-checkbox>
              </b-list-group-item>
            </b-list-group>
            <ul>
              <li v-for="(day, index) in period"> {{ day }}

              </li>
            </ul>


            <!--
            <b-table hover :items="period">
            </b-table>
            <ul>
              <li v-for="(day, index) in periods">
                {{day}}

              </li>
            </ul>

            !-->

            



          </b-row>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="9">
          <h2>Fixtermine</h2>
          <b-table striped hover :items="examOverview" :fields="examOverviewHeader">
                                    <template #cell(fixdate)="data">
                                      <b-dropdown text="Datum wählen" size="sm" variant="primary">
                                        <b-dropdown-item v-for="(day, index) in period" :key="index">{{day}}</b-dropdown-item>
                                      </b-dropdown>
            </template>
          </b-table>
        </b-col>
        <b-col>
          <button @click="testtest">Prüfungen logen</button>
        </b-col>
      </b-row>
    </b-container>
      <b-container>
    <b-row>
    <b-column sm="5">
    </b-column>
    <b-column sm="3">
    <solver-settings-input></solver-settings-input>
    </b-column>
    <router-link to=/solver tag="b-button" class="continue" ><i class="fa fa-arrow-right"></i>Weiter</router-link>
    <b-button @click="updateParameters">Parameter speichern</b-button>
    </b-row>
  </b-container>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
import testpruefungen from "@/assets/testpruefungen.json";
import SolverSettingsInput from "@/components/SolverSettingsInput.vue"



export default {
  data() {
    return {
      startDate: "",
      endDate: "",
      examOverview: testpruefungen,
      period: "",
      examOverviewHeader: [
        {key: "Fach", label: "Fach"},
        {key: "Teilnehmer", label: "Teilnehmer"},
        {key: "Lehrstuhl", label: "Lehrstuhl"},
        {key: "Studiengang", label: "Studiengang"},
        {key: "fixdate", label: "Datum"}
      ],
      fixdateValue: '',
      testUpdateData: {
        days: 17,
        days_before: 14,
        solver_msg: true,
        solver_time_limit: 20000
      },
      days:""
    };
  },
  computed: {
    examPeriod() {
      let start = moment(this.startDate);
      let end = moment(this.endDate);
      let days = end.diff(start, "days");
      return days;
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
   //   const dateJson = {
   //     Prüfungstage: dateArray,
   //   };
 //     const dateJson = (JSON.stringify(dateArray))
        console.log(dateArray)
   //   console.log(JSON.stringify(dateJson));

      // fix: Prüfungstage variable korrekt übergeben
      this.period = dateArray;
      return dateArray;
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
    testtest() {
      console.log(this.examOverview);
    },
    updateParameters() {
      let days=this.days
      let testdaten = {test: this.testUpdateData, dauer: days}
      testdaten.toJSON
      console.log(testdaten);
      axios.post('http://localhost:5001/update_parameters', testdaten)
    }
  }
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
