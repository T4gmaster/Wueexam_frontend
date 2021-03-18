<template>
<div>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Suche"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder=""
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Löschen</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col sm="5" md="6" class="my-1">
        <input type="file" id="file" ref="file" v-on:change="handleFileUpload()">
        <b-button class="submit" v-on:click="submitFile()" @click="makeToast()"><i class="fa fa-upload"></i>Hochladen</b-button>
        <b-button @click="reload()"><i class="fa fa-refresh"></i></b-button>
        <b-button v-b-modal.modal-1>Anmeldungen >8</b-button>
          <b-modal id="modal-1" title="Studenten mit mehr als 8 Prüfungsanmeldungen">
           <students-bigger-ten />
        </b-modal>
      </b-col>
    

      <b-col sm="5" md="6" class="my-1">
        <b-form-group
          label="Pro Seite"
          label-for="per-page-select"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
      show-empty
      small
      @filtered="onFiltered"
    >
      <template #cell(name)="row">
        {{ row.value.first }} {{ row.value.last }}
      </template>

      <template #row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </b-card>
      </template>
    </b-table>
  </b-container>
  <b-container>
    <b-row>
    <b-column sm="5">
    </b-column>
    <b-column sm="3">
    <add-participant @updateRegistration="receiveRegistration"/> 
    <!-- <add-participant v-on:inputChange="handleChange"></add-participant> !-->
    </b-column>
    <router-link to=/pruefungsparamter tag="b-button" class="continue" ><i class="fa fa-arrow-right"></i>Weiter</router-link>
    </b-row>
  </b-container>
  <ul>
    <li v-for="Fach in testArray">{{testArray.EXAM}}</li>
  </ul>
  <p>{{testArray[0].EXAM}}</p>
  <button @click="testPush">Testbutton</button>
</div>  
</template>

<script>
import axios from 'axios';
import AddParticipant from '@/components/AddParticipant.vue';
import StudentsBiggerTen from "@/components/StudentsBiggerTen.vue";

  export default {
    data() {
      return {
        items:[
        ],
        fields: [
          { key: 'EXAM', label: 'Prüfung', sortable: true, sortDirection: 'desc' },
          { key: 'EXAM_ID', label: 'Prüfungs ID', sortable: true, sortDirection: 'desc' },
          { key: 'LAST_NAME', label: 'Nachname', sortable: true, sortDirection: 'desc' },
          { key: 'FIRST_NAME', label: 'Vorname', sortable: true, sortDirection: 'desc' },
          { key: 'MATRICULATION_NUMBER', label: 'Matrikelnummer', sortable: true, sortDirection: 'desc' },
          { key: 'COURSE', label: 'Studiengang', sortable: true, sortDirection: 'desc' },
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 10,
        pageOptions: [10, 25, 50, 100, { value: 10000, text: "Alle anzeigen" }],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
        value: '', // just for testing
        testArray: [
          {
              "EXAM": "Mathematik fuer Studierende der Wirtschaftswissenschaft 2",
              "EXAM_ID": 323247,
              "LAST_NAME": "Hartung",
              "FIRST_NAME": "Hagen",
              "MATRICULATION_NUMBER": 2747530,
              "COURSE": "Wirtschaftswissenschaften"
          },
          {
              "EXAM": "Mathematik fuer Studierende der Wirtschaftswissenschaft 2",
              "EXAM_ID": 323247,
              "LAST_NAME": "Caspar",
              "FIRST_NAME": "Jolanthe",
              "MATRICULATION_NUMBER": 2693117,
              "COURSE": "Wirtschaftsinformatik"
          },
          {
              "EXAM": "Mathematik fuer Studierende der Wirtschaftswissenschaft 2",
              "EXAM_ID": 323247,
              "LAST_NAME": "Zirme",
              "FIRST_NAME": "Milan",
              "MATRICULATION_NUMBER": 2802609,
              "COURSE": "Wirtschaftswissenschaften"
          }
        ]
      };
    },
    components: {
      AddParticipant,
      StudentsBiggerTen
    },
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
    mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length
    },
    methods: {
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      getData () {
        axios.get('http://132.187.226.24:5000/anmeldeliste')
        .then(res => {this.items[0] = res.data;
          console.log(res.data);
        })
        .catch(error => {
          console.log(error)
        })
      },
      handleFileUpload(){
      this.file = this.$refs.file.files[0];
      console.log('Datei wurde ausgewählt.', this.file);
      },
      submitFile(){
        let formData = new FormData();
        formData.append('file', this.file);
        axios.post('http://132.187.226.24:5000/uploader',
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
        this.toastCount++
        this.$bvToast.toast(`Anmeldeliste wurde hochgeladen!`, {
          title: 'Status',
          autoHideDelay: 5000,
          appendToast: append
        })
      },
      reload() {
        location.reload();
      },
      created() {
        this.getData()
      },
      receiveRegistration (reply) {
        // this.value = reply;
        console.log(reply)
      },
      testPush() {
        let testArray = this.testArray
        testArray.push({EXAM: 'Testfach', EXAM_ID: 4567, LAST_NAME: 'Testnachname', FIRST_NAME: 'Testvorname', MATRICULATION_NUMBER: 456123, COURSE: 'Teststudiengang'});
        console.log(testArray);
        /*
        let testArray = this.testArray
        let obj = JSON.parse(JSON.stringify(testArray))
        obj ['testArray'].push(JSON.stringify({"EXAM": "Testexam", "EXAM_ID": 50164, "LAST_NAME": "Testnachname", "FIRST_NAME": "Testvorname", "MATRICULATION_NUMBER": 123456, "COURSE": "Teststudiengang"}))
        testArray = JSON.stringify(obj)
        console.log(testArray)
        */
      }
  }
}
</script>

<style>
.continue{
  float: right;
}
</style>