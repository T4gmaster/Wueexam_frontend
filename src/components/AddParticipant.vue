<template>
  <div>
    <b-button id="show-btn" @click="$bvModal.show('modal-add-participant')" variant="primary" 
      >Anmeldung manuell hinzufügen</b-button
    >
    <b-modal id="modal-add-participant" title="Prüfungsanmeldung hinzufügen" size="xl" hide-footer>
      <b-card>
        <b-row>
          <b-col sm="2">
          <h5>Vorname</h5>
          </b-col>
          <b-col sm="6">
          <b-form-input v-model="registration.firstName" size="lg"></b-form-input>
          </b-col>
        </b-row>
        <p></p>
        <b-row>
          <b-col sm="2">
          <h5>Nachname</h5>
          </b-col>
          <b-col sm="6">
          <b-form-input v-model="registration.lastName" size="lg"></b-form-input>
          </b-col>
        </b-row>
        <p></p>
        <b-row>
          <b-col sm="2">
          <h5>Matrikelnummer</h5>
          </b-col>
          <b-col sm="6">
          <b-form-input v-model="registration.matriculationNumber" size="lg"></b-form-input>
          </b-col>
        </b-row>
<p></p>
        <b-row>
          <b-col sm="2">
          <h5>Studiengang</h5>
          </b-col>
          <b-col sm="6">
          <b-form-select
            v-model="registration.course"
            :options="CourseSelectOptions"
            size="sm"
            class="mt-3"
          ></b-form-select>
          </b-col>
        </b-row>
<p></p>
        <b-row>
          <b-col sm="2">
          <h5>Studienfach</h5>
          </b-col>
          <b-col sm="6">
          <b-form-select
            v-model="registration.examID"
            :options="ExamSelectOptions"
            value-field="EXAM_ID"
            text-field="EXAM"
            size="sm"
            class="mt-3"
            @change="calculateName"
          ></b-form-select>
          <p>ID: {{ registration.examID }}</p>
          </b-col>
        </b-row>
      </b-card>
      <b-button @click="showRegistration" type="submit" class="cancel" variant="primary">hinzufügen</b-button> 
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    updateRegistration: String
    },
  data() {
    return {
      registration: {
        exam: "",
        examID: "",
        lastName: "",
        firstName: "",
        matriculationNumber: "",
        course: ''
      },
      // alle Studiengänge die ausgewählt werden können
      CourseSelectOptions: [
        {value: 'Wirtschaftswissenschaften', text: "Wirtschaftswissenschaften"},
        {value: 'Wirtschaftsinformatik', text: "Wirtschaftsinformatik"},
        {value: 'Wirtschaftsmathe', text: "Wirtschaftsmathe"}
      ],
      ExamSelectOptions: [],
    };
  },
  methods: {
    // send new registration to parent component and show confirmation
    showRegistration(event) {
      let registrationArray = ({EXAM: this.registration.exam, EXAM_ID: this.registration.examID, LAST_NAME: this.registration.lastName, FIRST_NAME: this.registration.firstName, MATRICULATION_NUMBER: this.registration.matriculationNumber, COURSE: this.registration.course})
      this.$emit("updateRegistration", registrationArray);
      console.log('Registration handed over to parent component:', registrationArray);
      this.$bvModal.hide('modal-add-participant');
      let registration = this.registration
      this.$bvToast.toast(
        registration.firstName + ' ' + registration.lastName + ' (' + registration.matriculationNumber + ') ' + ' - ' + registration.exam + ' (' + registration.examID + ')',
        {
        title: 'Prüfungsanmeldung hinzugefügt',
        autoHideDelay: 20000,
      });
      //clean form
      this.registration.firstName='';
      this.registration.lastName='';
      this.registration.matriculationNumber='';
      this.registration.exam='';
      this.registration.examID='';
      this.registration.course='';
    },
    calculateName() {
      console.log('apsfhapigh')
      let report = this.ExamSelectOptions.find( option => option.EXAM_ID === this.registration.examID);
      console.log(report)
      this.registration.exam = report.EXAM
    },
    // get exam select options from backend
    getExams() {
      let token = ""
      axios.post(this.$IPBE + "/login", {
        name: this.$NAME,
        password: this.$PW
      })
      .then(response => {
        this.token = response.data.token
        axios.get(this.$IPBE + "/faecherliste", {
          headers: {
          "Authorization": `Bearer ${this.token}`
        }})
        .then(res=> {this.ExamSelectOptions= res.data;
        console.log('Faecherliste from backend: ', res.data);
        })
        .catch(error => {
          console.log(error)
        })
      })
    }
  },
  created() {
    this.getExams()
  }
};
</script>


<style>
.cancel{
  float: right;
  margin-left: 250px
}
</style>