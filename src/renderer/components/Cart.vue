<template>
  <section class="cart-page">
    <div class="heading">
      <img class="logo" src="../../../static/img/vianderito-text.png">
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
            <template v-show="transactionId">
              <p>Please scan the QR code below with your Vianderito app</p>

              <figure ref="qr" class="image is-square"></figure>
            </template>
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
    background: url('../../../static/img/background.jpg');
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
  import qrcode from 'qrcode-generator'

  export default {
    data () {
      return {
        items: [],

        transactionId: null
      }
    },

    computed: {
      totalAmount () {
        let total = 0

        this.items.forEach(item => total += item.subtotal)

        return total
      }
    },

    watch: {
      transactionId (value) {
        let qr = qrcode(4, 'L')

        qr.addData(value)
        qr.make()

        this.$refs.qr.innerHTML = qr.createImgTag(16)
      }
    },

    mounted () {
      this.$kiosk.listen('.cart.update', items => {
        this.items = items

        this.setTransactionProducts()
      })

      this.$kiosk.listen('.transaction.new', () => this.newTransaction())

      this.$general.listen('.purchase.complete', purchase => {
        let params = { purchase }

        this.$router.push({ name: 'purchase_complete', params })
      })

      this.newTransaction();
    },

    methods: {
      newTransaction () {
        const loadingComponent = this.$loading.open()

        this.$http.post('/transactions')
          .then(response => {
            this.transactionId = response.data.id

            loadingComponent.close()
          })
      },

      setTransactionProducts () {
        let url = `/transactions/${this.transactionId}/products`,
            ids = this.items.map(item => {
              let product_id = item.product_id, quantity = item.quantity

              return { product_id, quantity }
            })

        this.$http.put(url, ids)
      }
    }
  }
</script>
