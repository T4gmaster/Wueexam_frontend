<template>
  <div>
    <b-button
      id="show-btn"
      @click="$bvModal.show('modal-add-room')"
      variant="primary"
      >Raum hinzufügen</b-button
    >
    <b-modal
      id="modal-add-room"
      title="Raum hinzufügen"
      size="xl"
      hide-footer
    >
      <b-card>
        <b-row>
          <b-col sm="2">
            <h5>Raum</h5>
          </b-col>
          <b-col sm="6">
            <b-form-input
              v-model="room.name"
              size="lg"
            ></b-form-input>
          </b-col>
        </b-row>
        <p></p>
        <b-row>
          <b-col sm="2">
            <h5>Kapazität</h5>
          </b-col>
          <b-col sm="6">
            <b-form-input
              v-model="room.capacity"
              size="lg"
              type="number"
              required="true"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="2">
            <h5>Aktiv</h5>
          </b-col>
          <b-col sm="6">
            <b-form-checkbox
              v-model="room.selected"
            ></b-form-checkbox>
          </b-col>
        </b-row>
      </b-card>
      <b-button @click="addRoom" variant="primary"
        >hinzufügen</b-button
      >
    </b-modal>
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  props: {},
  data() {
    return {
        room: {
            name:'',
            capacity: '',
            selected: false
        }
    };
  },
  computed: {},
  methods: {
      addRoom() {
          let newRoom = ({id: '', room: this.room.name, capacity: this.room.capacity, selected: this.room.selected, proctor: '', slots: [{one: this.room.capacity}, {two: this.room.capacity}, {three: this.room.capacity}, {four: this.room.capacity}, {five: this.room.capacity}, {six: this.room.capacity}], period: {}})
          this.$emit("updateRoom", newRoom)
          console.log('Room handed over to parent:', newRoom)
          this.$bvModal.hide('modal-add-room');
          this.$bvToast.toast(
              'Raum ' + this.room.name + ' hinzugefügt!',
              { title: 'Raum erstellt',
              autoHideDelay: 20000
              }             
          );
          this.room.name='';
          this.room.capacity='',
          this.room.selected=null


          // ToDo: fix key for ID 
          // toast only if successufll -> if formula
          // ToDo: only submit if data is there / validation!

      }
  },
};
</script>