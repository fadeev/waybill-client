<template>
  <div class="main">
    <h1>
      <span>Накладная №</span>
      <input type="text" v-model="waybill.serial_number" placeholder="Номер">
      <span>от</span>
      <input type="date" :value="waybill.original_date" @input="setOriginalDate" placeholder="Дата">
    </h1>
    <div class="options">
      <div>Поставщик</div>
      <div>
        <input type="text" v-model="waybill.supplier_name" @input="getSupplier" placeholder="Наименование">
        <div v-if="!waybill.supplier_id && waybill.supplier_name" class="list">
          <a v-for="supplier in waybill.supplier_list" href="" @click.prevent="selectSupplier(supplier.supplier_id, supplier.name)">
            {{supplier.name}}
          </a>
          <a href="" @click.prevent="submitSupplier(waybill.supplier_name)">Создать поставщика "{{waybill.supplier_name}}"</a>          
        </div>
      </div>
    </div>
    <div class="options">
      <div>Возвратная накладная</div>
      <div>
        <label>
          <input type="checkbox" v-model="waybill.return">
          <span>{{waybill.return ? 'Да' : 'Нет'}}</span>
        </label>
      </div>
    </div>
    <div class="options">
      <div>Наценка</div>
      <div>
        <input type="text" v-model.number="waybill.markup" @input="computeSalePriceForEach" placeholder="Наценка">
        <span>%</span>
      </div>
    </div>
    <div class="table" v-if="shipment && shipment.length > 0">
      <div class="header">
        <div class="text">Наименование</div>
        <div class="number">Количество</div>
        <div class="number">Ед. измерения</div>
        <div class="number">Цена закупки</div>
        <div class="number">Цена продажи</div>
        <div class="number">Сумма закупки</div>
        <div class="actions"></div>
      </div>
      <div v-for="(s, index) in shipment">
        <div class="text">
          <input type="text" v-model="s.name">
        </div>
        <div class="number">
          <input type="number" v-model.number="s.quantity" @input="computeSalePrice(s)" v-focus>
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
        <div class="actions">
          <a class="delete" href="" @click.prevent="shipment.splice(index, 1)" tabindex="-1">✖</a>
        </div>
      </div>
      <div>
        <div class="text"></div>
        <div class="number"></div>
        <div class="number"></div>
        <div class="number"></div>
        <div class="number"></div>
        <div class="number"><span v-if="total">Итого: {{total}}</span></div>
        <div class="actions"></div>
      </div>
    </div>
    <div>
      <input type="text" v-model="waybill.product_name" @input="getProduct" placeholder="Добавить наименование">
      <div v-if="waybill.product_name" class="list">
        <a v-for="product in waybill.product_list" href="" @click.prevent="selectProduct(product)">{{product.name}}</a>
        <a href="" @click.prevent="submitProduct(waybill.product_name)">Создать товар "{{waybill.product_name}}"</a>
      </div>
    </div>
    <p>
      <button @click='submitWaybill(waybill, shipment)'>
        <span>{{waybill.waybill_id ? 'Сохранить накладную' : 'Создать новую накладную'}}</span>
      </button>
      <button href="" @click.prevent="deleteWaybillById(id)">Удалить накладную</button>
      <transition name="fade">
        <span v-if="waybill_success" class="success">
          Накладная успешно сохранена
        </span>
      </transition>
    </p>
    <!--<pre>{{waybill}}</pre>
    <pre>{{shipment}}</pre>-->
  </div>
</template>

<style scoped>
  h1 { line-height: 2em; }
  h1 input { width: 14rem; }
  .options { display: flex; margin: 1rem 0; align-items: baseline; }
  .options *:first-child { flex-basis: 15%; }
  .list { position: absolute; margin-top: .5rem; background: white; box-shadow: 0 10px 20px -5px rgba(0,0,0,.15); border-radius: 3px; margin-bottom: 3rem; }
  .list > *:first-child { border-top-left-radius: 3px; border-top-right-radius: 3px; border-top: 1px solid rgba(0,0,0,.15); }
  .list > *:last-child { border-bottom-left-radius: 3px; border-bottom-right-radius: 3px; border-bottom: 1px solid rgba(0,0,0,.15); }
  .list a { padding: .5rem; display: block; border-left: 1px solid rgba(0,0,0,.15); border-right: 1px solid rgba(0,0,0,.15); }
  .list a:hover, .list a:focus { background: linear-gradient(to bottom, rgb(14,122,254), rgb(14,82,254)); color: white; text-decoration: none; outline: none; }
  .table { display: flex; flex-flow: column nowrap; flex: 1 1 auto; margin-bottom: 1rem; align-content: center; }
  .table > * { display: flex; flex-flow: row nowrap; width: 100; align-content: center; background: white; }
  .table > * > * { display: flex; flex-flow: row nowrap; flex-grow: 1; flex-basis: 0; min-width: 0px; padding: 0.2rem; justify-content: center; align-items: center; }
  .table > * > *:first-child { padding-left: 0; }
  .table .header { color: #ccc; }
  .table .text { flex-grow: 4; justify-content: flex-start; }
  .table .number { justify-content: flex-end; }
  .table .number input { text-align: right; }
  .table .actions { flex-grow: .2; }
  .table .actions a { text-decoration: none; }
  .table input, .table select { width: 100%; }
  .success { color: green; }
  .fade-enter, .fade-leave-to { opacity: 0; }
  .fade-enter-active, .fade-leave-active { transition: opacity .5s; }
  button { padding: .25rem .7rem; font-size: inherit; background: none; border-radius: 3px; ; border: 1px solid rgba(0,0,0,.15); }
  button:active { background: #fcfcfc; transform: scale(.99); }
  .success1::after { content: 'ok'; background: red; }
  .delete { color: rgba(0,0,0,.3); }
  .gray { color: rgba(0,0,0,.3); }
</style>

<script>
  import axios from 'axios';
  import forEach from 'lodash/forEach';

  export default {
    props: ['id'],
    data: () => ({
      waybill: {
        waybill_id: null,
        serial_number: null,
        original_date: null,
        supplier_id: null,
        supplier_name: null,
        supplier_list: null,
        markup: null,
        product_name: null,
        product_list: null,
        return: null,
      },
      shipment: [],
      waybill_success: null,
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
             .then(({data: {data: {supplier}}}) => this.waybill.supplier_list = supplier)
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
      getProduct(e) {
        let name = e.target.value;
        if (name === "") return this.waybill.product_list  = null;
        axios.get(`${URL}/product?search=${name}`)
             .then(({data: {data: {product}}}) => this.waybill.product_list = product)
             .catch(error => console.log(error));
      },
      resetFields() {
        Object.assign(this.$data, this.$options.data());
      },
      getWaybillById(id) {
        if (this.id === 'new') return this.resetFields();
        axios.get(`${URL}/waybill/${id}`)
             .then(({data: {data: {waybill, shipment}}}) => {
               this.resetFields();
               this.waybill = Object.assign(this.waybill, waybill)
               this.shipment = shipment || []
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
      submitProduct(name) {
        axios.post(`${URL}/product`, {product: {name: name}})
             .then(({data: {data: {product}}}) => {
               this.selectProduct(product)
             })
             .catch(error => console.log(error))        
      },
      submitWaybill(waybill, shipment) {
        shipment = shipment || [];
        this.$store.dispatch('postWaybill', {waybill, shipment, router: this.$router})
          .then(data => {
            this.waybill_success = true;
            setTimeout(() => {
              this.waybill_success = null;
            }, 5000)
          })
          .catch(error => console.log('error'))
      },
      selectProduct(product) {
        this.waybill.product_name = null;
        this.waybill.product_list = null;
        this.shipment.push(Object.assign({quantity: null, sale_price: null, cost_total: null}, product))
      },
      setOriginalDate(e) {
        let date = e.target.value
        this.waybill.original_date = (date === "" ? null : date)
      },
    },
  }
</script>