<template>

    <b-row>
      <b-col>
      <anzahl-studenten class="testttt" />
      <anzahl-pruefungen class="testttt"/>
      <durchschnitt-anmeldungen class="testttt" />
      </b-col>
      <b-col cols="8">
      <anmeldungen-distribution class="diagramm" />
      </b-col>
    </b-row>
</template>

<script>
import AnzahlStudenten from "@/components/AnzahlStudenten.vue";
import AnmeldungenDistribution from "@/components/AnmeldungenDistribution.vue";
import AnzahlPruefungen from "@/components/AnzahlPrüfungen.vue";
import DurchschnittAnmeldungen from "@/components/DurchschnittAnmeldungen.vue";

export default { 
  components: { 
    AnzahlStudenten,
    AnmeldungenDistribution,
    AnzahlPruefungen,
    DurchschnittAnmeldungen
  }
}
</script>
<style>
.testttt {
  cursor: pointer;
  width: 250%;
}


</style>
