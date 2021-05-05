<template>
<div>
  <add-room class="button_margin" @updateRoom="receiveRoom"></add-room>
  <!-- <b-button class="button_margin" variant="primary">Einzeltage Bearbeiten</b-button> !-->
  <p></p>
<!-- show either calender selection or UI selection !-->
<!-- move in row.details !-->
<!--
<room-calender v-show="calenderView == true" :roomTest="roomTest" :examPeriod="examPeriod"></room-calender>
!-->

<!-- Tabelle !-->
<b-table :items="roomTest" :fields="roomsHeader" head-variant="light">
  <template template #cell(capacity)="row">
    <b-badge class="selectitem" @click="show = true; sendRoomCapacity(row.item)" variant="success">{{row.item.capacity}}</b-badge>
  
<!-- Vue Bug: Modal mit schwarzen Hintergrund: https://github.com/bootstrap-vue/bootstrap-vue/issues/3540 !-->
  <b-modal v-model="show" hide-footer id="modal-set-capacity" >
    <template #modal-title><b>Raumkapazität ändern:</b> <br> {{ selectedRoomCapacity.room }}</template>
    <b-card>
    <p></p>
        <b-row>
          <b-col sm="5">
            <label v-b-tooltip.hover title="">Kapazität</label>
          </b-col>
          <b-col sm="3">
            <b-form-input size="sm" v-model="selectedRoomCapacity.capacity" ></b-form-input>
          </b-col>
        </b-row>
    </b-card>
    <b-button @click="changeRoomCapacity(); show = false" class="adddate" variant="primary">speichern</b-button>
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
            <template #cell(period)="row">

         
              {{moment(row.item.date).locale('de').format('dddd, DD.MM.YYYY')}}


            </template>
            <!--
            <template v-slot:cell(selected)="row" >
            <b-checkbox v-model="row.item.selected"></b-checkbox>
    </template>
    !-->
            <template class="mouseClick" #cell(capacity)="row" >

            <b-badge class="selectitem" v-if="row.item.slotRestriction" @click="testLog(row.item, row.index); sendRoomSlotIndex(row.item, row.index)" v-b-modal.modal-set-slots variant="success">80</b-badge>
      <b-badge class="selectitem" @click="setSlotsToChange(row.item, row.index); sendRoomSlotIndex(row.item, row.index)" v-b-modal.modal-set-slots v-else variant="warning">eingeschränkt</b-badge>
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
            <b-form-input type="number" :number="true" size="sm" v-model="roomTest[indexOfRoom]" ></b-form-input>
          </b-col>
        </b-row>
        <p></p>
        <b-row>
          <b-col sm="5">
            <label v-b-tooltip.hover title="">10:00 Uhr</label>
          </b-col>
          <b-col sm="3">
            <b-form-input type="number" :number="true" size="sm" v-model="slots.two" ></b-form-input>
          </b-col>
        </b-row>
        <p></p>
        <b-row>
          <b-col sm="5">
            <label v-b-tooltip.hover title="">12:00 Uhr</label>
          </b-col>
          <b-col sm="3">
            <b-form-input type="number" :number="true" size="sm" v-model="slots.three" ></b-form-input>
          </b-col>
        </b-row>
        <p></p>
        <b-row>
          <b-col sm="5">
            <label v-b-tooltip.hover title="">14:00 Uhr</label>
          </b-col>
          <b-col sm="3">
            <b-form-input type="number" :number="true" size="sm" v-model="slots.four" ></b-form-input>
          </b-col>
        </b-row>
        <p></p>
        <b-row>
          <b-col sm="5">
            <label v-b-tooltip.hover title="">16:00 Uhr</label>
          </b-col>
          <b-col sm="3">
            <b-form-input type="number" :number="true" size="sm" v-model="slots.five" ></b-form-input>
          </b-col>
        </b-row>
        <p></p>
        <b-row>
          <b-col sm="5">
            <label v-b-tooltip.hover title="">18:00 Uhr</label>
          </b-col>
          <b-col sm="3">
            <b-form-input type="number" :number="true" size="sm" v-model="slots.six" ></b-form-input>
          </b-col>
        </b-row>

      </b-card>

      <b-button variant="primary" class="adddate" @click="$bvModal.hide('modal-set-slots'); changeSlots()"><i class="fa fa-floppy-o"></i>speichern</b-button>
          
          </b-modal>




        
  
        <b-button class="confirm" variant="success" @click="row.toggleDetails"><i class="fa fa-floppy-o"></i>Änderung speichern</b-button>


      </b-card>

    </template>


</b-table>


<b-row>
  
  <router-link to=/solver tag="b-button" class="continue" ><i class="fa fa-arrow-right"></i>Weiter</router-link>
  <button @click="fillArray">test</button>
</b-row>



</div>
</template>

<script>
import moment from "moment";
import rooms from "@/assets/rooms.json";
import roomTest from "@/assets/roomTest.json";
import DataTable from "vue-materialize-datatable";
import AddRoom from "@/components/AddRoom.vue";
import SetSlots from "@/components/SetSlots.vue";
import axios from "axios";
import RoomCalender from "@/components/RoomCalender.vue"

export default {
  components: {
    datatable: DataTable,
    AddRoom,
    SetSlots,
    RoomCalender
  },
  data() {
    return {
      calenderView: false,
      token: "",
      moment: moment,
      show: false, // Show Modal
      id: "", // Modal ID
      rooms: rooms,
      roomTest: roomTest,
      examPeriodHeader: [
        /*{
                key: 'day_ordered',
                label: 'Tag'
              },*/
        {
          key: "period",
          label: "Datum",
        },
        {
          key: "capacity",
          label: "Kapazität",
        },
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
      
      slots: {
        one: "200",
        two: "200",
        three: "200",
        four: "200",
        five: "200",
        six: "200"
      },
      selectedRoomCapacity: [],
      selectedRoomSlot: [],
      // add dummy data to exam period until rounting available
      examPeriod: [],
      indexToReplceRoomCapacity: '',
      indexInPeriod:'',  
      dayInPeriod: '',
      indexOfRoom:'',    
      slotModalDay: "",
      //remove and replace by routing
      offlineDayMapping: [
        {day_ordered:1,date:1617148800000},
        {day_ordered:2,date:1617235200000},
        {day_ordered:3,date:1617321600000},
        {day_ordered:5,date:1617494400000},
        {day_ordered:6,date:1617580800000}],
      slotModalRoom: "",
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  },
  created() {
    this.getLogin();
    setTimeout(() => this.getDayMapping(), 3000);
    setTimeout(() => this.addPeriodToRoomArray(), 6000);
  },
  methods: {
    toggleDetails() {
      // hide and show row
    },
    sendRoomCapacity(item) {
      this.selectedRoomCapacity = item // hand over row to global variable
      console.log('selected row to change', this.selectedRoomCapacity)
    },
    changeRoomCapacity() {
      /*
      find Index of room which capacity should be changed
      */
      var indexToReplceRoomCapacity = this.indexToReplceRoomCapacity
      this.roomTest.forEach ((item, index) => {
        if (item.room == this.selectedRoomCapacity.room) {
          indexToReplceRoomCapacity = index
        }
      })
     console.log('index in room array', indexToReplceRoomCapacity)
     this.roomTest[indexToReplceRoomCapacity].capacity = this.selectedRoomCapacity.capacity // change capacity in room array
     this.$bvToast.toast(
              this.selectedRoomCapacity.room + ': ' + this.roomTest[indexToReplceRoomCapacity].capacity + ' Plätze',
              { title: 'Kapazität geändert!',
              autoHideDelay: 20000
              }             
          );
    },
    sendRoomSlotIndex(item, index) {
      this.selectedRoomSlot =item // hand over row of selected day to global variable
      let indexInPeriod = this.indexInPeriod
      indexInPeriod = index
      this.dayInPeriod = item.ISO_date // hand over index of item
      console.log('selected day to change', this.selectedRoomSlot)
      console.log('index of day that is replaced', indexInPeriod)
    },
    setSlotsToChange(item) {
      console.log('room selected', this.slotModalRoom)
      this.slotModalDay = item;
      /*
      get index of selected room
      */
      var indexOfRoom = this.indexOfRoom
      this.roomTest.forEach((room, index) => {
        if (room.room == this.slotModalRoom) {
          indexOfRoom = index
          }
        })
      console.log('index of room', indexOfRoom);
      console.log('ahhhhhhhhhhhhhh', JSON.stringify(this.roomTest[indexOfRoom].period))
      console.log("slotmodal:", this.slotModalDay)
      const selectedRoom = this.slotModalRoom
      const slots = this.slots
      this.roomTest.forEach((item) => {
        if (item.room == selectedRoom) {
          slots.one = item.capacity
          slots.two = item.capacity
          slots.three = item.capacity
          slots.four = item.capacity
          slots.five = item.capacity
          slots.six = item.capacity
        }
      })
      console.log('v-model to update slots', slots)
    },
    changeSlots() {
      /*
      get index of selected room
      */
      var indexOfRoom = this.indexOfRoom
      this.roomTest.forEach((room, index) => {
        if (room.room == this.slotModalRoom) {
          indexOfRoom = index
          }
        })
      console.log('index of room', indexOfRoom)
      /*
      insert slots into room v-model
      */
     var indexInPeriod = this.indexInPeriod
     let slots = this.slots
     console.log(indexInPeriod)
     console.log('selected date', this.dayInPeriod)
     console.log('path', this.roomTest[indexOfRoom].period)
     this.roomTest[indexOfRoom].period[indexInPeriod] = slots
     console.log('apskjdhfsdipgsapf', this.roomTest[indexOfRoom].period[indexInPeriod])
     console.log('new asdasd', this.roomTest)
     /*
     this.roomTest.forEach((item) => [
       item.period.forEach((day) => {
         console.log('testamabend', item.day)
       })
     ])
     */
     // make sure period and period have both the same range
     // if so, make sure both start at same index // object.entries & object.keys verwenden evtlüüüüüüüüüüüüüüüüüüüüüüüüüüü
     // add index to roomTest as well
     // object.keys auf index und dann mit this.indexInPeriod vergleichen
     // an position slots einfügen



    },

    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(
        Object.values(item.period)[index],
        null,
        2
      );
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    // ToDo: update List after adding new room
    receiveRoom(reply) {
      let newRoom = reply;
      console.log("room received from child:", newRoom);
      this.rooms.push(newRoom);
      console.log("new roomlist:", this.rooms);
    },
    logFinalArray(item, index) {
      console.log('ich habe das v-model hoffentlich fertig', this.roomTest)
      console.log('asd', item)
      console.log('index', index)

    },
    getLogin() {
      axios
        .post(this.$IPBE + "/login", {
          name: this.$NAME,
          password: this.$PW,
        })
        .then((response) => {
          this.token = response.data.token;
          console.log(this.token);
        });
    },
    async getDayMapping() {
      await axios
        .get(this.$IPBE + "/download_day_mapping", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          this.examPeriod = res.data;
          console.log("daymapping from be: ", this.examPeriod);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addPeriodToRoomArray() {
      // Step 1: create period array that will be pushed in the rooms v-model
      let roomTest = this.roomTest;
      console.log("raumliste:", roomTest);
      console.log("period:", this.examPeriod);
      let period = [];
      this.examPeriod.forEach((element) => {
        period.push(element.ISO_date);
      });
      // Step 2: add the respective slots for each room/period[day] constellation
      roomTest.forEach((item) => {
        period.forEach((key) => {
          item.period[key] = item.slots;
        });
      });
      // Step 3: replace period Object by array
      /*
      roomTest.forEach((item) => {
         var periodArray = [];
          for(var i in item.period){
          periodArray.push({[i]:item.period[i]});
          }
          item.period = periodArray
      })
      */
      console.log("final room v-model:", roomTest);
      console.log("JSON", JSON.stringify(roomTest))
    },
    removeRow(index) {
      this.rows.pop(index);
    },
    logRoomArray() {
      const periodDays = [];
      // create array with all days exams can be written and store as periodDays
      //ToDo: perhaps store date as well in order to use the final Array as v-model for template
      console.log("period set:", this.examPeriod);
      this.examPeriod.forEach((element) => {
        periodDays.push(element.date);
      });
      console.log("period:", periodDays);

      //first step: add 5 slots per day to each day in periodDays and store as periodSlots
      const periodSlots = [];
      periodDays.forEach((index) => {
        periodSlots[index] = this.slots;
      });
      console.log("slots per day:", periodSlots);

      // extract room name of selected rooms from all availalbe room data and store in roomSlots
      console.log("rooms registrated:", rooms);
      const roomSlots = [];
      rooms.forEach((element) => {
        if (element.selected) {
          roomSlots.push(element.room);
        }
      });

      //second step: add  periodSlots for each room in roomSlots and store as finalRoomArray
      const finalRoomArray = [];
      roomSlots.forEach((element) => {
        finalRoomArray[element] = periodSlots;
      });
      console.log("finalRoomArray", finalRoomArray);
      console.log(JSON.stringify(finalRoomArray));

      axios.post(this.$IPBE + "/room_mapping", finalRoomArray);

      // ToDo: JSON.stringify geht nicht; check: wann Array, wann Object verwendet
    },
    fillArray(item, index) {
      console.log("rauminformation aus dieser zeile", item, index);
      console.log("rooms:", rooms);

      this.slotModalRoom = item.room; // set global variable to store room
      console.log("item.room", this.slotModalRoom);

      console.log("asd:", this.examPeriod);
      let days = new Array();

      this.examPeriod.forEach((element) => {
        days.push(JSON.stringify(element.day_ordered));
      });
      console.log("def:", days);

      let periodSlots = {};
      days.forEach((element) => {
        periodSlots[element] = this.slots; // actual slots needed
      });
      console.log("finally:", JSON.stringify(periodSlots));

      let finalList = {};
      rooms.forEach((element) => {
        if (element.selected) {
          finalList[element.room] = periodSlots;
        }
      });

      console.log("final list:", JSON.stringify(finalList));

      console.log("asd", this.rooms);

      axios
        .post(this.$IPBE + "/room_availability", finalList, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          console.log("success:", response);
        })
        .catch(function (error) {
          console.log("error:", error);
        });
    },
    testLog(item, index) {
      this.slotModalDay = item;
      console.log("slotmodal:", this.slotModalDay);
      console.log("blablabla.room", this.slotModalRoom);
      console.log("dassindalleslots:", this.slots);
      let room = this.slotModalRoom;
      let day = item.day_ordered;
      let updateSlot = [];
      updateSlot.push({ room: room, day: day, slots: this.slots });
      console.log("gute nacht:", JSON.stringify(updateSlot));
      axios
        .post(this.$IPBE + "/rooms_update", updateSlot, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          console.log("success:", response);
        })
        .catch(function (error) {
          console.log("error:", error);
        });
    },
    halloTest(item) {
      console.log("easy", item);
    },

    // ToDo: Funktion um Prüfungszeitraum zu bekommen

    // Idee: Multi-dropdown um Raumverfügbarkeit einzuschränken

    // ToDo: Funktion um Slots pro Tag in Prüfungszeitraum zu vergeben (component) -> Button "Zeitslots festlegen"

    // ToDo: overwrite data model after action
  },
};
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
  cursor: pointer;
}
.adddate {
  float: right;
  margin-left: 9px;
}
</style>
