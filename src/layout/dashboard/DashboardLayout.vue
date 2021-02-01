<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/home" name="Home" icon="ti-home"/>
        <sidebar-link to="/upload" name="Prüfungsanmeldungen" icon="ti-upload"/>
        <sidebar-link to="/pruefungsparamter" name="Prüfungsparameter" icon="ti-panel"/>
        <sidebar-link to="/solver" name="Solver" icon="ti-harddrives"/>
        <sidebar-link to="/pruefungsplan" name="Prüfungsplan" icon="ti-layout"/>
      </template>
      <mobile-menu>
        <drop-down class="nav-item"
                   title="5 Notifications"
                   title-classes="nav-link"
                   icon="ti-bell">
          <a class="dropdown-item">Notification 1</a>
          <a class="dropdown-item">Notification 2</a>
          <a class="dropdown-item">Notification 3</a>
          <a class="dropdown-item">Notification 4</a>
          <a class="dropdown-item">Another notification</a>
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
    }
  }
};
</script>
