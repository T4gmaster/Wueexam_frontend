<template>
<div>
    <b-row>
      <b-col>
      <anzahl-studenten class="testttt" />
      <anzahl-pruefungen class="testttt"/>
      <durchschnitt-anmeldungen class="testttt" />
      <durchschnitt-pruefungen class="testttt" />
      </b-col>
      <b-col cols="8">
      <b-card>
      <verteilung-anmeldungen />
      </b-card>
      </b-col>
    </b-row>
    <b-row>
     
      <b-col cols="7">
      <b-card>
      <verteilung-pruefung />
      </b-card>
      </b-col>
       <b-col>
      <b-card>
      <verteilung-pruefungsphase />
      </b-card>
      </b-col>
    </b-row>
</div>
</template>

<script>
import AnzahlStudenten from "@/components/AnzahlStudenten.vue";
import AnzahlPruefungen from "@/components/AnzahlPrüfungen.vue";
import DurchschnittAnmeldungen from "@/components/DurchschnittAnmeldungen.vue";
import VerteilungPruefung from "@/components/VerteilungPruefung.vue";
import VerteilungPruefungsphase from "@/components/VerteilungPruefungsphase.vue";
import VerteilungAnmeldungen from "@/components/VerteilungAnmeldungen.vue";
import DurchschnittPruefungen from "@/components/DurchschnittPruefungen.vue";

export default { 
  components: { 
    AnzahlStudenten,
    AnzahlPruefungen,
    DurchschnittAnmeldungen,
    VerteilungPruefung,
    VerteilungAnmeldungen,
    VerteilungPruefungsphase,
    DurchschnittPruefungen
  }
}
</script>
<style>
.testttt {
  cursor: pointer;
  width: 250%;
}


</style>
