<template>
<div>
  <b-row>
    <b-col lg="3"><b-form-file size="md" placeholder="Datei wählen" drop-placeholder="Datei hier ablegen" type="file" id="file" ref="file" v-on:change="handleFileUpload()"></b-form-file></b-col>
    <b-button class="button" variant="primary" v-on:click="submitFile()" @click="makeToast()"><i class="fa fa-upload"></i>Hochladen</b-button>
    <b-button class ="button-icon" @click="forceRerender()"><i class="fa fa-refresh"></i></b-button>
     
    
      <b-modal id="modal-1" title="">
        <students-bigger-ten />
      </b-modal>
    
  </b-row>
  <registration-list class="upload" :key="componentKey" />
  <b-row>
  <add-participant class="button" />
  <b-button class="button" variant="primary" v-b-modal.modal-1>Studenten > 8 Anmeldungen</b-button>
  <router-link to=/pruefungsparamter tag="b-button" class="continue" ><i class="fa fa-arrow-right"></i>Weiter</router-link>
  </b-row>
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
  margin-left: 250px
}
.button{
  float: left;
  margin-left: 9px;
}
.button-icon{
  float: left;
  margin-left: 9px;
  max-width: 100px;
}
.upload{
  margin-top: px;
}
</style>