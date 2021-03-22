<template>
  <b-tabs content-class="mt-3" 
  fill 
  active-nav-item-class="font-weight-bold">
    <b-tab title="Anmeldestatistik" active>
      <anzahl-studenten />
      <anzahl-pruefungen />
      <durchschnitt-anmeldungen />
      <anmeldungen-distribution />
    </b-tab>
    <b-tab title="Prüfungsstatistik">
    <heat-map />
    </b-tab>
  </b-tabs>
</template>

<script>
import AnzahlStudenten from "@/components/AnzahlStudenten.vue";
import AnmeldungenDistribution from "@/components/AnmeldungenDistribution.vue";
import AnzahlPruefungen from "@/components/AnzahlPrüfungen.vue";
import DurchschnittAnmeldungen from "@/components/DurchschnittAnmeldungen.vue";
import HeatMap from "@/components/Heatmap.vue"; 

export default { 
  components: { 
    AnzahlStudenten,
    AnmeldungenDistribution,
    AnzahlPruefungen,
    DurchschnittAnmeldungen,
    HeatMap
  }
}
</script>
<style>

</style>
