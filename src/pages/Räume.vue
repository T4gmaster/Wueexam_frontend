<template>
<div>
  <add-room class="button_margin" @updateRoom="receiveRoom"></add-room>
  <p></p>

<!-- Tabelle !-->
<b-table :items="rooms" :fields="roomsHeader" head-variant="light">
  <template template #cell(capacity)="row">
    <b-badge class="selectitem" @click="show = true" variant="success">{{row.item.capacity}}</b-badge>
    <!-- evtl. macht template Einordnung Probleme !-->
  

  <b-modal v-model="show" title="allgemeine Kapazität ändern" hide-footer id="modal-set-capacity">
    <p>test</p>
  </b-modal>
  </template>



    <template v-slot:cell(selected)="row" >
            <b-checkbox v-model="row.item.selected"></b-checkbox>
    </template>
<!-- Button: Kapazität festlegen !-->
    <template v-slot:cell(actions)="row">
        <div>
        <b-button @click="row.toggleDetails(); fillArray(row.item, row.index)" class="button" variant="primary"><i class="fa fa-wrench"></i>Kapazität einschränken</b-button>
        </div>
    </template>
<!-- Kapazität je Raum !-->
    <template #row-details="row">
      <b-card>
<!-- auskommentiert (evtl. löschen): Standardgröße ändern -> Frage: Standadgröße nur in JSON änderbar? oder in extra Modal?!--> <!--
        <b-row>
          <b-col md="3"><span>Standardgröße</span></b-col>
            <b-col md="2">
            <b-form-input size="sm" v-model="row.item.capacity" ></b-form-input>
            </b-col>
            <b-col md="7"><b-button variant="primary" class="adddate" @click="row.toggleDetails()"><i class="fa fa-times"></i></b-button></b-col>
          </b-row>
          !-->
          <b-row><b-col sm="9"><h5>Einzeltage einschränken: <b>{{slotModalRoom}}</b></h5></b-col>
            <b-col sm="3"><b-button class="adddate" variant="primary" @click="row.toggleDetails()"><i class="fa fa-times"></i></b-button></b-col></b-row>
          <b-table sticky-header :select-mode="selectMode" :items="examPeriod" :fields="examPeriodHeader">
            <template #cell(date)="row">
              {{moment(row.item.date).locale('de').format('dddd, DD.MM.YYYY')}}

            </template>
            <template v-slot:cell(selected)="row" >
            <b-checkbox v-model="row.item.selected"></b-checkbox>
    </template>
            <template class="mouseClick" #cell(capacity)="row" >

            <b-badge class="selectitem" v-if="row.item.fixdate" @click="testLog(row.item, row.index)" v-b-modal.modal-set-slots variant="success">80</b-badge>
      <b-badge class="selectitem" @click="testLog(row.item, row.index)" v-b-modal.modal-set-slots v-else variant="warning">eingeschränkt</b-badge>
            </template>



          </b-table>

<!-- Slots Modal !-->

          <b-modal hide-footer id="modal-set-slots"><template #modal-title><b>Verfügbarkeit einschränken:</b> <br> {{ slotModalRoom }} - {{ moment(slotModalDay.date).locale('de').format('dddd, DD.MM.YYYY') }}</template>
          
          <b-card>

        <b-row>
          <b-col sm="5">
            <label v-b-tooltip.hover title="">08:00 Uhr</label>
          </b-col>
          <b-col sm="3">
            <b-form-input size="sm" v-model="slots.one" ></b-form-input>
          </b-col>
        </b-row>
        <p></p>
        <b-row>
          <b-col sm="5">
            <label v-b-tooltip.hover title="">10:00 Uhr</label>
          </b-col>
          <b-col sm="3">
            <b-form-input size="sm" v-model="slots.two" ></b-form-input>
          </b-col>
        </b-row>
        <p></p>
        <b-row>
          <b-col sm="5">
            <label v-b-tooltip.hover title="">12:00 Uhr</label>
          </b-col>
          <b-col sm="3">
            <b-form-input size="sm" v-model="slots.three" ></b-form-input>
          </b-col>
        </b-row>
        <p></p>
        <b-row>
          <b-col sm="5">
            <label v-b-tooltip.hover title="">14:00 Uhr</label>
          </b-col>
          <b-col sm="3">
            <b-form-input size="sm" v-model="slots.four" ></b-form-input>
          </b-col>
        </b-row>
        <p></p>
        <b-row>
          <b-col sm="5">
            <label v-b-tooltip.hover title="">16:00 Uhr</label>
          </b-col>
          <b-col sm="3">
            <b-form-input size="sm" v-model="slots.five" ></b-form-input>
          </b-col>
        </b-row>

      </b-card>

      <b-button variant="primary" class="adddate" @click="$bvModal.hide('modal-set-slots'); logSlots()"><i class="fa fa-floppy-o"></i>speichern</b-button>
          
          </b-modal>




        
  
        <b-button class="confirm" variant="success" @click="row.toggleDetails"><i class="fa fa-floppy-o"></i>Änderung speichern</b-button>


      </b-card>

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
  
  <router-link to=/solver tag="b-button" class="continue" ><i class="fa fa-arrow-right"></i>Weiter</router-link>
  <button @click="fillArray">test</button>
</b-row>
</div>
</template>

<script>
import moment from "moment";
import rooms from "@/assets/rooms.json";
import DataTable from "vue-materialize-datatable";
import AddRoom from "@/components/AddRoom.vue";
import SetSlots from "@/components/SetSlots.vue";
import {test} from "@/pages/Prüfungsparameter.vue"
import axios from 'axios';


export default {
    components: {
      "datatable": DataTable,
      AddRoom,
      SetSlots
    },
    data () {
        return {
            moment: moment,
            show: false,
            rooms: rooms,
            test: test,
            examPeriodHeader: [
              /*{
                key: 'day_ordered',
                label: 'Tag'
              },*/
              {
                key: 'date',
                label: 'Datum'
              },
              {
                key: 'capacity',
                label: 'Kapazität'
              },
              {
                key: 'selected',
                label: 'Verfügbar'
              }              
            ],
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
            ],
            period: [
              {
                day: '0',
                date: '2021-04-08T22:00:00.000Z'
              },
              {
                day: '1',
                date: '2021-04-09T22:00:00.000Z'
              },
              {
                day: '2',
                date: '2021-04-10T22:00:00.000Z'
              }
            ],
            slots: {
              one: "80",
              two: "80",
              three: "80",
              four: "80",
              five: "80",
            },
            // add dummy data to exam period until rounting available
            examPeriod: [],
            slotModalDay:'',
            slotModalRoom: '',

        }
    },
    created() {
      let token = ""
      axios.post(this.$IPBE + "/login", {
        name: this.$NAME,
        password: this.$PW
      })
      .then(response => {
        this.token = response.data.token
        axios.get(this.$IPBE + "/download_day_mapping", {
          headers: {
          "Authorization": `Bearer ${this.token}`
        }})
        .then(res => {
          this.examPeriod = res.data;
          console.log('daymapping from be: ', this.examPeriod)})
        .catch(error => {
          console.log(error)
        })
      })  
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
        logData() {
          console.log ('date from other component:', this.test)

        },
        removeRow(index) {
          this.rows.pop(index)

        },
        logRoomArray() {
          const periodDays = []
          // create array with all days exams can be written and store as periodDays
          //ToDo: perhaps store date as well in order to use the final Array as v-model for template
          console.log('period set:', this.examPeriod)
          this.examPeriod.forEach(element => {
            periodDays.push(element.date)
          })
          console.log('period:', periodDays)

          //first step: add 5 slots per day to each day in periodDays and store as periodSlots
          const periodSlots = []
          periodDays.forEach(index => {
            periodSlots[index]=this.slots
          })
          console.log('slots per day:', periodSlots)

          // extract room name of selected rooms from all availalbe room data and store in roomSlots
          console.log('rooms registrated:', rooms)
          const roomSlots = []
          rooms.forEach(element => {
            if (element.selected) {
              roomSlots.push(element.room)
            }       
          });

          //second step: add  periodSlots for each room in roomSlots and store as finalRoomArray
          const finalRoomArray = []
          roomSlots.forEach(element => {
            finalRoomArray[element]=periodSlots
          })
          console.log('finalRoomArray', finalRoomArray)
          console.log(JSON.stringify(finalRoomArray))

          axios.post(this.$IPBE + "/room_mapping", finalRoomArray)

          // ToDo: JSON.stringify geht nicht; check: wann Array, wann Object verwendet
               
        },
        fillArray(item, index) {
          console.log('rauminformation aus dieser zeile', item, index)
          console.log ('rooms:', rooms)

          this.slotModalRoom = item.room
          console.log('item.room', this.slotModalRoom)

          console.log('asd:', this.examPeriod)
          let days = new Array()

          this.examPeriod.forEach(element => {
            days.push(JSON.stringify(element.day_ordered))
          })
          console.log ('def:', days)

          let xy = {}
          days.forEach(element => {
            xy[element] = this.slots
          })
          console.log('finally:', JSON.stringify(xy))

          let finalList = {}
          rooms.forEach(element => {
            if (element.selected) {
              finalList[element.room] = xy
            }
          })

          console.log('final list:', JSON.stringify(finalList))

          axios
          .post(this.$IPBE + "/room_availability", finalList, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(function (response) {
            console.log('success:', response);
          })
          .catch(function (error) {
            console.log('error:', error);
          });

        



        },
        testLog(item, index) {
          console.log('hallo ich bin ein Datum', item)
          console.log('ichbindieposition', index)
          this.slotModalDay = item
          console.log('slotmodal:', this.slotModalDay)
          console.log('blablabla.room', this.slotModalRoom)
          console.log('dassindalleslots:', this.slots)
          let room = this.slotModalRoom
          let day = item.day_ordered
          let updateSlot = []
          updateSlot.push({'room': room, 'day': day, 'slots': this.slots})
          console.log('gute nacht:', JSON.stringify(updateSlot))
          axios
          .post(this.$IPBE + "/rooms_update", updateSlot, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(function (response) {
            console.log('success:', response);
          })
          .catch(function (error) {
            console.log('error:', error);
          });
        },
        logSlots() {
          console.log('dassindalleslots:', this.slots)
        }

        // ToDo: Funktion um Prüfungszeitraum zu bekommen

        // Idee: Multi-dropdown um Raumverfügbarkeit einzuschränken

        // ToDo: Funktion um Slots pro Tag in Prüfungszeitraum zu vergeben (component) -> Button "Zeitslots festlegen"

        // ToDo: overwrite data model after action

    }
}
</script>

<style>
.checkbox {
  float: left;
}
.button {
  float: left;
  margin-left: 9px;
}
.button_margin {
  float: left;
  margin-left: 9px;
  margin-bottom: 9px;
}
.confirm {
  float: right;
  margin-left: 9px;
}
.ul {
    max-width: 25%;
}
.selectitem:hover {
  cursor: pointer
}
.adddate {
  float: right;
  margin-left: 9px;
}
</style>
