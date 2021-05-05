<template>
  <div>
    <b-button
      v-b-modal.modal-upload-kay-mapping
      class ="button"
      ><i class="fa fa-wrench"></i>Spalten mapping</b-button
    >
    <b-modal
      id="modal-upload-kay-mapping"
      title="Spaltenbezeichnung festlegen"
      size="xl"
      hide-footer
    >
      <b-card>
          <b-card-text>
      Zuordnung der jeweiligen Spalte der hochgeladenen Anmeldeliste

    </b-card-text>




<b-row>
    <b-col sm="4"><label>Prüfung:</label></b-col>
    <b-col sm="4"> <b-form-input v-model="columns.EXAM" placeholder="Spaltenbezeichnung in Excel"></b-form-input> </b-col>
</b-row>

<b-row>
    <b-col sm="4"><label>ID der Prüfung:</label></b-col>
    <b-col sm="4"><b-form-input v-model="columns.EXAM_ID" placeholder="Spaltenbezeichnung in Excel"></b-form-input></b-col>
</b-row>


<b-row>
    <b-col sm="4"><label>Vorname Student:</label></b-col>
    <b-col sm="4"><b-form-input v-model="columns.FIRST_NAME" placeholder="Spaltenbezeichnung in Excel"></b-form-input></b-col>
</b-row>

<b-row>
    <b-col sm="4"><label>Nachname Student:</label></b-col>
    <b-col sm="4"><b-form-input v-model="columns.LAST_NAME" placeholder="Spaltenbezeichnung in Excel"></b-form-input></b-col>
</b-row>

<b-row>
    <b-col sm="4"><label>Immatrikulationsnummer Student:</label></b-col>
    <b-col sm="4"><b-form-input v-model="columns.MATRICULATION_NUMBER" placeholder="Spaltenbezeichnung in Excel"></b-form-input></b-col>
</b-row>

<b-row>
    <b-col sm="4"><label>Studiengang Student:</label></b-col>
    <b-col sm="4"><b-form-input v-model="columns.COURSE" placeholder="Spaltenbezeichnung in Excel"></b-form-input></b-col>
</b-row>

<b-button @click="setMapping" type="submit" variant="primary">Mapping speichern</b-button>

      </b-card>
      
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            columns: {
                EXAM: 'exam',
                EXAM_ID: 'exam_ID',
                LAST_NAME: 'last_name',
                FIRST_NAME: 'first_name',
                MATRICULATION_NUMBER: 'matriculation_number',
                COURSE: 'course',
            }
        }
    },
    methods: {
        setMapping(event) {
            let mapping = this.columns
            this.$emit("updateKeyMapping", mapping)
            this.$bvModal.hide('modal-upload-kay-mapping')
            console.log('mapping handed over to parent:', JSON.stringify(mapping))
        }
    }
}
</script>

<style>

</style>