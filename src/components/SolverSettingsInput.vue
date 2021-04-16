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
          <b-col sm="5">
            <label v-b-tooltip.hover title="Faktor, wie viele Klausuren stattdessen am nächsten Tag geschrieben werden müssten, um eine Klausur am gleichen Tag zu verhindern">gleicher Tag</label>
          </b-col>
          <b-col sm="3">
            <b-form-spinbutton min="0" max="10000" step="10" v-model="settings.days_before0" inline></b-form-spinbutton>
          </b-col>
        </b-row>
        <p></p>
        <b-row>
          <b-col sm="5">
            <label v-b-tooltip.hover title="Faktor, wie viele Klausuren stattdessen am nächsten Tag geschrieben werden müssten, um eine Klausur einen Tag nach der vorangegangenen Klausur zu verhindern">nächster Tag</label>
          </b-col>
          <b-col sm="3">
            <b-form-spinbutton min="0" max="10000" step="5" v-model="settings.days_before1" inline></b-form-spinbutton>
          </b-col>
        </b-row>
        <p></p>
        <b-row>
          <b-col sm="5">
            <label v-b-tooltip.hover title="Faktor, wie viele Klausuren stattdessen am nächsten Tag geschrieben werden müssten, um eine Klausur zwei Tage nach der vorangegangenen Klausur zu verhindern">übernächster Tag </label>
          </b-col>
          <b-col sm="3">
            <b-form-spinbutton min="0" max="10000" step="1" v-model="settings.days_before2" inline></b-form-spinbutton>
          </b-col>
        </b-row>

      </b-card>
      <!--Teilnehmer Normierung !-->
      <b-card title="Normierung der Prüfungsanmeldungen">
          <p></p>
        <b-row>
          <b-col sm="5">
            <label v-b-tooltip.hover title="">bis 4 Klausuren</label>
          </b-col>
          <b-col sm="3">
            <b-form-spinbutton min="0" max="1" step="0.01" v-model="settings.normalization4" inline></b-form-spinbutton>
          </b-col>
        </b-row>
        <p></p>
        <b-row>
          <b-col sm="5">
            <label v-b-tooltip.hover title="">bis 6 Klausuren</label>
          </b-col>
          <b-col sm="3">
            <b-form-spinbutton min="0" max="1" step="0.01" v-model="settings.normalization6" inline></b-form-spinbutton>
          </b-col>
        </b-row>
        <p></p>
        <b-row>
          <b-col sm="5">
            <label v-b-tooltip.hover title="">bis 7 Klausuren</label>
          </b-col>
          <b-col sm="3">
            <b-form-spinbutton min="0" max="1" step="0.01" v-model="settings.normalization7" inline></b-form-spinbutton>
          </b-col>
        </b-row>
        <p></p>
        <b-row>
          <b-col sm="5">
            <label v-b-tooltip.hover title="">bis 8 Klausuren</label>
          </b-col>
          <b-col sm="3">
            <b-form-spinbutton min="0" max="1" step="0.01" v-model="settings.normalization8" inline></b-form-spinbutton>
          </b-col>
        </b-row>
        <p></p>
        <b-row>
          <b-col sm="5">
            <label v-b-tooltip.hover title="">bis 9 Klausuren</label>
          </b-col>
          <b-col sm="3">
            <b-form-spinbutton min="0" max="1" step="0.01" v-model="settings.normalization9" inline></b-form-spinbutton>
          </b-col>
        </b-row>
        <p></p>
        <b-row>
          <b-col sm="5">
            <label v-b-tooltip.hover title="">mehr als 10 Klausuren</label>
          </b-col>
          <b-col sm="3">
            <b-form-spinbutton min="0" max="1" step="0.01" v-model="settings.normalization1000" inline></b-form-spinbutton>
          </b-col>
        </b-row>



      </b-card>
      <!--Technische Einstellungen !-->
      <b-card title="Technische Einstellungen">
        <p></p>
        <b-row>
          <b-col sm="5">
            <label v-b-tooltip.hover title="Maximale Laufzeit des Solvers"
              >Zeitlimit in Sekunden</label
            >
          </b-col>
          <b-col sm="3">
            <b-form-spinbutton min="1" max="100000" step="60" v-model="settings.solver_time_limit" inline></b-form-spinbutton>
          </b-col>
        </b-row>
      </b-card>
      <b-button class="confirm" @click="addSettings" variant="success">hinzufügen</b-button>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      settings: {
        days_before0: 1000,
        days_before1: 50,
        days_before2: 5,
        normalization4: 1,
        normalization6: 0.9,
        normalization7: 0.8,
        normalization8: 0.7,
        normalization9: 0.5,
        normalization1000: 0.1,
        solver_time_limit: 20000
      },
    };
  },
  methods: {
    addSettings() {
      // let solverSettings = {solver_time_limit: this.settings.solver_time_limit, solver_msg: this.settings.solver_msg, days_before: this.settings.days_before};
      
      // evtl: JSON.stringify(settings)
      this.$emit("updateSettings", this.settings)
      console.log ('new values have been passed to parent component:', this.settings)
      this.$bvModal.hide('modal-settings-input');
      this.$bvToast.toast(
          'Zeitlimit: ' + this.settings.solver_time_limit + '; Normalisierungsfaktoren: ' + this.settings.normalization4 + ' - ' + this.settings.normalization6 + ' - ' + this.settings.normalization7 + ' - ' + this.settings.normalization8 + ' - ' + this.settings.normalization9 + ' - ' + this.settings.normalization1000 + '; Days before: ' + this.settings.days_before0 + ' - ' + this.settings.days_before1 + ' - ' + this.settings.days_before2,
          {
          title: 'Solver Parameter geändert!',
          autoHideDelay: 20000,
          });
    }
  }
};
</script>

<style scoped>
.confirm {
  float: right;
  margin-left: 9px;
}
</style>