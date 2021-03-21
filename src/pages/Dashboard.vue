<template>
  <b-tabs content-class="mt-3" 
  fill 
  active-nav-item-class="font-weight-bold">
    <b-tab title="Anmeldestatistik" active>
      <b-row>
      <b-col>
      <anzahl-studenten />
      <anzahl-pruefungen />
      <durchschnitt-anmeldungen />
      </b-col>
      <b-col >
      <anmeldungen-distribution />
      </b-col>
      </b-row>
      <treemap />
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
import Treemap from "@/components/Treemap.vue";
import HeatMap from "@/components/Heatmap.vue"; 

export default { 
  components: { 
    AnzahlStudenten,
    AnmeldungenDistribution,
    AnzahlPruefungen,
    DurchschnittAnmeldungen,
    Treemap,
    HeatMap
  }
}
</script>
<style>

</style>
