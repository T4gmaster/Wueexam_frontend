<template>
  <div>
    <label for="start-timeperiod">Beginn der Prüfungsphase</label>
    <b-form-datepicker
      id="start-timeperiod"
      v-model="value"
      class="mb-2"
    ></b-form-datepicker>
    <label for="end-timeperiod">Ende der Prüfungsphase</label>
    <b-form-datepicker
      id="end-timeperiod"
      v-model="value"
      class="mb-2"
    ></b-form-datepicker>
    <label for="days-with-exams">Wochentage mit Prüfungen</label>
    <b-form-group
      id="days-with-exam"
      v-slot="{ ariaDescribedby }"
    >
      <b-form-checkbox-group
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        buttons
        button-variant="primary"
        size="sm"
        name="buttons-2"
      ></b-form-checkbox-group>
    </b-form-group>
    <p>Länge der Klausurenphase: [berechnen] Tage</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selected: [], // Must be an array reference!
        options: [
          { text: 'Montag', value: 'orange' },
          { text: 'Dienstag', value: 'apple' },
          { text: 'Mittwoch', value: 'pineapple' },
          { text: 'Donnerstag', value: 'grape' },
          { text: 'Freitag', value: 'pineapple' },
          { text: 'Samstag', value: 'pineapple' },
          { text: 'Sonntag', value: 'pineapple' }
        ]
      }
    }
  }
</script>