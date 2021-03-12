<template>
  <div>
    <b-table striped hover :items="items"></b-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          { Anmeldungen: 40, Matrikelnummer: "11081994", Vorname: 'Gottwald', Nachname: 'Philip' },
          { Anmeldungen: 7, Matrikelnummer: "11081994", Vorname: 'Becker', Nachname: 'Luc' },
          { Anmeldungen: 11, Matrikelnummer: "11081994", Vorname: 'Elbert', Nachname: 'Nico' },
          { Anmeldungen: 8, Matrikelnummer: "11081994", Vorname: 'König', Nachname: 'Adrian' }
        ]
      }
    }
  }
</script>