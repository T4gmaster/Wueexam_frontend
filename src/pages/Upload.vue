<template>
<div>
  <div>
    <div>
      <input type="file" id="file" ref="file" v-on:change="handleFileUpload()">
      <button class="submit" v-on:click="submitFile()">Hochladen</button>
    </div>
    <div>
      <router-link to=/pruefungsparamter tag="button" class="continue">Weiter</router-link>
    </div>
  </div>
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

      <b-col lg="6" class="my-1">
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
</div>  
</template>

<script>
import axios from 'axios';

  export default {
    data() {
      return {
        items:
         [
          {EXAM: 'Mathe', EXAM_ID: "123445", LAST_NAME: "Becker", FIRST_NAME: "Luc", MATRICULATION_NUMBER: "2110670", COURSE: "Wirtschaftsinformatik" },
          {EXAM: 'Mathe', EXAM_ID: "123445", LAST_NAME: "Becker", FIRST_NAME: "Luc", MATRICULATION_NUMBER: "2110670", COURSE: "Wirtschaftsinformatik" },
          {EXAM: 'Mathe', EXAM_ID: "123445", LAST_NAME: "Becker", FIRST_NAME: "Luc", MATRICULATION_NUMBER: "2110670", COURSE: "Wirtschaftsinformatik" },
          {EXAM: 'Mathe', EXAM_ID: "123445", LAST_NAME: "Becker", FIRST_NAME: "Luc", MATRICULATION_NUMBER: "2110670", COURSE: "Wirtschaftsinformatik" },
          {EXAM: 'Mathe', EXAM_ID: "123445", LAST_NAME: "Becker", FIRST_NAME: "Luc", MATRICULATION_NUMBER: "2110670", COURSE: "Wirtschaftsinformatik" },
          {EXAM: 'Mathe', EXAM_ID: "123445", LAST_NAME: "Becker", FIRST_NAME: "Luc", MATRICULATION_NUMBER: "2110670", COURSE: "Wirtschaftsinformatik" },
          {EXAM: 'QWF', EXAM_ID: "456789", LAST_NAME: "König", FIRST_NAME: "Adrian", MATRICULATION_NUMBER: "1108187", COURSE: "Wirtschaftsinformatik" }

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
        pageOptions: [10, 25, 50, 100, { value: 100, text: "Alle anzeigen" }],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
      };
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
        axios.get('http://localhost:5000/anmeldeliste')
        .then(res => {this.items = res.data;
          console.log(res.data);
        })
        .catch(error => {
          console.log(error)
        })
      },
      created() {
        this.getData()
      },
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