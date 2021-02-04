<template>
<div>
<div>
  <div>
    <input type="file" id="file" ref="file" v-on:change="handleFileUpload()">
    <button class="submit" v-on:click="submitFile()">Hochladen</button>
  </div>
<!--
  <div>
    <div class="row">
      <div class="col-12">
        <card :title="table1.title" :subTitle="table1.subTitle">
          <div slot="raw-content" class="table-responsive">
            <paper-table :data="table1.data" :columns="table1.columns">

            </paper-table>
          </div>
        </card>
      </div>
    </div>
-->
  </div>
    <router-link to=/pruefungsparamter tag="button" class="continue">Weiter</router-link>
  <div>
    <enrollment-table />
  </div>
</div>
</div>
</template>
<script>
import axios from 'axios';
import EnrollmentTable from '@/components/EnrollmentTable.vue';
import { PaperTable } from "@/components";
const tableColumns1 = ["Exam", "ExamID", "LastName", "FirstName", "MatriculationNumber", "Course"];
const tableData1 = [
  {
    exam: "Mathe 2",
    examid: "123456",
    lastname: "Becker",
    firstname: "Luc",
    matriculationnumber: "2125054",
    course: "Wirtschaftsinformatik"
  },
  {
    exam: "Mathe 2",
    examid: "123456",
    lastname: "König",
    firstname: "Adrian",
    matriculationnumber: "2110670",
    course: "Wirtschaftsinformatik"
  }
];

export default {
  components: {
    EnrollmentTable
  },
  data() {
    return {
      pruefungsplan: null, 
      table1: {
        title: "Prüfungsanmleldungen",
        subTitle: "Here is a subtitle for this table",
        columns: [...tableColumns1],
        data: [...tableData1]
      }
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
.continue {
  float: right;
  height: 35px;
  width: 125px;
}
</style>
