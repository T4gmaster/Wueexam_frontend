<template>
  <div>
    <h2>Anmeldeliste:</h2>
    <table id="myTable">
      <thead>
        <tr class = "header">
          <th scope="col">Prüfung</th>
          <th scope="col">PrüfungsID</th>
          <th scope="col">Nachname</th>
          <th scope="col">Vorname</th>
          <th scope="col">Matrikelnummer</th>
          <th scope="col">Studiengang</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="anmeldeliste in anmeldeliste" v-bind:key="anmeldeliste.EXAM">
          <th scope="row">{{anmeldeliste.EXAM}}</th>
          <td>{{anmeldeliste.EXAM_ID}}</td>
          <td>{{anmeldeliste.LAST_NAME}}</td>
          <td>{{anmeldeliste.FIRST_NAME}}</td>
          <td>{{anmeldeliste.MATRICULATION_NUMBER}}</td>
          <td>{{anmeldeliste.COURSE}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Anmeldeliste',
    data() {
      return {
        anmeldeliste: null,
      };
    },
    methods: {
      getData () {
        axios
        .get(this.$IPBE + "/anmeldeliste")
        .then(res => {
          this.anmeldeliste = res.data;
          console.log(res.data);
        })
        .catch(error => {
          console.log(error)
        })
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
