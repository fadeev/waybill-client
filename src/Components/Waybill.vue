<template>
  <div class="main">
    <h1>
      <span>{{waybill.return ? 'Возвратная н' : 'Н'}}акладная №</span>
      <input type="text" v-model="waybill.serial_number" placeholder="Номер">
      <span>от</span>
      <input type="date" :value="waybill.original_date" @input="setOriginalDate" placeholder="Дата">
    </h1>
     <div class="options">
      <div>Контрагент</div>
      <div>
        <input type="text" v-model="waybill.supplier_name" @input="getSupplier" placeholder="Отправитель">
        <div v-if="!waybill.supplier_id && waybill.supplier_name" class="list">
          <a v-for="supplier in waybill.supplier_list" href="" @click.prevent="selectSupplier(supplier.supplier_id, supplier.name)">
            {{supplier.name}}
          </a>
          <a href="" @click.prevent="submitSupplier(waybill.supplier_name)">Создать поставщика "{{waybill.supplier_name}}"</a>          
        </div>
      </div>
    </div>
    <!-- <div class="options">
      <div>Контрагенты</div>
      <div style="display: inline-block">
        <input type="text" v-model="waybill.sender_name" @input="getSenderList" placeholder="Отправитель">
        <div v-if="!waybill.sender_id && waybill.sender_name" class="list">
          <a v-for="sender in waybill.sender_list" href="" @click.prevent="selectSender(sender.organization_id, sender.name)">
            {{sender.name}}
          </a>
          <a href="" @click.prevent="submitSender(waybill.sender_name)">Создать контрагента "{{waybill.sender_name}}"</a>
        </div>
        ➜
        <div style="display: inline-block">
          <input type="text" v-model="waybill.receiver_name" @input="getReceiverList" placeholder="Получатель">
          <div v-if="!waybill.receiver_id && waybill.receiver_name" class="list">
            <a v-for="receiver in waybill.receiver_list" href="" @click.prevent="selectReceiver(receiver.organization_id, receiver.name)">
              {{receiver.name}}
            </a>
            <a href="" @click.prevent="submitReceiver(waybill.receiver_name)">Создать контрагента "{{waybill.receiver_name}}"</a>
          </div>
        </div>
      </div>
    </div> -->
    <!-- <div class="options">
      <div>Возврат</div>
      <div>
        <label>
          <input type="checkbox" v-model="waybill.return">
          <span>{{waybill.return ? 'Да' : 'Нет'}}</span>
        </label>
      </div>
    </div> -->
    <div class="options">
      <div>Наценка</div>
      <div>
        <input type="text" v-model.number="waybill.markup" @input="computeSalePriceForEach" placeholder="Наценка">
        <span>%</span>
      </div>
    </div> 
    <div class="table stretch">
      <div class="header">
        <div class="text">Наименование</div>
        <div class="number">Количество</div>
        <div class="number">Единицы</div>
        <div class="number">Цена закупки</div>
        <div class="number">Цена продажи</div>
        <div class="number">Сумма закупки</div>
        <div class="narrow"></div>
      </div>
      <!-- <div class="header">
        <div class="text"></div>
        <div class="number"></div>
        <div class="number"></div>
        <div class="number"></div>
        <div class="number"><input type="text" v-model.number="waybill.markup" @input="computeSalePriceForEach" placeholder="Наценка"></div>
        <div class="number"></div>
        <div class="narrow"></div>
      </div> -->
      <div v-for="(s, index) in shipment">
        <div class="text">
          <input type="text" v-model="s.name">
        </div>
        <div class="number">
          <input type="number" v-model.number="s.quantity" v-focus>
          <!--<input type="number" v-model.number="s.quantity" @input="computeSalePrice(s)" v-focus>-->
        </div>
        <div class="number">
          <select v-model="s.unit" tabindex="-1">
            <option value="1">кг</option>
            <option value="2">шт.</option>
          </select>
        </div>
        <div class="number">
          <span>{{(s.cost_total / s.quantity).toFixed(2)}}</span>
        </div>
        <div class="number">
          <input type="number" v-model.number="s.sale_price" tabindex="-1">
        </div>
        <div class="number">
          <input type="number" v-model.number="s.cost_total" @input="computeSalePrice(s)">
        </div>
        <div class="narrow">
          <a class="delete" href="" @click.prevent="shipment.splice(index, 1)" tabindex="-1">✖</a>
        </div>
      </div>
      <div>
        <div class="text"><product-search @selected="pushProduct"></product-search></div>
        <div class="number"></div>
        <div class="number"></div>
        <div class="number"></div>
        <div class="number"></div>
        <div class="number"><span v-if="total">{{total}}</span></div>
        <div class="narrow"></div>
      </div>
    </div>
    <!-- <div><product-search @selected="pushProduct"></product-search></div> -->
    <div class="actions" style="display: flex; align-items: center;">
      <button @click='waybill_success ? submitWaybill(waybill, shipment) : false' :disabled="!waybill_success">
        <span>{{waybill.waybill_id ? 'Сохранить накладную' : 'Создать новую накладную'}}</span>
        <!-- <transition name="fade">
          <svg v-if="waybill_success" fill="black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M0 11.386l1.17-1.206c1.951.522 5.313 1.731 8.33 3.597 3.175-4.177 9.582-9.398 13.456-11.777l1.044 1.073-14 18.927-10-10.614z"/></svg>
        </transition> -->
      </button>
      <!-- <div class="scss" v-if="waybill_success">
        <svg xmlns="http://www.w3.org/2000/svg" fill="rgb(14,122,254)" width="30" height="30" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12"/></svg>
        <svg class="check" fill="white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M0 11.386l1.17-1.206c1.951.522 5.313 1.731 8.33 3.597 3.175-4.177 9.582-9.398 13.456-11.777l1.044 1.073-14 18.927-10-10.614z"/></svg>
      </div> -->
      <!-- <button>Добавить оплату</button> -->
      <!-- <button class="danger" @click.prevent="deleteWaybillById(id)">Удалить накладную</button>   -->
    </div>
    <div class="payment" v-if="!waybill.return && id != 'new'">
      <h1>Платежи по накладной</h1>
      <div style="margin-bottom: 5px" v-for="payment in paymentList">
        <input type="number" v-model="payment.amount" disabled>
        от
        <input type="date" v-model="payment.created_at" disabled>
        <!-- <label>
          <input type="radio" v-model="payment.method" value="0" disabled>
          Наличные
        </label>
        <label>
          <input type="radio" v-model="payment.method" value="1" disabled>
          Банк
        </label> -->
        <a href="" class="delete" @click.prevent="deletePayment(payment.payment_id)">✖</a>
      </div>
      <div>
        <input type="number" placeholder="Сумма" v-model="payment.amount">
        от
        <input type="date" v-model="payment.created_at">
        <!-- <label>
          <input type="radio" v-model="payment.method" value="0">
          Наличные
        </label>
        <label>
          <input type="radio" v-model="payment.method" value="1">
          Банк
        </label> -->
        <button @click.prevent="submitPayment">Добавить платеж</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  button[disabled] { opacity: .3; }
  .main { margin-bottom: 100px; }
  h1 { line-height: 2em; }
  h1 input { width: 14rem; }
  .options { display: flex; margin: 1rem 0; align-items: baseline; }
  .options *:first-child { flex-basis: 15%; }
  .drop { position: absolute; margin-top: .5rem; background: white; box-shadow: 0 10px 20px -5px rgba(0,0,0,.15); border-radius: 3px; margin-bottom: 3rem; border: 1px solid rgba(0,0,0,.15); padding: .5rem; }
  .list { position: absolute; margin-top: .5rem; background: white; box-shadow: 0 10px 20px -5px rgba(0,0,0,.15); border-radius: 3px; margin-bottom: 3rem; }
  .list > *:first-child { border-top-left-radius: 3px; border-top-right-radius: 3px; border-top: 1px solid rgba(0,0,0,.15); }
  .list > *:last-child { border-bottom-left-radius: 3px; border-bottom-right-radius: 3px; border-bottom: 1px solid rgba(0,0,0,.15); }
  .list a { padding: .5rem; display: block; border-left: 1px solid rgba(0,0,0,.15); border-right: 1px solid rgba(0,0,0,.15); }
  .list a:hover, .list a:focus { background: linear-gradient(to bottom, rgb(14,122,254), rgb(14,82,254)); color: white; text-decoration: none; outline: none; }
  .success { color: green; }
  .gray { color: rgba(0,0,0,.3); }
  .fade-enter-active { animation: fade-in .2s; }
  .payment { margin-top: 30px; }
   @keyframes fade-in {
     from { transform: scale(.5); }
     75% { transform: scale(1.1); }
     to { transform: scale(1); }
   }
   button { display: inline-flex; align-items: center; }
   button svg { padding: 0 0 0 8px; }
   button:active svg { fill: white; }
   div.actions { margin: 20px 0; display: flex; align-items: center; }

  .tb > * > * { padding-left: 0; flex-grow: 1; }
</style>

<script>
  import axios from 'axios';
  import forEach from 'lodash/forEach';
  import ProductSearch from './ProductSearch.vue'

  export default {
    props: ['id'],
    components: { ProductSearch },
    data: () => ({
      waybill: {
        waybill_id: null,
        serial_number: null,
        original_date: null,
        supplier_id: null,
        supplier_name: null,
        supplier_list: null,
        markup: null,
        return: null,
        // sender_id: null,
        // sender_name: null,
        // sender_list: null,
        // receiver_id: null,
        // receiver_name: null,
        // receiver_list: null,
      },
      shipment: [],
      waybill_success: true,
      paymentList: [],
      payment: {
        amount: null,
        created_at: null,
        method: null,
      },
    }),
    mounted() {
      this.getWaybillById(this.id)
    },
    watch: {
      id() {
        this.getWaybillById(this.id)
      }
    },
    directives: {
      focus: {
        inserted: function (el) {
          el.focus();
       }
      }
    },
    computed: {
      total: function () {
        try {
          return this.shipment.reduce((sum, e) => sum + e.cost_total, 0).toFixed(2)
        }
        catch (e) {
          return 0;
        }
      }
    },
    methods: {
      computeSalePriceForEach() {
        forEach(this.shipment, this.computeSalePrice)
      },
      computeSalePrice(s) {
        s.sale_price = (s.cost_total * (100 + this.waybill.markup) / (100 * s.quantity)).toFixed()
      },
      getSupplier(e) {
        this.waybill.supplier_id = null;
        let name = e.target.value;
        if (name === "") this.waybill.supplier_list = null
        axios.get(`${URL}/supplier?search=${name}`)
             .then(({data: {data: {supplier}}}) => {
               this.waybill.supplier_list = supplier
             })
             .catch(error => console.log(error));
      },
      selectSupplier(id, name) {
        this.waybill.supplier_id = id;
        this.waybill.supplier_name = name;
        this.waybill.supplier_list = null;
      },
      deleteWaybillById(id) {
        this.$store.dispatch('deleteWaybillById', {id: id, router: this.$router})
      },
      resetFields() {
        Object.assign(this.$data, this.$options.data());
      },
      getWaybillById(id) {
        if (this.id === 'new') return this.resetFields();
        axios.get(`${URL}/waybill/${id}`)
             .then(({data: {data: {waybill, shipment, payment}}}) => {
               this.resetFields();
               this.waybill = Object.assign(this.waybill, waybill)
               this.shipment = shipment || []
               this.paymentList = payment || []
              })
             .catch(error => this.resetFields());
      },
      submitSupplier(name) {
        axios.post(`${URL}/supplier`, {supplier: {name: name}})
             .then(({data: {data: {supplier: {supplier_id, name}}}}) => {
               this.selectSupplier(supplier_id, name)
             })
             .catch(error => console.log(error))
      },
      submitWaybill(waybill, shipment) {
        shipment = shipment || [];
        this.waybill_success = null;
        this.$store.dispatch('postWaybill', {waybill, shipment, router: this.$router})
          .then(data => {
            this.waybill_success = true;
            // setTimeout(() => {
            //   this.waybill_success = null;
            // }, 5000)
          })
          .catch(error => console.log('error'))
      },
      setOriginalDate(e) {
        let date = e.target.value
        this.waybill.original_date = (date === "" ? null : date)
      },
      pushProduct(product) {
        this.shipment.push(product)
      },
      getPayment(id) {
        axios.get(`${URL}/payment?id=${id}`)
          .then(({data: {data: {payment}}}) => {
            this.paymentList = payment;
            Object.assign(this.$data.payment, this.$options.data().payment);
          })
      },
      deletePayment(id) {
        axios.delete(`${URL}/payment/${id}`)
          .then(({data}) => {
            this.getPayment(this.id)
            this.$store.dispatch('getWaybillList')
          })
      },
      submitPayment() {
        let payment = Object.assign(this.payment, {waybill_id: this.id})
        axios.post(`${URL}/payment`, {payment: payment})
          .then(({data}) => {
            this.getPayment(this.id)
            this.$store.dispatch('getWaybillList')
          })
      },
      // getSenderList(e) {
      //   this.waybill.sender_id = null;
      //   let name = e.target.value;
      //   if (name === "") this.waybill.sender_list = null
      //   axios.get(`${URL}/organization?search=${name}`)
      //     .then(({data: {data: {organization}}}) => {
      //       this.waybill.sender_list = organization
      //     })
      //     .catch(error => console.log(error))
      // },
      // submitSender(name) {
      //   axios.post(`${URL}/organization`, {organization: {name: name}})
      //     .then(({data: {data: {organization: {organization_id, name}}}}) => {
      //       this.selectSender(organization_id, name)
      //     })
      //     .catch(error => console.log(error))
      // },
      // selectSender(id, name) {
      //   this.waybill.sender_id = id;
      //   this.waybill.sender_name = name;
      //   this.waybill.sender_list = null;
      // },
      // getReceiverList(e) {
      //   this.waybill.receiver_id = null;
      //   let name = e.target.value;
      //   if (name === "") this.waybill.receiver_list = null
      //   axios.get(`${URL}/organization?search=${name}`)
      //     .then(({data: {data: {organization}}}) => {
      //       this.waybill.receiver_list = organization
      //     })
      //     .catch(error => console.log(error))
      // },
      // submitReceiver(name) {
      //   axios.post(`${URL}/organization`, {organization: {name: name}})
      //     .then(({data: {data: {organization: {organization_id, name}}}}) => {
      //       this.selectReceiver(organization_id, name)
      //     })
      //     .catch(error => console.log(error))
      // },
      // selectReceiver(id, name) {
      //   this.waybill.receiver_id = id;
      //   this.waybill.receiver_name = name;
      //   this.waybill.receiver_list = null;
      // },
    },
  }
</script>