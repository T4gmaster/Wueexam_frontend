<template>
  <div class="console" v-html="html">
  </div>
</template>

<script>
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
      return this.ansi.ansi_to_html(this.content).replace(/\n/gm, '<br>')
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
}
</style>
