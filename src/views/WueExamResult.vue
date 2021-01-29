<template>
  <div>
    <p>
      <button
        @click="say('Hier werden bald die Prüfungsanmeldungen angezeigt')"
      >
        Anmeldungen anzeigen
      </button>
    </p>
    <p>
      <button @click="$('test').show()">Prüfungsplan berechnen</button>
    </p>
    <p>
      <button v-on:click="downloadFile(), say('Download wurde gestartet')">Download Prüfungsplan</button>
    </p>
    <WueExamResultTable></WueExamResultTable>
    <div class="test" hidden>{{ test }}</div>
  </div>
</template>

<style>
  button {
    background: #ebebf7;
    height: 125px;
    width: 125px;
    border: 1px solid #000000;
  }
</style>

<script>
// import WueExamResultTable from "./components/WueExamResultTable";
import axios from 'axios';

export default {
  methods: {
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
  data() {
    return {
      test: "asd"
    };
  }
};
</script>
