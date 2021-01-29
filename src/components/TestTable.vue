<template>
  <div class="container">
    <h3> Anmeldungen:</h3>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Prüfung</th>
          <th scope="col">Teilnehmer</th>
          <th scope="col">Aufsicht</th>
          <th scope="col">Datum</th>
          <th scope="col">Uhrzeit</th>
          <th scope="col">Raum</th>     
        </tr>
      </thead>
      <tbody>
        <tr v-for="plan in plan" v-bind:key="plan.id"> 
          <th scope="row">{{plan.id}}</th>
          <td>{{plan.pruefung}}</td>
          <td>{{plan.teilnehmer}}</td>
          <td>{{plan.aufsicht}}</td>
          <td>{{plan.datum}}</td>
          <td>{{plan.uhrzeit}}</td>
          <td>{{plan.raum}}</td>                              
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
        plan: null,
      };
    },
    methods: {
      getData () {
        axios
        .get('testdaten.json')
        .then(res => {
          this.plan = res.data;
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

<style scoped></style>