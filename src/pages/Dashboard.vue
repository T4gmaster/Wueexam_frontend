<template>
<div>
    <b-row>
      <b-col>
      <anzahl-studenten class="testttt" />
      <anzahl-pruefungen class="testttt"/>
      <anzahl-anmeldungen class="testttt"/>
      <durchschnitt-anmeldungen class="testttt" />
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
    <b-row>
      <b-col cols="8">
      <infringing-exams />
      </b-col>
      <b-col>
      <durchschnitt-pruefungen class="testttt" />
      <kpi-solver class="testttt"/>
      <exams-greater-one class="testttt"/>
      <exams-greater-two class="testttt"/>
      <avg-time-exams class="testttt"/>
      <overlap-coeff class="testttt"/>
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
import AnzahlAnmeldungen from "@/components/AnzahlAnmeldungen.vue";
import InfringingExams from "@/components/InfringingExams.vue";
import ExamsGreaterOne from "@/components/ExamsGreaterOne.vue";
import ExamsGreaterTwo from "@/components/ExamsGreaterTwo.vue";
import AvgTimeExams from "@/components/AvgTimeExams.vue";
import OverlapCoeff from "@/components/OverlapCoeff.vue";







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
    KpiSolver,
    AnzahlAnmeldungen,
    InfringingExams,
    ExamsGreaterOne,
    ExamsGreaterTwo,
    AvgTimeExams,
    OverlapCoeff
  }
}
</script>

<style>
.testttt {
  cursor: pointer;
  width: 350%;
}
</style>
