<template>
  <div>
    <b-button
      v-b-modal.modal-upload-registrations
      class ="button"
      variant="primary"
      ><i class="fa fa-upload"></i>Anmeldeliste hochladen</b-button
    >
    <b-modal
      id="modal-upload-registrations"
      title="Neue Anmeldeliste hochladen"
      size="xl"
      hide-footer
    >
      <b-card>
          <b-card-text>
      Datei auswählen
    </b-card-text>
   <b-form-file size="md" placeholder="Datei wählen" drop-placeholder="Datei hier ablegen" accept=".csv, .xlsx, .xls" type="file" id="file" ref="file" v-on:change="(e)=>this.handleFileUpload(e)"></b-form-file>

    

      </b-card>
      <b-card>
          <b-card-text>
Spaltenbezeichnungen anpassen
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

</b-card>

<b-button @click="uploadRegistration" type="submit" class="cancel" variant="primary">Anmeldungen hochladen</b-button>


      
      
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
          columns: {
                EXAM: 'exam',
                EXAM_ID: 'exam_id',
                LAST_NAME: 'last_name',
                FIRST_NAME: 'first_name',
                MATRICULATION_NUMBER: 'matriculation_number',
                COURSE: 'course',
            }

        }
    },

    methods: {
      // select file
      handleFileUpload(event){
      this.file = event.target.files[0];
      console.log('Datei wurde ausgewählt.', this.file);
      },
      // upload registration file (csv/xlsx/xls) && key mapping
      uploadRegistration(){
        let formData = new FormData();
        let mapping = JSON.stringify(this.columns)
        console.log('mappinglog:', mapping)
        formData.append('file', this.file)
        formData.append('mapping',mapping)
        for (var pair of formData.entries()) {
            console.log('formData: ',pair[0]+ ', ' + pair[1]); 
        }
        axios.post(this.$IPBE + "/uploader",
        formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
          }
        })
        .then(function (response) {
          console.log('Datei wurde hochgeladen', response);
          this.$emit("upload"); //force rerender
          console.log('tralalaichwillsehenobdasmodalgeschlossenwird')
          this.$bvModal.hide('modal-upload-registrations')
          console.log('undobeintoastkommt')
          this.$bvToast.toast(`Anmeldeliste wurde hochgeladen!`, {
          title: 'Status',
          autoHideDelay: 5000,
        })
        })
        .catch(function(error){
          console.log('Problem beim Hochladen der Datei', error);
        });
      },
      cancel() {
        this.$bvModal.hide('modal-upload-registrations')
      }
    }
}
</script>

<style>
.cancel{
  float: right;
  margin-left: 250px
}
</style>