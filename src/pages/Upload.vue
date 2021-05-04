<template>
<div>
  <b-row>
    <upload-registrations class="button"></upload-registrations>
    <add-participant @updateRegistration="receiveRegistration" class="button" />
    <students-bigger-ten class="button" />
    <b-button class="button" @click="forceRerender()"><i class="fa fa-refresh"></i></b-button>
  </b-row>
  <registration-list class="upload" :key="componentKey" />
  <b-row>
  
  <router-link to=/pruefungszeitraum tag="b-button" class="continue" ><i class="fa fa-arrow-right"></i>Weiter</router-link>
  </b-row>
</div>  
</template>

<script>
import AddParticipant from '@/components/AddParticipant.vue';
import StudentsBiggerTen from "@/components/StudentsBiggerTen.vue";
import RegistrationList from "@/components/RegistrationList.vue";
import axios from 'axios';
import UploadRegistrations from "@/components/UploadRegistrations.vue"

  export default {
    data() {
      return {
        componentKey: 0,
        newMapping: ''
      };
    },
    components: {
      AddParticipant,
      StudentsBiggerTen,
      RegistrationList,
      UploadRegistrations
    },
    computed: {
    },
    methods: {
      // reload registration list
      reload() {
        location.reload();
      },
      forceRerender() {
        this.componentKey += 1;
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
  margin-left: 650px
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