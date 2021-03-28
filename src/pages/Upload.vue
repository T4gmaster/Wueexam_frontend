<template>
<div>
  <b-row>
    <b-col lg="3"><b-form-file size="md" placeholder="Datei wählen" drop-placeholder="Datei hier ablegen" accept=".csv, .xlsx, .xls" type="file" id="file" ref="file" v-on:change="(e)=>this.handleFileUpload(e)"></b-form-file></b-col>
    <b-button class="button" variant="primary" v-on:click="submitFile()"><i class="fa fa-upload"></i>Hochladen</b-button>
    <b-button class ="button-icon" @click="forceRerender()"><i class="fa fa-refresh"></i></b-button>
  </b-row>
  <registration-list class="upload" :key="componentKey" />
  <b-row>
  <add-participant @updateRegistration="receiveRegistration" class="button" />
  <students-bigger-ten class="button" />
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
      // select file
      handleFileUpload(event){
      this.file = event.target.files[0];
      console.log('Datei wurde ausgewählt.', this.file);
      },
      // reload registration list
      reload() {
        location.reload();
      },
      forceRerender() {
        this.componentKey += 1;
      },
      // upload registration file (csv/xlsx/xls)
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
          this.$bvToast.toast(`Anmeldeliste wurde hochgeladen!`, {
          title: 'Status',
          autoHideDelay: 5000,
        })
        })
        .catch(function(){
          console.log('Problem beim Hochladen der Datei');
        });
      },
      // add registration 
      receiveRegistration (reply) {
        let newRegistration = reply
        console.log ('new registration in parent component:', newRegistration)
        axios.post(this.$IPBE + "/anmeldung_nachtrag", 
        newRegistration, {
        headers: {
            'Content-Type': 'application/json',
        }
        })
          .then(function (response) {
          console.log(response);
          this.forceRerender()
          console.log(this.componentKey) // reload list after adding new registration
          })
          .catch(function (error) {
          console.log(error);
        });
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
  margin-top:563
  
  534633333333 px;
}
</style>