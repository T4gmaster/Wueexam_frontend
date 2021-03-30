<template>
    <div>
        <b-button id="show-btn" @click="show = true" variant="primary" 
      >Verfügbarkeit festlegen</b-button
    >
    <b-modal v-model="show" id="modal-set-slots" title="Verfügbare Slots einstellen" size="xl" hide-footer>
      <b-card>
        <p >ToDo: Kalender für Tabelleneintrag anzeigen um Slots pro Tag in Periode festzulegen</p>
        <p>  </p>
      </b-card>
      <b-button @click="showRegistration" variant="primary">hinzufügen</b-button> 
    </b-modal>

    
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false
        }
    },
    props: ['rooms']
}
</script>