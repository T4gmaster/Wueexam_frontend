<template>
<p></p>
  <div class="grid-container">
    <div>
      <a target="_blank" href="https://wuestudy.zv.uni-wuerzburg.de/"><button class= "kachel" id="k1">wuestudy</button></a>
    </div>
    <div>
      <a href="http://localhost:8081/upload"><button class= "kachel">Upload Prüfungsanmeldung</button></a>
    </div>
    <div>
      <a href="http://localhost:8081/pruefungsansicht"><button class= "kachel">Prüfungsplan</button></a>
    </div>
    <div>
      <a href="http://localhost:8081/pruefungsansicht"><button class= "kachel">Prüfungsplan</button></a>
    </div>
    <div>
      <a href="http://localhost:8081/pruefungsansicht"><button class= "kachel">Prüfungsplan</button></a>
    </div>
    <div>
      <a href="http://localhost:8081/pruefungsansicht"><button class= "kachel">Prüfungsplan</button></a>
    </div>
  </div>
</template>


<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {

  }
};
</script>

<style>
.kachel {
  height: 130px;
  width: 130px;
  border: 1px solid #000000;
  cursor: pointer;
}
.kachel:hover {
  background-color: #ddddeb;
}
.grid-container {
  display: inline-grid;
  grid-template-columns: auto auto auto;
  grid-gap: 2px;
  background-color: #0000000;
  padding: 10px;
}
</style>
