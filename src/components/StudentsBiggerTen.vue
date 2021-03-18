<template>
  <div>
    <b-table striped hover :items="items"></b-table>
  </div>
</template>

<script>
import axios from "axios";

  export default {
    data() {
      return {
        items: null,
      };
    },
    methods: {
      getData () {
        axios.get('http://132.187.226.24:5000/anzahl_Studenten_10')
        .then(res => {this.items = res.data;
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