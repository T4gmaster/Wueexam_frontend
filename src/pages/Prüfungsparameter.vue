<template>
<div>
<h2>Prüfungszeitraum festlegen:</h2>
<FunctionalCalendar
  v-model="calendarData"
  :configs="calendarConfigs"  
  :is-date-range='true'
  @choseDay="sendList()"
></FunctionalCalendar>
<button @click="examPeriod()">log dates</button>

    <b-container fluid>
        <b-col>
          <p></p>
          <button @click="calculatePeriod">Prüfungszeitraum berechnen</button>
          <h3>Prüfungszeitraum: {{ examPeriodInDays ? examPeriodInDays + ' Tage' : 'bitte die ausgewählten Tage bestätigen' }} </h3>
          <p></p>


          <b-row><!--
            <p></p>
            <b-list-group class="list-container" horizontal size="sm" v-for="(day, index) in period.dateArray" :key="index" v-model="period.DatArray">
              <b-list-group-item  flush horizontal button lg="1">{{ day.locale('de').format('dddd MM.DD.YYYY') }}
              <b-form-checkbox :checked="selected"></b-form-checkbox>
              </b-list-group-item>
            </b-list-group>
!-->

   <!-- Test: 
            <ul class="object administrator-checkbox-list">
    <li v-for="module in completePeriod">
      <label v-bind:for="module.date">
        <input type="checkbox" v-model="module.selected" v-bind:id="module.date">
        <span>{{ module.date.locale('de').format('dddd MM.DD.YYYY') }}</span>
      </label>
    </li>
</ul>
!-->

<b-list-group horizontal size="sm" @click="calculatePeriod" v-for="module in completePeriod">
              <b-list-group-item  v-bind:for="module.date" flush horizontal button lg="1">{{ module.date.locale('de').format('dddd MM.DD.YYYY') }}
              <b-form-checkbox v-model="module.selected" v-bind:date="module.date"></b-form-checkbox>
              </b-list-group-item>
            </b-list-group>






            





          </b-row>
        </b-col>
      <b-row>
        <b-col lg="9">
          <h2>Fixtermine</h2>
          <b-table striped hover :items="examOverview" :fields="examOverviewHeader">
                                    <template #cell(fixdate)="data">
                                      <b-dropdown text="Datum wählen" size="sm" variant="primary">
                                        <b-dropdown-item v-for="(day, index) in period.dateArray" :key="index">{{day.locale('de').format('dddd MM.DD.YYYY')}}</b-dropdown-item>
                                      </b-dropdown>
            </template>
            <template #cell(fixtime)="data">
              <b-input-group>
                <b-form-input v-model="daytime" type="text" placeholder="HH:mm"></b-form-input>
                <b-input-group-append>
                  <b-form-timepicker v-model="daytime" button-only right locale='de'></b-form-timepicker>
                </b-input-group-append>
              </b-input-group>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
      <b-container>
    <b-row>
    <b-column sm="5">
    </b-column>
    <b-column sm="3">
    <solver-settings-input @updateSettings="receiveSettings"></solver-settings-input>
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
import SolverSettingsInput from "@/components/SolverSettingsInput.vue";
import { FunctionalCalendar } from "vue-functional-calendar";

export default {
  data() {
    return {
      calendarData: [],
      calendarConfigs: {
        sundayStart: false,
        dateFormat: "yyyy-mm-dd",
        isDateRange: true,
        isSeparately: true,
        calendarsCount: "2",
        isMultiple: true,
        changeMonthFunction: true,
        changeYearFunction: true,
        dayNames: ["Mo", "Di", "Mit", "Do", "Fr", "Sa", "So"],
        isDark: false,
      },
      startDate: "",
      endDate: "",
      examPeriod: "",
      myModel: [
        { name: "Hans", selected: true },
        { name: "Dieter", selected: false },
      ],
      modules: [
        {
          id: 1,
          name: "Business",
          checked: true,
        },
        {
          id: 2,
          name: "Business 2",
          checked: false,
        },
      ],
      examOverview: [],
      examPeriodInDays: "",
      period: "",
      completePeriod: [],
      daytime: "",
      examOverviewHeader: [
        { key: "EXAM", label: "Prüfung" },
        { key: "EXAM_ID", label: "PrüfungsID" },
        { key: "Teilnehmer", label: "Teilnehmer" },
        { key: "fixdate", label: "Datum" },
        { key: "fixtime", label: "Zeit" },
      ],
      fixdateValue: "",
      testUpdateData: {
        days: 17,
        days_before: 14,
        solver_msg: true,
        solver_time_limit: 20000,
      },
      days: "",
      dateArray: "",
      checked: false,
      xyz: [],
    };
  },
  created() {
    this.getData();
  },
  computed: {

  },
  components: {
    SolverSettingsInput,
    FunctionalCalendar,
  },
  methods: {
    getData() {
      axios
        .get(this.$IPBE + "/faecherliste")
        .then((res) => {
          this.examOverview = res.data;
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    calculatePeriod() {
      var finalPeriod = new Array();
      this.completePeriod.forEach((element, index) => {
        if (element.selected == true) {
          finalPeriod.push({ day: index, date: element.date }); // evtl. JSON.stringify rein
        }
      });
      console.log("period without sundays:", finalPeriod);
      this.examPeriodInDays = finalPeriod.length;
      console.log("period in days:", this.examPeriodInDays);
    },
    examPeriod() {
      let start = moment(this.calendarData.dateRange.start);
      let end = moment(this.calendarData.dateRange.end);
      let days = end.diff(start, "days") + 1;
      console.log("Zeitraum:", days);
      this.examPeriod = this.days;
      console.log("test", examPeriod);
    },
    // Testfunktion um Datumsliste mit selected zu erweitern
    sendList() {
      let dateArray = new Array();
      //if (typeof(this.calendarData.dateRange.start) == 'undefined') {

      let firstDate = moment(this.calendarData.dateRange.start);
      let lastDate = moment(this.calendarData.dateRange.end);
      // let checkArray = new Array();
      while (firstDate <= lastDate) {
        dateArray.push(moment(new Date(firstDate)));
        firstDate = moment(firstDate).add(1, "days");
      }
      console.log("Zeitraum", dateArray);
      this.period = { dateArray };
      let xyz = new Array();
      /*
      this.period.dateArray.forEach((element) => {
        if (moment(element).weekday() == 0) {
          console.log("positiv");
        } else {
          console.log("negativ");
        }
      });
      */

      this.period.dateArray.forEach((element) => {
        var index = 1;
        xyz.push({
          date: element,
          selected: moment(element).weekday() == 0 ? false : true,
        });
      });
      console.log("complete Array:", xyz);
      this.completePeriod = xyz;
      console.log("complete period:", this.completePeriod);

      /*
      for (var i = 1; i <= this.dateArray.length; i++) {
        this.dateArray.map(this.dateArray.push('test'))
      }
      console.log('hallo', this.dateArray)
     
      this.period = {dateArray}
      var datePeriod = new Array();
      for (var i = 1; i <= this.period.dateArray.length; i++) {
        datePeriod.push(JSON.stringify(this.period.dateArray))
      }
      console.log('test' + this.datePeriod)*/
    },
    getDates() {
      let dateArray = new Array();
      //if (typeof(this.calendarData.dateRange.start) == 'undefined') {

      let firstDate = moment(this.calendarData.dateRange.start);
      let lastDate = moment(this.calendarData.dateRange.end);
      // let checkArray = new Array();
      while (firstDate <= lastDate) {
        dateArray.push(moment(new Date(firstDate)));
        firstDate = moment(firstDate).add(1, "days");
      }
      console.log("Zeitraum:", dateArray);
      this.period = { dateArray };
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
      let days = this.days;
      let testdaten = { test: this.testUpdateData, dauer: days };
      testdaten.toJSON;
      console.log(testdaten);
      axios.post(this.$IPBE + "/update_parameters");
    },
    logDates() {
      console.log("start:", moment(this.calendarData.dateRange.start));
      console.log("end:", this.calendarData.dateRange.end);
      console.log("start_alt:", this.startDate);
      // Zeitraum berechnen
      let start = moment(this.calendarData.dateRange.start);
      let end = moment(this.calendarData.dateRange.end);
      let days = end.diff(start, "days") + 1;
      console.log("Zeitraum:", days);
      // Tage anzeigen
    },
    // send settings to be
    receiveSettings(reply) {
      let newSettings = reply;
      console.log("settings received from child component:", newSettings);
      newSettings.days = this.testUpdateData.days; // add days from parent component to json object
      console.log("full settings:", newSettings);
      axios
        .post(this.$IPBE + "/update_parameter", newSettings, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.kalender {
  float: left;
}
.list-container {
  display: table; /* Make the container element behave like a table */
  width: 30%; /* Set full-width to expand the whole page */
}
</style>