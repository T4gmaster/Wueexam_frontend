<template>
    <div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <div class="topnav" id="myTopnav">
            <a class="active" href="/"><i class="fa fa-fw fa-home"></i></a>
            <a href="/upload"><i class="fa fa-upload"></i> Upload</a>
            <a href="pruefungsansicht"><i class="fa fa-table"></i> Prüfungsplan</a>
            <a href="javascript:void(0);" class="icon" onclick="myFunction()">
                <i class="fa fa-bars"></i>
            </a>
            <div class="search-container">
                <form action="/action_page.php">
                    <input type="text" placeholder="Search.." name="search">
                    <button type="submit"><i class="fa fa-search"></i></button>
                 </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Topbar",
    components: {
    },
    methods: {
        myFunction() {
            var x = document.getElementById("myTopnav");
            if (x.className === "topnav") {
                x.className += " responsive";
            } else {
                x.className = "topnav";
            }
        }
    }
}
</script>

<style>
body {
    margin: 20;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: left;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.topnav {
    display: inline-grid;
    grid-template-columns: auto auto auto auto;
    text-align: center;
    background-color: #d8dadc;
    box-shadow: 0 0 20px 0 #777777;
}

.topnav a {
  float: left;
  display: block;
  color: #000000;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #b4b3b5;
  color: black;
}

.topnav a.active {
  background-color: #063d79;
  color: white;
}

.topnav .icon {
  display: none;
}

.topnav .search-container {
  float: right;
}

.topnav input[type=text] {
  padding: 6px;
  margin-top: 8px;
  font-size: 17px;
  border: none;
}

.topnav .search-container button {
  float: right;
  padding: 6px 3px;
  margin-top: 8px;
  margin-right: 1px;
  background: #d8dadc;
  font-size: 15px;
  border: none;
  cursor: pointer;
}

.topnav .search-container button:hover {
  background: #ccc;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}

@media screen and (max-width: 600px) {
  .topnav .search-container {
    float: none;
  }
  .topnav a, .topnav input[type=text], .topnav .search-container button {
    float: none;
    display: block;
    text-align: left;
    width: 100%;
    margin: 0;
    padding: 14px;
  }
  .topnav input[type=text] {
    border: 1px solid #ccc;  
  }
}

.header-right {
    position: absolute;
    margin: 20px;
    width: auto;
}
</style>