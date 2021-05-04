<template>
  <div>
    <b-button
      id="show-btn"
      @click="
        $bvModal.show('modal-parameter-confirmation');
        getDates();
        calculateActualPeriod();
      "
      >Weiter</b-button
    >

    <b-modal
      id="modal-parameter-confirmation"
      title="Bestätigung der Prüfungsparameter"
      size="xl"
      hide-footer
    >
      <b-row>
        <b-col>
          <b-card title="Prüfungszeitraum">
            <br />
            <b>{{ this.firstDate }} </b> bis <b>{{ this.lastDate }}</b>
            <p></p>
          </b-card>
          <b-card title="Fixtermine">
            <b-table
              borderless
              :items="this.fixDates"
              :fields="fixDatesFields"
            ></b-table>
          </b-card>
        </b-col>

        <b-col>
          <b-card title="Prüfungstage"
            ><br />
            <!-- Anzahl Tage: <b> {{ actualExamPeriod}}</b> <br><br> !-->

            <ul style="list-style: none">
              <li v-for="date in actualPeriod">
                {{ date.locale("de").format("DD. MMMM") }}
              </li>
            </ul>
          </b-card>
        </b-col>
      </b-row>

      <b-button
        to="/raeume"
        variant="primary"
        class="continue"
        @click="confirmParameter"
        ><i class="fa fa-arrow-right"></i>Bestätigen & Weiter</b-button
      >
    </b-modal>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      lastDate: "",
      firstDate: "",
      actualPeriod: [],
      fixDatesFields: [
        {
          key: "EXAM",
          label: "",
        },
        {
          key: "date",
          label: "",
          formatter: (value) => {
            return value.locale("de").format("DD. MMMM YYYY");
          },
        },
        {
          key: "time",
          label: "",
        },
      ],
    };
  },
  props: [
    "actualExamPeriod",
    "totalExamPeriod",
    "completePeriod",
    "fixDates",
    "newSettings",
  ],
  methods: {
      // send day_mapping to backend
    confirmParameter() {
      console.log(this.completePeriod);
      axios
        .post(this.$IPBE + "/day_mapping", this.completePeriod, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          console.log("daymapping was sent to backend", response);
          this.$bvToast
            .toast(this.firstDate + " - " + this.lastDate, {
              title: "Prüfungszeitraum und Fixtermine bestätigt!",
              autoHideDelay: 20000,
            })
            .catch(function (error) {
              console.log("daymapping could not be sent to backend", error);
            });
        });
    },
    getDates() {
      console.log("fixdates:", this.fixDates);
      let calculateLastDate = this.completePeriod.slice(-1)[0]; //get last date from period
      this.lastDate = calculateLastDate.date
        .locale("de")
        .format("DD. MMMM YYYY"); // format last date
      this.firstDate = this.completePeriod[0].date
        .locale("de")
        .format("DD. MMMM YYYY"); // format first date
    },
    calculateActualPeriod() {
        // caluclate list of days with exams
      let actualPeriod = this.actualPeriod;
      this.completePeriod.forEach((element) => {
        if (element.selected) {
          actualPeriod.push(element.date);
        }
      });
    },
  },
};
</script>

<style>
</style>