<template>
  <div>
    <b-button id="show-btn" @click="$bvModal.show('modal-settings-input')" variant="primary"
      >technische Parameter ändern</b-button
    >
    <b-modal id="modal-settings-input" title="Solvereinstellungen ändern" size="xl" hide-footer>
        <!--Days before !-->
      <b-card title="Days before">
        <p></p>
        <b-row>
          <b-col sm="2">
            <label v-b-tooltip.hover title="Technische Erklärung">Tage</label>
          </b-col>
          <b-col sm="4">
            <b-form-spinbutton v-model="settings.days_before" inline></b-form-spinbutton>
          </b-col>
        </b-row>
        <p></p>
        <b-row>
          <b-col sm="2">
            <label v-b-tooltip.hover title="Technische Erklärung"
              >Gewichtung</label
            >
          </b-col>
          <b-col sm="7">
            <b-form-input
              v-model="weighting"
              type="range"
              min="0"
              max="1"
              step="0.01"
            ></b-form-input>
            <b-row>
              <div class="mt-2">Gewichtung: {{ weighting }}</div>
            </b-row>
          </b-col>
        </b-row>
      </b-card>
      <!--Teilnehmer Normierung !-->
      <b-card title="Teilnehmer Normierung">
          <p> </p>
          <b-table :items="exams" :fields="normalizationtable" small borderless>

              <template #cell(normalizationweighting)="data">
                  <b-form-spinbutton :v-for="normalizationweightingvalue in exams" :value="normalizationweightingvalue" min="0" max="1" step="0.01" inline></b-form-spinbutton>
              </template>
          </b-table>



      </b-card>
      <!--Technische Einstellungen !-->
      <b-card title="Technische Einstellungen">
        <p></p>
        <b-row>
          <b-col sm="2">
            <label v-b-tooltip.hover title="Technische Erklärung"
              >Zeitlimit in Sekunden</label
            >
          </b-col>
          <b-col sm="4">
            <b-form-spinbutton min="1" max="100000" v-model="settings.solver_time_limit" inline></b-form-spinbutton>
          </b-col>
        </b-row>
      </b-card>
      <b-button @click="addSettings" variant="primary">hinzufügen</b-button>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      settings: {
        days: 14,
        days_before: 7,
        solver_msg: true,
        solver_time_limit: 20000
      },
      weighting: 1,
      exams: [
          {id: 1, exam: "1-3", normalizationweighting: ''},
          {id: 2, exam: "4-6", normalizationweighting: ''},
          {id: 3, exam: "7-9", normalizationweighting: ''},
          {id: 4, exam: "10-12", normalizationweighting: ''},
          {id: 5, exam: "13-15", normalizationweighting: ''}
      ],
      //fields attribute for 'Teilnehmer Normierung'
      normalizationtable: [
          {key: "exam", label: "Prüfung", class: "normalizationtablecolumnone"},
          {key: "normalizationweighting", label: "Gewichtung"},
      ],
      normalizationweightingvalue: 1
    };
  },
  methods: {
    addSettings() {
      let solverSettings = {solver_time_limit: this.settings.solver_time_limit, solver_msg: this.settings.solver_msg, days_before: this.settings.days_before};
      this.$emit("updateSettings", solverSettings)
      console.log ('new values have been passed to parent component:', solverSettings)
      this.$bvModal.hide('modal-settings-input');
      this.$bvToast.toast(
          'ToDo: neue Settings abdrucken',
          {
          title: 'Algorithmus Parameter geändert!',
          autoHideDelay: 20000,
          });
    }
  }
};
</script>

<style scoped>
#normalizationtablecolumnone { max-width: 40px; }
</style>