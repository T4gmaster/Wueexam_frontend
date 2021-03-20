<template>
<div>
  <div class="grid-container">
    <div>
      <a target="_blank" href="https://wuestudy.zv.uni-wuerzburg.de/"><button class= "kachel1" id="k1">WueStudy</button></a>
    </div>
    <div>
      <router-link to=/upload tag="button" class= "kachel2">Neuen Prüfungsplan erstellen</router-link>
    </div>
    <div>
      <router-link to=/pruefungsplan tag="button" class= "kachel3">Erstellte Prüfungspläne anzeigen</router-link>
    </div>
  </div>
  <p/>
  <stats-cards>
    <div>
      <button class= "langerbutton">zur Dokumentation / How to</button>
    </div>
  </stats-cards>
</div>
</template>

<script>

</script>

<style>
.kachel2 {
  height: 150px;
  width: 150px;
  border: 1px solid #000000;
  cursor: pointer;
  background-color: #4aa718;
}
.kachel1 {
  height: 150px;
  width: 150px;
  border: 1px solid #000000;
  cursor: pointer;
  background-color: #2c93de;
}
.kachel3 {
  height: 150px;
  width: 150px;
  border: 1px solid #000000;
  cursor: pointer;
  background-color: #dc572a;
}
.kachel1:hover {
  background-color: #3399cc;
}
.kachel2:hover {
  background-color: #339900;
}
.kachel3:hover {
  background-color: #cc6633;
}
.grid-container {
  display: inline-grid;
  grid-template-columns: auto auto auto;
  grid-gap: 2px;
  background-color: #0000000;
  padding: 10px;
}
.langerbutton {
  height: 40px;
  width: 460px;
  border: 1px solid #000000;
  cursor: pointer;
}
.langerbutton:hover {
  background-color: #ddddeb;
}
</style>
