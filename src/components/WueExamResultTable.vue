<template>
  <div>
    <h2>Prüfungsplan:</h2>
    <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Suche nach Prüfung..." title="Type in a name">
    <button v-on:click="downloadFile(), say('Download wurde gestartet')" class="btn"><i class="fa fa-download"></i> Download Prüfungsplan</button>
    <table id="myTable">
      <thead>
        <tr class = "header">
          <th scope="col">Datum</th>
          <th scope="col">Prüfung</th>
          <th scope="col">PrüfungsID</th>
          <th scope="col">Nachname</th>
          <th scope="col">Vorname</th>
          <th scope="col">Matrikelnummer</th>    
        </tr>
      </thead>
      <tbody>
        <tr v-for="pruefungsplan in pruefungsplan" v-bind:key="pruefungsplan.DATE"> 
          <th scope="row">{{pruefungsplan.DATE}}</th>
          <td>{{pruefungsplan.EXAM}}</td>
          <td>{{pruefungsplan.EXAM_ID}}</td>
          <td>{{pruefungsplan.LAST_NAME}}</td>
          <td>{{pruefungsplan.FIRST_NAME}}</td>
          <td>{{pruefungsplan.MATRICULATION_NUMBER}}</td>                              
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
      myFunction() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[0];
          if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }       
        }
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
#myInput {
  background-position: 10px 10px;
  background-repeat: no-repeat;
  width: 50%;
  height: 40px;
  font-size: 16px;
  border: 1px solid #ddd;
  margin-bottom: 12px;
  text-align: left;
}
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
  width: 225px;
  border: 1px solid #ddd;
  cursor: pointer;
  margin-bottom: 12px;
  margin-left: auto;
  margin-right: auto;
  font-size: 16px;
}
.btn:hover {
  background-color: RoyalBlue;
}
</style>