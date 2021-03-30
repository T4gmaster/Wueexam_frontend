<template>
<div>
    <!--
  <datatable
    class="table22"
    title="Übersicht Räume"
    :columns="roomsHeader"
    :rows="rooms"
    :perPage="[5, 25, 50, 100]"
    locale="de"
  >
  <th slot="thead-tr">
    aktiv
  </th>
  <template slot="tbody-tr" scope="props">
    <td >
      <b-checkbox v-for="(item, index) in rooms" v-show="index" v-model="item.selected"></b-checkbox>

    </td>
  </template>
  </datatable>
   !-->

<!-- Tabelle !-->
<b-table :items="rooms" :fields="roomsHeader" head-variant="light">
    <template v-slot:cell(selected)="row" >
            <b-checkbox v-model="row.item.selected"></b-checkbox>
    </template>
    <template v-slot:cell(actions)="row">
        <div>
        <set-slots></set-slots>
        <b-button class="button" variant="primary"><i class="fa fa-wrench"></i>Raum ändern</b-button>
        <b-button class="button" variant="primary"><i class="fa fa-trash-o"></i></b-button>
        </div>
    </template>


</b-table>



  <b-row>
      
  <label class="checkbox"> gewählte Räume sind den ganzen Prüfungszeitraum verfügbar    </label>

      <b-form-checkbox-group
        v-model="fullAvailability"
        :options="fullAvailabilityOptions"
        size="md"
        class="checkbox"
      ></b-form-checkbox-group>
  </b-row>


<b-row>
  <add-room class="button" @updateRoom="receiveRoom"></add-room>
  <b-button class="button" variant="primary">Zeitslots festlegen</b-button>
  <b-button class="button" variant="primary" @click="storeRooms">Räume speichern</b-button>
  <router-link to=/prüfungsparameter tag="b-button" class="continue" ><i class="fa fa-arrow-right"></i>Weiter</router-link>
</b-row>
</div>
</template>

<script>
import rooms from "@/assets/rooms.json";
import DataTable from "vue-materialize-datatable";
import AddRoom from "@/components/AddRoom.vue";
import SetSlots from "@/components/SetSlots.vue";

export default {
    components: {
      "datatable": DataTable,
      AddRoom,
      SetSlots
    },
    data () {
        return {
            rooms: rooms,
            roomsHeader: [
                {
                    key: 'room',
                    label: 'Raum'
                },
                {
                    key: 'capacity',
                    label: 'Kapazität'
                },
                {
                    key: 'selected',
                    label: 'Verfügbar'
                },
                {
                    key: 'actions',
                    label: 'Aktionen'
                }
            ],
            fullAvailability: null,
            fullAvailabilityOptions: [
                {text: 'ja', value: 'true'},
                {text: 'nein', value: 'false'}
            ]
        }
    },
    methods: {
        showRooms () {
            console.log('Räume:', this.rooms)
        },
        // ToDo: update List after adding new room
        receiveRoom(reply) {
            let newRoom = reply
            console.log('room received from child:', newRoom)
            this.rooms.push(newRoom)
            console.log('new roomlist:', this.rooms)
        },
        storeRooms() {
            var roomPlan = new Array()
            // Loop über alle Räume & je Raum weiterer Loop über alle Tage und da jeweils 5 Slots pushen
        }
        // ToDo: Funktion um Prüfungszeitraum zu bekommen

        // Idee: Multi-dropdown um Raumverfügbarkeit einzuschränken

        // ToDo: Funktion um Slots pro Tag in Prüfungszeitraum zu vergeben (component) -> Button "Zeitslots festlegen"

    }
}
</script>

<style>
.checkbox{
    float: left;
}
.button{
  float: left;
  margin-left: 9px;
}
</style>
