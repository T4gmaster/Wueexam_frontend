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
            v-model="registration.exam"
            :options="ExamSelectOptions"
            size="sm"
            class="mt-3"
          ></b-form-select>
          <p>ID: {{ EXAM }}</p>
          </b-col>
        </b-row>
      </b-card>
      <b-button @click="showRegistration" variant="primary">hinzufügen</b-button>
    </b-modal>
  </div>
</template>

<script>
import faecher from "@/assets/faecher.json";

export default {
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
        {key: 'wiwi', text: "Wirtschaftswissenschaften"},
        {key: 'winf', text: "Wirtschaftsinformatik"},
        {key: 'wima', text: "Wirtschaftsmathe"}
      ],
      ExamSelectOptions: faecher,
    };
  },
  methods: {
    /* send registration to BE
    addRegistry() {
      axios.post('http://localhost:5001/addRegistry', {
        EXAM: this.registration.exam,
        EXAM_ID: this.registration.examID,
        LAST_NAME: this.registration.lastName,
        FIRST_NAME: this.registration.firstName,
        MATRICULATION_NUMBER: this.registration.matriculationNumber,
        COURSE: this.registration.course,
      })
        .then((response) => {
          console.log(response);
        });
    */
    // show registration in list -> integrate into BE method
    showRegistration() {
      //this.$emit(this.registration);
      console.log(this.registration);
    }
  }
};
</script>