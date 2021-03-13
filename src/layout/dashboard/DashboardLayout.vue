<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/home" name="Home" icon="ti-home"/>
        <sidebar-link to="/upload" name="Prüfungsanmeldungen" icon="ti-upload"/>
        <sidebar-link to="/pruefungsparamter" name="Prüfungsparameter" icon="ti-panel"/>
        <sidebar-link to="/solver" name="Solver" icon="ti-harddrives"/>
        <sidebar-link to="/pruefungsplan" name="Prüfungsplan" icon="ti-layout"/>
        <sidebar-link to="/dashboard" name="Dashboard" icon="ti-dashboard"/>
        <sidebar-link to="/kalender" name="Kalender" icon="ti-calendar"/>
      </template>
      <mobile-menu>
        <drop-down class="nav-item"
                   title="Profil"
                   title-classes="nav-link"
                   icon="ti-user">
          <a class="dropdown-item">Einstellungen</a>
          <a class="dropdown-item" @click="logout()"><i class="fa fa-sign-out" aria-hidden="true"></i>Logout</a>
        </drop-down>
      </mobile-menu>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    logout(){
      this.$keycloak.logout()
    }
  }
};
</script>
