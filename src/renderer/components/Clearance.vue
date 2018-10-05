<template>
  <section class="cart-page">
    <div class="heading">
      <img class="logo" src="../../../static/img/vianderito-text.png">
    </div>

    <div class="cart-content">
      <div class="columns is-centered">
        <div class="column is-4">
          <div class="box">
            <figure class="image is-128x128 clear-indicator" v-if="isCleared" @click="test">
              <img class="check" src="../../../static/img/green-check.png">
            </figure>

            <figure class="image is-128x128 clear-indicator" v-if="!isCleared">
              <img class="check" src="../../../static/img/red-cross.png">
            </figure>

            <button class="button is-medium is-danger is-fullwidth"
              v-show="!isCleared" @click="disarm">Disarm</button>
          </div>
        </div>
      </div>
    </div>

    <audio ref="alarm" :src="alarm" loop></audio>
  </section>
</template>

<style lang="scss" scoped>
  .cart-page {
    background: #222;
    height: 100vh;

    display: flex;
    flex-direction: column;
    flex-flow: column;
  }

  .heading {
    height: 15vh;
    text-align: center;

    .logo {
      height: 100%;
    }
  }

  .cart-content {
    flex: 1;
    padding: 1rem;
    padding-top: 5rem;
  }

  .clear-indicator {
    margin: 0 auto;
  }
</style>

<script>
  import fs from 'fs'
  import path from 'path'

  export default {
    data () {
      return {
        isCleared: true
      }
    },

    computed: {
      alarm () {
        return path.join(__static, '/audio/alarm.ogg')
      }
    },

    mounted () {
      this.$general.listen('.tag.receive', epcs => this.checkEpcs(epcs))
    },

    watch: {
      isCleared (value) {
        if (!value) {
          this.$refs.alarm.play()
          
          return
        }

        this.$refs.alarm.pause()
      }
    },

    methods: {
      checkEpcs (epcs) {
        if (!this.isCleared) return

        this.$http.post('/clearance', epcs)
          .then(response => {
            let hasUnclear = response.data.find(e => !e.status)

            this.isCleared = hasUnclear === undefined
          })
      },

      disarm () {
        this.isCleared = true
      },

      test () {
        this.isCleared = false
      }
    }
  }
</script>
