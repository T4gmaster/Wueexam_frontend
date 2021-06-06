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
    <b-button @click="changeRoomCapacity(item); show = false" class="adddate" variant="primary">speichern</b-button>
  </b-modal>
  </template>
    <template v-slot:cell(selected)="row" >
            <b-checkbox v-model="row.item.selected"></b-checkbox>
    </template>
<!-- Button: Kapazität festlegen !-->
    <template v-slot:cell(actions)="row">
        <div>
        <b-button @click="row.toggleDetails(); getRoomCapacity(row.item, row.index)" class="button" variant="primary"><i class="fa fa-wrench"></i>Kapazität einschränken</b-button>
        </div>
    </template>
<!-- Kapazität je Raum !-->
    <template #row-details="row">
      <b-card>

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

            <b-badge class="selectitem" v-if="row.item.slotRestriction" @click="setSlotsToChange(row.item, row.index); sendRoomSlotIndex(row.item, row.index)" v-b-modal.modal-set-slots variant="success">eingeschränkt</b-badge>
      <b-badge class="selectitem" @click="setSlotsToChange(row.item, row.index); sendRoomSlotIndex(row.item, row.index)" v-b-modal.modal-set-slots v-else variant="warning">{{rowCapacity}}</b-badge>
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
            <b-form-input type="number" :number="true" size="sm" v-model="slots.one" ></b-form-input>
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
  <router-link @click="saveRooms()" to=/solver tag="b-button"  class="continue" ><i class="fa fa-arrow-right"></i>Weiter</router-link>
</b-row>



</div>
</template>

<script>
import moment from "moment";
import rooms from "@/assets/rooms.json"; // we now use roomTest.json instead of rooms.json
import roomTest from "@/assets/roomTest.json";
import DataTable from "vue-materialize-datatable";
import AddRoom from "@/components/AddRoom.vue";
import SetSlots from "@/components/SetSlots.vue";
import axios from "axios";
import RoomCalender from "@/components/RoomCalender.vue";

export default {
  components: {
    datatable: DataTable,
    AddRoom,
    SetSlots,
    RoomCalender,
  },
  data() {
    return {
      token: "",
      moment: moment,
      show: false, // Modal Raumkapazität ändern
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
          key: "room",
          label: "Raum",
        },
        {
          key: "capacity",
          label: "Kapazität",
        },
        {
          key: "selected",
          label: "Verfügbar",
        },
        {
          key: "actions",
          label: "Aktionen",
        },
      ],

      slots: {
        one: "200",
        two: "200",
        three: "200",
        four: "200",
        five: "200",
        six: "200",
      },
      selectedRoomCapacity: [],
      selectedRoomSlot: [],
      // add dummy data to exam period until rounting available
      examPeriod: [],
      indexToReplceRoomCapacity: "",
      indexInPeriod: "",
      dayInPeriod: "",
      indexOfRoom: "",
      slotModalDay: "",
      slotModalRoom: "",
      rowCapacity: "",
    };
  },
  created() {
    this.getLogin();
    // timeout to got step by step (necessary due to async login validation)
    setTimeout(() => this.getDayMapping(), 1500); // first get all days from the exam period from backend
    setTimeout(() => this.addPeriodToRoomArray(), 3000); // then proceed them and create v-model containing all rooms, period per room & slots per day
  },
  methods: {
    toggleDetails() {
      // hide and show row
    },
    sendRoomCapacity(item) {
      this.selectedRoomCapacity = item; // hand over room row to global variable
      console.log("selected row to change", this.selectedRoomCapacity);
    },
    changeRoomCapacity(item) {
      console.log("modalitem", item);
      /*
      find Index of room which capacity should be changed
      */
      var indexToReplceRoomCapacity = this.indexToReplceRoomCapacity;
      this.roomTest.forEach((item, index) => {
        if (item.room == this.selectedRoomCapacity.room) {
          indexToReplceRoomCapacity = index;
        }
      });
      console.log("index in room array", indexToReplceRoomCapacity);
      this.roomTest[indexToReplceRoomCapacity].capacity =
        this.selectedRoomCapacity.capacity; // change capacity in room array
      this.$bvToast.toast(
        this.selectedRoomCapacity.room +
          ": " +
          this.roomTest[indexToReplceRoomCapacity].capacity +
          " Plätze",
        { title: "Kapazität geändert!", autoHideDelay: 20000 }
      );
    },
    sendRoomSlotIndex(item, index) {
      this.selectedRoomSlot = item; // hand over row of selected day to global variable
      let indexInPeriod = this.indexInPeriod;
      indexInPeriod = index;
      this.dayInPeriod = item.ISO_date; // hand over index of item to global variable
      console.log("selected day to change", this.selectedRoomSlot);
      console.log("index of day that is replaced", indexInPeriod);
    },
    setSlotsToChange(item) {
      console.log("room selected", this.slotModalRoom);
      this.slotModalDay = item;
      /*
      get index of selected room
      */
      var indexOfRoom = this.indexOfRoom;
      this.roomTest.forEach((room, index) => {
        if (room.room == this.slotModalRoom) {
          indexOfRoom = index;
        }
      });
      console.log("index of room", indexOfRoom);
      /*console.log(
        "ahhhhhhhhhhhhhh",
        JSON.stringify(this.roomTest[indexOfRoom].period)
      );*/
      console.log("slotmodal:", this.slotModalDay);
      const selectedRoom = this.slotModalRoom;
      const slots = this.slots;
      this.roomTest.forEach((item) => {
        if (item.room == selectedRoom) {
          slots.one = item.capacity;
          slots.two = item.capacity;
          slots.three = item.capacity;
          slots.four = item.capacity;
          slots.five = item.capacity;
          slots.six = item.capacity;
        }
      });
      console.log("v-model to update slots", slots);
    },
    getRoomCapacity(item, index) {
      this.rowCapacity = item.capacity; // hand over capacity to global variable
    },
    changeSlots() {
      /*
      get index of selected room
      */
      let indexOfRoom = this.indexOfRoom;
      this.roomTest.forEach((room, index) => {
        if (room.room == this.slotModalRoom) {
          indexOfRoom = index;
        }
      });
      console.log("index of room", indexOfRoom);
      /*
      insert slots into room v-model
      */
      let indexInPeriod = this.indexInPeriod;
      let slots = this.slots;
      console.log("selected date", this.dayInPeriod);
      console.log('indexInPeriod', indexInPeriod)
      console.log('indexOfRoom', indexOfRoom)
      console.log("path", this.roomTest[indexOfRoom].period);
      /*
      replace exact position of day&room in v-model      
      */
      this.roomTest[indexOfRoom].period[indexInPeriod] = slots;
      this.$bvToast.toast(
        this.slotModalRoom +
          " (" +
          moment(this.dayInPeriod).locale("de").format("dddd, DD.MM.YYYY") +
          ") " +
          "(" +
          Object.values(slots) +
          ")",
        { title: "Kapazität eingeschränkt!", autoHideDelay: 20000 }
      );
      /*
     this.roomTest.forEach((item) => [
       item.period.forEach((day) => {
         console.log('testamabend', item.day)
       })
     ])
     */
      // make sure period and period have both the same range
      // if so, make sure both start at same index // object.entries & object.keys verwenden evtl
      // add index to roomTest as well
      // object.keys auf index und dann mit this.indexInPeriod vergleichen
      // an position slots einfügen
    },
    receiveRoom(reply) {
      // ToDo: check if room is inserted correctly into global v-model
      let newRoom = reply;
      console.log("room received from child:", newRoom);
      this.roomTest.push(newRoom);
      console.log("new roomlist:", this.roomTest);
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
      let updated = false;
      roomTest.forEach((item) => {
        period.forEach((key) => {
          item.period[key] = { slots: item.slots, updated: updated };
        });
      });

      // Step 3: replace period object by array that contains position as key (instead of date)
      roomTest.forEach((item) => {
        var periodArray = [];
        for (var i in item.period) {
          periodArray.push(item.period[i]);
        }
        item.period = periodArray;
      });
      console.log("final room v-model:", roomTest);
    },
    /*
    send rooms to backend
    */
    saveRooms() {
      let finalList = {};
      roomTest.forEach((element) => {
        if (element.selected) {
          finalList[element.room] = element.period;
        }
      });
      console.log("rooms sent to BE:", finalList);
      axios
        .post(this.$IPBE + "/room_availability", finalList, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          console.log("success:", response);
          this.$bvToast.toast("Raumkapazitäten angepasst", {
            title: "Räume gespeichert!",
            autoHideDelay: 20000,
          });
        })
        .catch(function (error) {
          console.log("error:", error);
        });
    },
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
