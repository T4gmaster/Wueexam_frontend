<template>
<div>
  <b-row cols="1" cols-sm="1" cols-md="4" cols-lg="6">
    <b-col><input type="file" id="file" ref="file" v-on:change="handleFileUpload()"></b-col>
    <b-col><b-button variant="primary" class="submit" v-on:click="submitFile()" @click="makeToast()"><i class="fa fa-upload"></i>Hochladen</b-button></b-col>
    <b-col><b-button variant="primary" @click="forceRerender()"><i class="fa fa-refresh"></i></b-button></b-col>
    <b-col><add-participant /> </b-col>
    <b-col><b-button variant="primary" v-b-modal.modal-1>Anmeldungen >8</b-button></b-col>
      <b-modal id="modal-1" title="">
        <students-bigger-ten />
      </b-modal>
    <b-col><router-link to=/pruefungsparamter tag="b-button" class="continue" ><i class="fa fa-arrow-right"></i>Weiter</router-link></b-col>
  </b-row>
  <registration-list :key="componentKey" />
</div>  
</template>

<script>
import AddParticipant from '@/components/AddParticipant.vue';
import StudentsBiggerTen from "@/components/StudentsBiggerTen.vue";
import RegistrationList from "@/components/RegistrationList.vue";
import axios from 'axios';

  export default {
    data() {
      return {
        componentKey: 0,
      };
    },
    components: {
      AddParticipant,
      StudentsBiggerTen,
      RegistrationList
    },
    created() {
      this.getData()
    },
    methods: {
      handleFileUpload(){
      this.file = this.$refs.file.files[0];
      console.log('Datei wurde ausgewählt.', this.file);
      },
      submitFile(){
        let formData = new FormData();
        formData.append('file', this.file);
        axios.post(this.$IPBE + "/uploader",
        formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(function () {
          console.log('Datei wurde hochgeladen');
        })
        .catch(function(){
          console.log('Problem beim Hochladen der Datei');
        });
      },
      makeToast(append = false) {
        this.$bvToast.toast(`Anmeldeliste wurde hochgeladen!`, {
          title: 'Status',
          autoHideDelay: 5000,
          appendToast: append
        })
      },
      reload() {
        location.reload();
      },
      forceRerender() {
        this.componentKey += 1;
      }
    }
  }
</script>

<style>
.continue{
  float: right;
}
</style>