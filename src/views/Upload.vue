<!--
Tut: https://serversideup.net/uploading-files-vuejs-axios/
-->
<template>
<p></p>
  <div>
    <input type="file" id="file" ref="file" v-on:change="handleFileUpload()">
    <button class="submit" v-on:click="submitFile()">Hochladen</button>
  </div>
  <p></p>
  <div>
    <button class="togglebutton" v-on:click="toggleFunction()">Anmeldeliste anzeigen</button>
  </div>
  <div id="myDIV" style="display:none">
    <div id="app" class="small-test">
        <enrollment-table />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import EnrollmentTable from '@/components/EnrollmentTable.vue';

export default {
  name: 'app',
  components: {
    EnrollmentTable,
  },
  data() {
    return {
      file: ''
    }
  },
  methods: {
    handleFileUpload(){
      this.file = this.$refs.file.files[0];
      console.log('Datei wurde ausgewählt.', this.file);
    },
    submitFile(){
      let formData = new FormData();
      formData.append('file', this.file);
      axios.post('http://localhost:5000/uploader',
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
    toggleFunction() {
      var x = document.getElementById("myDIV");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    }
  }
}
</script>

<style>
.submit {
  background: #ebebf7;
  height: 25px;
  width: 100px;
  border: 1px solid #000000;
}
.submit:hover {
  background-color: #ddddeb;
}
.togglebutton {
  background: #ebebf7;
  color: black;
  height: 25px;
  width: 200px;
  border: 1px solid #000000;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
.small-test {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  }
</style>