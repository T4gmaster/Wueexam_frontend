<template>
<div>
  <div>
    <router-link to=/solver tag="button" class="continue">Weiter</router-link>
  </div>
    <div>
    <label for="example-datepicker">Choose a date</label>
    <b-form-datepicker id="example-datepicker" v-model="value" class="mb-2"></b-form-datepicker>
    <p>Value: '{{ value }}'</p>
  </div>
</div>
</template>
<script>
export default {
    data() {
      return {
        value: ''
      }
    }
  }
</script>
<style>
.continue {
  float: right;
  height: 35px;
  width: 125px;
}
</style>
