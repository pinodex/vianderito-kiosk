<template>
  <section class="cart-page">
    <div class="heading">
      <img class="logo" src="/static/img/vianderito-text.png">
    </div>

    <div class="columns is-marginless cart-content">
      <div class="column is-9">
        <div class="cart-table-container">
          <table class="table is-fullwidth">
            <thead>
              <tr>
                <th class="is-fit"></th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in items">
                <td>
                  <figure class="image is-48x48">
                    <img :src="item.product.picture.thumbnail">
                  </figure>
                </td>

                <td>{{ item.product.name }}</td>

                <td>{{ item.product.front_inventory.price | currency('₱') }}</td>

                <td>{{ item.quantity }}</td>

                <td>{{ item.subtotal | currency('₱') }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="column">
        <div class="cart-sidebar-container">
          <div class="qr-display">
            <p>Please scan the QR code below with your Vianderito app</p>

            <figure>
              <img src="/static/img/sample-qr.png">
            </figure>
          </div>

          <div class="total-display">
            <p class="is-size-5">Total Amount</p>

            <p class="is-size-2">
              {{ totalAmount | currency('₱') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .cart-page {
    background: url(/static/img/background.jpg);
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;

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
  }

  .cart-table-container,
  .cart-sidebar-container {
    border-radius: 5px;
    background: #fff;
    height: 100%;
  }

  .cart-table-container {
    overflow-y: scroll;

    .table {
      background: #fff;
    }
  }

  .cart-sidebar-container {
    display: flex;
    flex-direction: column;
    flex-flow: column;
    padding: 1rem;

    .qr-display {
      flex: 1;

      display: flex;
      flex-direction: column;
      justify-content: center;

      text-align: center;
    }

    .total-display {
      height: 90px;
      text-align: right;

      p {
        margin: 0;
      }
    }
  }
</style>

<script>
  export default {
    data () {
      return {
        items: []
      }
    },

    computed: {
      totalAmount () {
        let total = 0

        this.items.forEach(item => total += item.subtotal)

        return total
      }
    },

    mounted () {
      this.$kiosk.listen('.cart.update', items => this.items = items)
    }
  }
</script>
