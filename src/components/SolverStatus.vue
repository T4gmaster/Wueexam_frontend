<template>
    <div>
        <p></p>
    <div class="text-center">
  <b-spinner style="width: 3rem; height: 3rem;" variant="primary" label="Text Centered"></b-spinner>
</div>
<p></p>
    <b-progress class="w-100" height="1rem">
    <b-progress-bar :label="`${progressstart}%`" :value="progressstart" :max="progressend"></b-progress-bar>
    </b-progress>
    <b-button @click="randomProgress">Fortschritt simulieren</b-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            progressstart: 30,
            progressend: 100,
        }
    },
    methods: {
        randomProgress() {
          this.progressstart = Math.random() * this.progressend
        }
    }
}
</script>