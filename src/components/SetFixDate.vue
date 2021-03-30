<template>
  <div>
    <b-button
      v-b-modal.modal-set-fixdate
      @click="(e) => deleteItem(props.row, e)"
      variant="primary"
      >Anmeldung manuell hinzufügen</b-button
    >
    <b-modal
      ref="editFixdate"
      id="modal-set-fixdate"
      v-model="fixdate"
      title="Fixdatum einstellen"
      size="xl"
      hide-footer
    >
      <b-card>
        <p>Hallo</p>
      </b-card>
      <b-button type="submit" variant="primary">hinzufügen</b-button>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fixdate: {
        id: "123",
        date: "345",
      }
    };
  },
  methods: {
    addFixdate() {
      this.$emit("sendFixdate", this.fixdate)
      console.log('fixdate from component:', this.fixdate)
    }
  }
};
</script>
