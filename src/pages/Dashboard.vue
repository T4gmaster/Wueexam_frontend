<template>
<div>
    <b-row>
      <b-col>
      <anzahl-studenten class="testttt" />
      <anzahl-pruefungen class="testttt"/>
      <durchschnitt-pruefungen class="testttt" />
      <durchschnitt-anmeldungen class="testttt" />
      <kpi-solver class="testttt"/>
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
      <verteilung-studiengaenge style="float:right;" />
      </b-col>
    </b-row>
    <b-row>
    <b-col>
    <b-card>
    <laenge-pruefungsphase />
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
import VerteilungStudiengaenge from "@/components/VerteilungStudiengaenge.vue";
import VerteilungAnmeldungen from "@/components/VerteilungAnmeldungen.vue";
import DurchschnittPruefungen from "@/components/DurchschnittPruefungen.vue";
import LaengePruefungsphase from "@/components/LaengePruefungsphase.vue";
import KpiSolver from "@/components/KPISolver.vue";


export default { 
  components: { 
    AnzahlStudenten,
    AnzahlPruefungen,
    DurchschnittAnmeldungen,
    VerteilungPruefung,
    VerteilungAnmeldungen,
    VerteilungStudiengaenge,
    DurchschnittPruefungen,
    LaengePruefungsphase,
    KpiSolver
  }
}
</script>
<style>
.testttt {
  cursor: pointer;
  width: 350%;
}


</style>
