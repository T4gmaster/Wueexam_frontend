<template>
    <b-table :items="roomTest" :fields="roomsHeader" head-variant="light">
          <template v-slot:cell(selected)="row" >
            <b-checkbox v-model="row.item.selected"></b-checkbox>
    </template>
  <template #cell(actions)="row">
      <b-button @click="row.toggleDetails()" class="button" variant="primary"><i class="fa fa-wrench"></i>Kapazität einschränken</b-button>
  </template>
  <template v-slot:row-details="row">
    <table>
      <thead>
        <tr>
          <th>Datum</th>
          <th>08:00</th>
          <th>10:00</th>
          <th>12:00</th>
          <th>14:00</th>
          <th>16:00</th>
          <th>18:00</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, key) in row.item.period" :key="key">
          <td>
            {{ moment(key).locale('de').format('dddd, DD.MM.YYYY') }}
          </td>
          <!-- problem: v-model doesn't update when using object !-->
          <!-- solution: https://simonkollross.de/posts/vuejs-using-v-model-with-objects-for-custom-components !-->
          <td><input type="text" v-model="Object.values(value[0])"></td>
          <td><input type="text" v-model="Object.values(value[1])"></td>
          <td><input type="text" v-model="Object.values(value[2])"></td>
          <td><input type="text" v-model="Object.values(value[3])"></td>
          <td><input type="text" v-model="Object.values(value[4])"></td>
          <td><input type="text" v-model="Object.values(value[5])"></td>

        </tr>
      </tbody>
    </table>
    <b-button class="confirm" variant="success" @click="row.toggleDetails; saveRoomCalender()"><i class="fa fa-floppy-o"></i>Änderung speichern</b-button>
  </template>
</b-table>
</template>

<script>
export default {
    data() {
        return {
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
        }
    },
    props: [
        "roomTest",
        "examPeriod"
    ],
    methods: {
        saveRoomCalender() {
            console.log(this.roomsHeader)
            // ToDo post to BE
        }
    }
}
</script>