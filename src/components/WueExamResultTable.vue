<template>
  <div>
    <h2>Prüfungsplan:</h2>
    <button v-on:click="downloadFile(), say('Download wurde gestartet')" class = "btn" ><i class="fa fa-download"></i> Download Prüfungsplan</button>
    <table id="myTable">
      <thead>
        <tr class = "header">
          <th scope="col">Tag</th>
          <th scope="col">Datum</th>
          <th scope="col">PrüfungsID</th>
          <th scope="col">Prüfung</th>   
        </tr>
      </thead>
      <tbody>
        <tr v-for="pruefungsplan in pruefungsplan" v-bind:key="pruefungsplan.day_id"> 
          <th scope="row">{{pruefungsplan.day_date}}</th>
          <td>{{pruefungsplan.exam_id}}</td>
          <td>{{pruefungsplan.exam_name}}</td>                             
        </tr>
      </tbody>
    </table> 
  </div> 
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Plan',
    data() {
      return {
        pruefungsplan: null,
      };
    },
    methods: {
      getData () {
        axios
        .get('http://localhost:5000/pruefungsansicht')
        .then(res => {
          this.pruefungsplan = res.data;
          console.log(res.data);
        })
        .catch(error => {
          console.log(error)
        })
      },
      say: function(msg) {
        alert(msg);
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
      }
    },
    created() {
      this.getData()
    }
  }
</script>

<style scoped>
#myTable {
  border-collapse: collapse;
  width: 80%;
  border: 1px solid #ddd;
  font-size: 18px;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
}

#myTable th, #myTable td {
  text-align: left;
  padding: 12px;
}

#myTable tr {
  border-bottom: 1px solid #ddd;
}
#myTable tr.header, #myTable tr:hover {
  background-color: #f1f1f1;
}
.btn {
  background-color: DodgerBlue;
  color: white;
  height: 40px;
  width: 300px;
  border: 1px solid #ddd;
  cursor: pointer;
  margin-bottom: 12px;
  float: right;
  margin-right: 100px;
  font-size: 13px;
}
.btn:hover {
  background-color: RoyalBlue;
}
</style>