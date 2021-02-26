<template>
<div>
</b-col>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col>
        <b-form-group
          label="Suche"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-3"
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

      <b-col>
       <b-form-select
        v-model="selected"
        :options="options"
        class="md"
        value-field="item"
        text-field="name"
        disabled-field="notEnabled"
        ></b-form-select>
      </b-col>

      <b-col>
        <drop-down
        class="download"
        type="button"
        title="Download"
        title-classes="nav-link"
        icon="fa fa-download">
          <a class="dropdown-item" v-on:click="ExportToExcel(), makeToast()">Excel</a>
          <a class="dropdown-item" href="#">PDF</a>
        </drop-down>
      </b-col>
      
    </b-row> 
    <b-row>
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
          >
        </b-pagination>
      </b-col>



    </b-row>

    <!-- Main table element -->
    <b-table
      id="downloadtester"
      :busy="isbusy"
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
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>

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
        checked: false,
        options: [
          { item: 'A', name: 'Option A' },
          { item: 'B', name: 'Option B' },
          { item: 'D', name: 'Option C', notEnabled: true },
          { item: { d: 1 }, name: 'Option D' }
        ],
        items:[
        ],
        isbusy: false,
        fields: [
          { key: 'student_matnr', label: 'Matrikelnummer', sortable: true, sortDirection: 'desc' },
          { key: 'exam_id', label: 'Prüfungs ID', sortable: true, sortDirection: 'desc' },
          { key: 'exam_name', label: 'Prüfung', sortable: true, sortDirection: 'desc' },
          { key: 'day_id', label: 'Tag Nr.', sortable: true, sortDirection: 'desc' },
          { key: 'day_date', label: 'Datum', sortable: true, sortDirection: 'desc' },
       
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 25,
        pageOptions: [25, 50, 100, { value: 10000, text: "Alle anzeigen" }],
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
        axios.get('http://localhost:5000/studentenansicht')
        .then(res => {this.items = res.data;
          console.log(res.data);
        })
        .catch(error => {
          console.log(error)
        })
      },
      makeToast(append = false) {
        this.toastCount++
        this.$bvToast.toast(`Prüfungsplan wurde heruntergeladen!`, {
          title: 'Status',
          autoHideDelay: 5000,
          appendToast: append
        })
      },
      downloadFile(){
        let formData = new FormData();
        formData.append('file', this.file);
        axios.get('http://localhost:5000/download',
        formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(function () {
        console.log('Datei wurde heruntergeladen');
        })
        .catch(function(){
          console.log('Problem beim Hochladen der Datei');
        });
      },
      ExportToExcel(mytblId){
       var htmltable= document.getElementById('downloadtester');
       var html = htmltable.outerHTML;
       window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));
      }
    },
    created() {
      this.getData()
    }
  }
</script>

<style scoped>
.download{
  text-align: center;
  float: right;
  background: #063d79;
}

</style>