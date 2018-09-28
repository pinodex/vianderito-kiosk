<template>
  <section class="cart-page">
    <div class="heading">
      <img class="logo" src="../../../static/img/vianderito-text-black.png">
    </div>

    <div class="cart-content">
      <div class="columns is-centered">
        <div class="column is-4">
          <div class="box has-text-centered">
            <figure class="image is-128x128 user-avatar-recognition" v-if="purchase">
              <img class="is-rounded" :src="purchase.user.picture.image">

              <img class="check" src="../../../static/img/green-check.png">
            </figure>

            <h1 class="title">Transaction Complete!</h1>
            
            <h2 class="subtitle">
              Thank you for buying with Vianderito
            </h2>

            <p>
              Please take out your purchased<br>goods out of the basket.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .cart-page {
    background: #fafafa;
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

  .user-avatar-recognition {
    margin: 0 auto;
    margin-bottom: 1rem;

    position: relative;

    .check {
      position: absolute;
      right: -20%;
      bottom: -20%;

      height: 128px;
      width: 128px;
    }
  }
</style>

<script>
  export default {
    props: {
      purchase: {
        type: Object
      }
    },

    mounted () {
      this.$kiosk.listen('.cart.update', items => {
        if (items.length == 0)
          this.$router.push({ name: 'index' })
      })
    }
  }
</script>
