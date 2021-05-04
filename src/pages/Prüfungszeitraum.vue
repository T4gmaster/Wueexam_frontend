<template>
<div>
  <b-tabs content-class="mt-3" 
  fill 
  active-nav-item-class="font-weight-bold">
    <b-tab title="Prüfungszeitraum">

<FunctionalCalendar
  v-model="calendarData"
  :configs="calendarConfigs"  
  :is-date-range='true'
  @choseDay="sendList(); calculatePeriod(); calculateActualPeriod()"
></FunctionalCalendar>

    <b-container fluid>
        <b-col>
          <p></p>
          <h4>Prüfungszeitraum: {{ this.totalExamPeriod ? this.totalExamPeriod + ' Tage' : 'bitte Zeitraum auswählen' }}</h4>
          <h4>Tage mit Klausuren: {{ totalExamDaysLength == 0 ? 'bitte Zeitraum auswählen' : totalExamDaysLength + ' Tage'}}</h4>
          <p></p>


          <b-row>

<b-list-group horizontal size="sm" @click="calculatePeriod()" v-for="module in completePeriod">
              <b-list-group-item  v-bind:for="module.date" flush horizontal button lg="1">{{ module.date.locale('de').format('dddd MM.DD.YYYY') }}
              <b-form-checkbox @change="calculateActualPeriod()" v-model="module.selected" v-bind:date="module.date"></b-form-checkbox>
              </b-list-group-item>
            </b-list-group>


          </b-row>
        </b-col>
    </b-container>


    </b-tab>
    <b-tab title="Fixtermine">
      <b-container>
          <b-table responsive :items="ExamOverviewDetails" :fields="examOverviewHeader" head-variant="light">

            <template #cell(action)="row">
        <b-button variant="primary" size="sm" @click="row.toggleDetails()" class="mr-2"><i class="fa fa-pencil"></i>
          Termin ändern
        </b-button>
            </template>
            <template v-slot:cell(fixdate)="row">
      <b-badge v-if="row.item.fixdate" variant="success">Fixtermin</b-badge>
      <b-badge v-else variant="warning">Solver</b-badge>
    </template>

            <template #row-details="row">
        <b-card>
          <b-row>
            <b-col md="2">
            <h5>Datum</h5>
            </b-col>
            <b-col md="6">
            <b-form-select v-model="fixdateSelection.day" :options="periodOptions" :select-size="5" class="mt-3"></b-form-select>
            </b-col>
            <b-col md="4"><b-button class="adddate" variant="primary" @click="row.toggleDetails()"><i class="fa fa-times"></i></b-button></b-col>
          </b-row>
          <b-row>
            <b-col md="2">
              <h5>Uhrzeit</h5>
            </b-col>
            <b-col md="6">
              <b-form-select v-model="fixdateSelection.time" :options="timeOptions" size="sm" class="mt-3"></b-form-select>
            </b-col>
            <b-col md="4"></b-col>
          </b-row>
           <b-row>
            <b-col md="2">
              <h5>Fixtermin</h5>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <b-form-radio-group v-model="fixdateYN" :options="fixdateOptions">
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col md="4"></b-col>
          </b-row>
            <b-button class="adddate" variant="success" @click="saveFixdate(row.item, row.index); row.toggleDetails()"><i class="fa fa-floppy-o"></i>Termin speichern</b-button>            
        </b-card>
            </template>
          </b-table>
    </b-container>
    </b-tab>
  </b-tabs>


      <b-container>
    <b-row>
    <b-column sm="5">
    </b-column>
    <b-column sm="3">
    </b-column>
    <parameter-confirmation 
    :actualExamPeriod="actualExamPeriod" 
    :totalExamPeriod="totalExamPeriod"
    :completePeriod="completePeriod"
    :fixDates="fixDates"
    :newSettings="newSettings"
    class="continue"></parameter-confirmation>
    
    </b-row>
  </b-container>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
import SolverSettingsInput from "@/components/SolverSettingsInput.vue";
import { FunctionalCalendar } from "vue-functional-calendar";
import ParameterConfirmation from "@/components/ParameterConfirmation.vue";

export default {
  data() {
    return {
      token: "",
      calendarData: {},
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
      fixdateSelection: [
        {
          day: ''
        },
        {
          time: ''
        },
        {
          row: ''
        },
        {
          selected: true
        }
      ],
      fixdateYN: true,
      fixdateOptions: [
        {
          text: 'hinzufügen', value: true
        },
        {
          text: 'entfernen', value: false
        }
      ],
      row:[
        {item:''}
      ],
      timeOptions: [
        {
          value: 1,
          text: '08:00 Uhr',
        },
        {
          value: 2,
          text: '10:00 Uhr'
        },
        {
          value: 3,
          text: '12:00 Uhr'
        },
        {
          value: 4,
          text: '14:00 Uhr'
        },
        {
          value: 5,
          text: '16:00 Uhr'
        },
        {
          value: 6,
          text: '18:00 Uhr'
        }
      ],
      totalExamDays: [],
      totalExamDaysLength: 0,
      examOverview: [],
      examPeriodInDays: "",
      period: "",
      completePeriod: [],
      daytime: "",
      examOverviewHeader: [
        { key: "EXAM", label: "Prüfung" },
        { key: "Teilnehmer", label: "Teilnehmer" },
        { key: "action", label: "" },
        { key: "fixdate", label: "Termin" },
      ],
      fixdateValue: "",
      days: "",
      dateArray: "",
      checked: false,
      xyz: [],
      fixDates: [],
      totalExamPeriod: '',
      actualExamPeriod: '',
      periodOptions: [],
      newSettings: '',
      ExamOverviewDetails: [],
      daysTotal: []
    };
  },
  created() {
    this.getLogin();
    setTimeout(() => this.getData(),1000);
  },
  computed: {
  },
  components: {
    SolverSettingsInput,
    FunctionalCalendar,
    ParameterConfirmation
  },
  methods: {
    // get List of all courses from backend (used for fixdates)
   async getData() {
      await axios
      .get(this.$IPBE + "/faecherliste", {
        headers: {
        "Authorization": `Bearer ${this.token}`
      }})
      .then((res) => {
        this.examOverview = res.data;
        console.log('examOverview:', res.data);
      })
      .catch((error) => {
        console.log(error);
      });
      // enrich courselist by details information in order to display fixdates later
      let ExamOverviewDetails = this.ExamOverviewDetails
      this.examOverview.forEach(element => {
        ExamOverviewDetails.push({EXAM: element.EXAM, EXAM_ID: element.EXAM_ID, Teilnehmer: element.Teilnehmer, fixdate: false, fixdate_date: '', fixdate_time: ''})
      })
      console.log('blablabla', ExamOverviewDetails)
    },
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
    // store fixdate and add to model
    saveFixdate(item, index) {
      console.log ('selected row:', item, index)
      console.log ('ID:', item.EXAM)
      console.log('date:', this.fixdateSelection.day)
      console.log('time:', this.fixdateSelection.time)
      console.log('examOverview:', this.examOverview)
      console.log('slot:', item.timeOptions)

      console.log('fixdatetruefalse:', this.fixdateYN)
      // allow to remove fixdate -> ToDo: validation if selected in post method
      if (this.fixdateYN == true) {
        item.fixdate = true
        let time = ''
      switch (this.fixdateSelection.time) {
        case 1:
          time = '08:00';
          break;
        case 2:
          time = '10:00';
          break;
        case 3:
          time = '12:00';
          break;
        case 4:
          time = '14:00';
          break;
        case 5:
          time = '16:00';
          break;
        case 6:
          time = '18:00';
          break;
      }
      let fixDates = this.fixDates
      fixDates.push({EXAM_ID: item.EXAM_ID, EXAM: item.EXAM, date: this.fixdateSelection.day, slot: this.fixdateSelection.time, time: time})
      console.log('fixdates:', fixDates)
      this.$bvToast.toast(
              item.EXAM + ' (' + moment(this.fixdateSelection.day).locale('de').format('dddd, DD.MM.YYYY') + ' - ' + time + ' Uhr) ',
              { title: 'Fixtermin gespeichert!',
              autoHideDelay: 20000
              }             
          );
      }
      else {
        item.fixdate = false
        console.log('entfernen:', item, index)
      console.log('aktuelle EXAMID:', item.EXAM_ID)
      console.log('current fixdates:', this.fixDates)
      let position = -1
      let fixDates = this.fixDates
      console.log('fixdates as internal variable:', fixDates)
      for (var i = 0; i<fixDates.length; i++) {
        if (fixDates[i].EXAM_ID == item.EXAM_ID) {
          console.log('halloichmöchtediepositionübergeben', i)
          position = i
        } 
      }
      console.log('position:',position)
      if (position >= 0) {
        this.fixDates.splice(position, 1)
        item.fixdate = false
        console.log ('item removed from fixDates:', this.fixDates)
      this.$bvToast.toast(
              item.EXAM,
              { title: 'Fixtermin entfernt!',
              autoHideDelay: 20000
              }             
          );
      } else {
        console.log('nothing to remove)')
        alert('Für das ausgewählte Fach ist kein Fixtermin hinterlegt.')
      }
      }
    },
    onRowClicked(data) {
      this.itemData = data;
      //...
      this.showModal = true;
      $(".ui.modal").modal("toggle");
      console.log(`Row with id ${data.id} clicked.`);
    },
    calculatePeriod() {
      // create Array finalPeriod that contains all dates of exam phase and information if date can be selected for exam or not
      var finalPeriod = new Array();
      this.completePeriod.forEach((element, index) => {
          finalPeriod.push({ day: index, date: element.date, selected: element.selected });
      });
      // calculate duration of selected exam Period
      this.totalExamPeriod = finalPeriod.length

    },
    examPeriod() {
      let start = moment(this.calendarData.dateRange.start);
      let end = moment(this.calendarData.dateRange.end);
      let days = end.diff(start, "days") + 1;
      console.log("Zeitraum:", days);
      this.examPeriod = this.days;
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


/*
      let periodOptions = this.periodOptions
      let firstDateTwo = moment(this.calendarData.dateRange.start);
      let lastDateTwo = moment(this.calendarData.dateRange.end);
      // let checkArray = new Array();



      while (firstDateTwo <= lastDateTwo) {
        periodOptions.push({'value': moment(new Date(firstDateTwo)), 'text': moment(new Date(firstDateTwo)).locale('de').format('dddd, DD.MM.YYYY')});
        firstDateTwo = moment(firstDateTwo).add(1, "days");
      }
      console.log('Auswahloptionen:', JSON.stringify(periodOptions));

*/




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

      this.period.dateArray.forEach((element, index) => {
        //////////////////////////////////////////////////
        // ToDo check and do only push, if no dublette!
        //////////////////////////////////////////////////
        xyz.push({
          day: index,
          date: element,
          selected: moment(element).weekday() == 0 ? false : true,
        });
      });
      console.log("complete Array:", xyz);
      this.completePeriod = xyz;
      console.log("complete period:", this.completePeriod);

      let actualPeriod = []
      this.completePeriod.forEach(element => {
        if (element.selected) {
          actualPeriod.push({'value': element.date, 'text': moment(element.date).locale('de').format('dddd, DD.MM.YYYY')})
        }
      })
      console.log('ichglaubichhabs', actualPeriod)
      this.periodOptions = actualPeriod
      console.log('periodOptions:', this.periodOptions)

      this.actualExamPeriod = this.periodOptions.length
      console.log('dauer ohne Sonntage:', this.actualExamPeriod)

    },
    calculateActualPeriod() {
      console.log('asdasdasdasd')
      console.log(this.completePeriod)
      var totalExamDaysLength = 0
      for(var i = 0; i < this.completePeriod.length; ++i){
          if(this.completePeriod[i].selected == true)
              totalExamDaysLength++;
      }
      console.log(totalExamDaysLength)
      this.totalExamDaysLength = totalExamDaysLength
      /*
      console.log (this.completePeriod)
      let totalExamDays = this.totalExamDays
      this.completePeriod.forEach((item) => {
        if (item.selected) {
          totalExamDays.push(item.date)
        }
      })
      this.totalExamDaysLength = totalExamDays.length
      console.log('sum of days with exams:', this.totalExamDaysLength)
      */
      



      


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
      let newSettings = this.newSettings
      newSettings = reply;
      console.log("settings received from child component:", newSettings);
      newSettings.days = this.totalExamPeriod; // add days from parent component to json object
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
.button {
  float: left;
  margin-left: 9px;
}
.adddate {
  float: right;
  margin-left: 9px;
}
</style>