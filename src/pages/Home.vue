<template>
<div>
<b-row>
    <b-col>
    <div>
     <router-link to=/upload>
      <b-card no-body class="overflow-hidden" style="max-width: 540px;">
      <b-row no-gutters>
      <b-col md="2">
        
            <span class="ti-upload fa-5x" id="icontest"></span>
         
      </b-col>
      <b-col md="10">
        <b-card-body title="Prüfungsanmeldungen">
          <b-card-text>
            Hier wird die Liste mit den Prüfungsanmeldungen hochgeladen
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
  </router-link>
    </div>
    <div>
    <router-link to=/pruefungszeitraum>
      <b-card no-body class="overflow-hidden" style="max-width: 540px;">
      <b-row no-gutters>
      <b-col md="2">
          
            <span class="ti-calendar fa-5x" id="icontest"></span>
         
      </b-col>
      <b-col md="10">
        <b-card-body title="Prüfungszeitraum">
          <b-card-text>
            Hier werden Einstellungen zu Prüfungszeitraum und Fixterminen vorgenommen, um den Zeitraum für die Optimierung vorzubereiten
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
   </router-link>
  </div>
  <div>
  <router-link to=/raeume>  
      <b-card no-body class="overflow-hidden" style="max-width: 540px;">
      <b-row no-gutters>
      <b-col md="2">
                  
            <div class="ti-location-pin fa-5x" id="icontest"></div>
          
      </b-col>
      <b-col md="10">
        <b-card-body title="Räume">
          <b-card-text>
            Hier können Prüfungsräume hinzugefügt werden und eine Auswahl hinsichtlich ihrer Verfügbarkeit getroffen werden
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
  </router-link>
  </div>
  <div>
  <router-link to=/solver>
      <b-card no-body class="overflow-hidden" style="max-width: 540px;">
      <b-row no-gutters>
      <b-col md="2">
          
            <span class="ti-harddrives fa-5x" id="icontest"></span>
         
      </b-col>
      <b-col md="10">
        <b-card-body title="Solver">
          <b-card-text>
            Hier wird die Optimierung gestartet / gestoppt, nachdem alle Voreinstellungen getroffen wurden. Nach kurzer Zeit liefert der Solver ein optimales Ergebnis
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
   </router-link>
  </div>
  <div>
  <router-link to=/pruefungsplan>
      <b-card no-body class="overflow-hidden" style="max-width: 540px;">
      <b-row no-gutters>
      <b-col md="2">
          
            <span class="ti-layout fa-5x" id="icontest"></span>
         
      </b-col>
      <b-col md="10">
        <b-card-body title="Prüfungsplan">
          <b-card-text>
            Hier wird nach der Berechnung der fertige Prüfungsplan angezeigt. Zusätzlich lassen sich hier, falls nötig, Prüfungstermine verschieben
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
   </router-link>
  </div>
  <div>
  <router-link to=/dashboard>
      <b-card no-body class="overflow-hidden" style="max-width: 540px;">
      <b-row no-gutters>
      <b-col md="2">
          
            <div class="ti-dashboard fa-5x" id="icontest"></div>
         
      </b-col>
      <b-col md="10">
        <b-card-body title="Dashboard">
          <b-card-text>
            Im Dashboard werden nützliche KPI's zu den Prüfungsanmeldungen und dem Prüfungsplan angezeigt
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
   </router-link>
  </div>
  </b-col>
    <b-col>
  <h2>Nützliche Links:</h2>
  <div>
    <b-link target="_blank" href="https://wuestudy.zv.uni-wuerzburg.de/">
      <b-card
        overlay
        :img-src="require(`@/assets/img/WueStudyLogo.png`)"
        style="max-width: 540px;"
      >
      </b-card>
    </b-link>
    </div>
    <div>
    <b-link target="_blank" href="https://wuestudy.zv.uni-wuerzburg.de/qisserver/pages/cm/exa/searchRoomDetail.xhtml?_flowId=searchRoom-flow&_flowExecutionKey=e4s1">
  <b-card no-body class="overflow-hidden" style="max-width: 540px; max-height: 120px;">
    <b-row no-gutters>
      <b-col md="3">
        <b-card-img :src="require(`@/assets/img/NeueUni.jpeg`)" alt="Image" class="rounded-0"></b-card-img>
      </b-col>
      <b-col md="9">
        <b-card-body title="Räume suchen">
          <b-card-text>
            Nach verfügbaren Räumen an der Universität Würzburg suchen
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
  </b-link>
</div>
   <div>
    <b-link target="_blank" href="https://wueaddress.uni-wuerzburg.de/search/map?q=">
    <b-card
        overlay
        :img-src="require(`@/assets/img/jmu-banner.jpg`)"
        class="overflow-hidden"
        style="max-width: 540px;"
        align="left"
      >
      <b-row>
      <b-col md="2">
        <div class="ti-map-alt fa-5x" id="icontest"></div> 
      </b-col>
      <b-col md="10">
      <b-card-title>Lageplan</b-card-title>
      <b-card-text>
        Hier über den Lageplan nach Gebäuden/Räumen suchen
      </b-card-text>
      </b-col>
      </b-row>
    </b-card>
    </b-link>
  </div>
    </b-col>
  </b-row>
</div>
</template>

<script>

</script>

<style>
#icontest {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -35px 0 0 -25px
}
</style>
