<template>
  <div>
    <b-avatar variant="info" src="@/assets/logo.png"></b-avatar>
    <b-img rounded="circle" src="@/assets/logo.png" fluid alt="Fluid image"></b-img>
    <b-card title="Card Title" no-body>
      <b-card-header header-tag="nav">
        <b-nav card-header pills>
          <b-nav-item active>Startseite</b-nav-item>
          <b-nav-item>Anmeldungen</b-nav-item>
          <b-nav-item>Prüfungsplan</b-nav-item>
          <b-nav-item disabled>Prüfungen</b-nav-item>
        </b-nav>
      </b-card-header>
    </b-card>
  </div>
</template>