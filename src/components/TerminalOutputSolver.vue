<template>
<div>
  <div class="console" v-html="html">
  </div>
  <p />
<!--
  <div>
  <b-button @click="startIntervall()">Start</b-button>
  <b-button @click="stopIntervall()">Stop</b-button>
  </div>
!-->
</div>
</template>

<script>
import axios from "axios";
import AnsiUp from 'ansi_up'

export default {
  name: 'shell',
  props: ['socket'],
  data () {
    return {
      ansi: undefined,
      content: "Solver is ready to start..."
    }
  },
  computed: {
    html () {
      // Ensures we have some semblance of lines
     return this.ansi.ansi_to_html(this.content).replace(/\,/gm, '<br>')
    }
    
  },
  methods: {
    getData() {
      let token = ""
      axios.post(this.$IPBE + "/login", {
        name: this.$NAME,
        password: this.$PW
      })
      .then(response => {
        this.token = response.data.token
        axios.get(this.$IPBE + "/solver_output", {
          headers: {
          "Authorization": `Bearer ${this.token}`
        }})
        .then(res => {
        this.content = JSON.stringify(res.data.list);
        console.log(JSON.stringify(res.data));
        })
        .catch(error => {
          console.log(error)
        })
      })
    },
    startIntervall () {
      this.getData()
      this.interval = setInterval(() => this.getData(), 5000);
    },
    stopIntervall() {
     clearInterval(this.interval);
    }
  },
  watch: {
    socket () {
      this.socket.on('data', data => {
        this.content += data
      })
      this.socket.send('ready')
    }
  },
  beforeMount () {
    this.ansi = new AnsiUp()
  },
  updated () {
    // auto-scroll to the bottom when the DOM is updated
    this.$el.scrollTop = this.$el.scrollHeight
  }
}
</script>

<style lang="scss" scoped>
.console {
  font-family: monospace;
  text-align: left;
  background-color: black;
  color: #fff;
  overflow-y: auto;
  max-width: 50%;
}
</style>
