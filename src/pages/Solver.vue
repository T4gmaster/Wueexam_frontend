<template>
  <div>
    <!--<h2>Übersicht</h2>-->
    <!--Stats cards-->
    <div class="row">
      <div class="col-md-6 col-xl-3" v-for="stats in statsCards" :key="stats.title">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            {{stats.value}}
          </div>
        </stats-card>
      </div>
    </div>
    <b-button v-on:click="startSolver()" @click="startSolver()">Solver starten</b-button>
    <b-button v-on:click="stopSolver()" @click="stopSolver()">Solver beenden</b-button>
    <solver-status v-if="solverstatus"></solver-status>
    <router-link to=/pruefungsplan tag="b-button" class="continue" ><i class="fa fa-arrow-right"></i>Weiter</router-link>
</div>
</template>

<script>
import axios from 'axios';
import Button from '../components/Button.vue';
import SolverStatus from '@/components/SolverStatus.vue';
import { StatsCard, ChartCard } from "@/components/index";

export default { 
  components: { 
      Button,
      StatsCard,
      SolverStatus
    },
    data() {
        return {
            statsCards: [
            {
                type: "",
                icon: "ti-calendar",
                title: "Start:",
                value: "01.03.2021"
            },
            {
                type: "",
                icon: "ti-calendar",
                title: "Ende:",
                value: "21.03.2021"
            },
            {
                type: "danger",
                icon: "ti-book",
                title: "Prüfungen",
                value: "37"
            },
            {
                type: "info",
                icon: "ti-user",
                title: "Studenten",
                value: "1108"
            }
            ],
            solverstatus: false
        };
    },
    methods: {
      startSolver(){
          //axios.post('localhost:5000/startsolver')
          //.then(function (response) {
            this.solverstatus = true
            //console.log(response);
          //})
          //.catch(function() {
           //   console.log('Solver konnte nicht gestartet werden');
          //});
      },
        stopSolver(){
          axios.post('localhost:5000/stopsolver')
          .then(function (response) {
            this.solverstatus = false
            console.log(response);
          })
          .catch(function () {
              console.log('Solver konnte nicht gestopt werden');
          });
        },
        makeStart(append = false) {
            this.toastCount++
            this.$bvToast.toast(`Prüfungsplaner wurde gestartet!`, {
                title: 'Status',
                autoHideDelay: 5000,
                appendToast: append
            })
        },
        makeStop(append = false) {
            this.toastCount++
            this.$bvToast.toast(`Prüfungsplaner wurde gestoppt!`, {
                title: 'Status',
                autoHideDelay: 5000,
                appendToast: append
            })
        }
    }
};
</script>
<style>
</style>
