<template>
  <div>
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
          <p v-for="supplier in waybill.supplier_list">
            <a href="" @click.prevent="selectSupplier(supplier.supplier_id, supplier.name)">{{supplier.name}}</a>
          </p>
          <p>
            <a href="" @click.prevent="submitSupplier(waybill.supplier_name)">Создать поставщика "{{waybill.supplier_name}}"</a>          
          </p>
        </div>
      </div>
    </div>
    <div class="options">
      <span>Наценка</span>
      <div>
        <input type="text" v-model.number="waybill.markup" @input="computeSalePriceForEach" placeholder="Наценка">
        <span>%</span>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Наименование</th>
          <th>Количество</th>
          <th>Цена закупки</th>
          <th>Цена продажи</th>
          <th>Сумма закупки</th>
          <th>Удалить?</th>
        </tr>
      </thead>
      <!--<tfoot>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>{{total}}</td>
        </tr>
      </tfoot>-->
      <tbody>
        <tr v-for="(s, index) in shipment">
          <td class="text"><input type="text" v-model="s.name"></td>
          <td><input type="number" v-model.number="s.quantity"></td>
          <td><input type="number" :value.number="s.cost_total / s.quantity" disabled></td>
          <td><input type="number" v-model.number="s.sale_price"></td>
          <td><input type="number" v-model.number="s.cost_total" @input="computeSalePrice(s)"></td>
          <td><button @click.prevent="shipment.splice(index, 1)">X</button></td>
        </tr>
      </tbody>
    </table>
    <div class="table">
      <div>
        <div>Наименование</div>
        <div>Количество</div>
        <div>Цена закупки</div>
        <div>Цена продажи</div>
        <div>Сумма закупки</div>
        <div>Удалить?</div>
      </div>
      <div v-for="(s, index) in shipment">
        <div><input type="text" v-model="s.name"></div>
        <div><input type="number" v-model.number="s.quantity"></div>
        <div><input type="number" v-model.number="s.sale_price"></div>
        <div><input type="number" v-model.number="s.sale_price"></div>
        <div><input type="number" v-model.number="s.cost_total" @input="computeSalePrice(s)"></div>
        <div><button @click.prevent="shipment.splice(index, 1)">X</button></div>
      </div>
    </div>
    <p>
      <span>Добавить товар:</span>
      <input type="text" v-model="waybill.product_name" @input="getProduct" placeholder="Наименование">
    </p>
    <div v-if="waybill.product_name" class="list">
      <div v-for="product in waybill.product_list">
        <a href="" @click.prevent="selectProduct(product.product_id)">{{product.name}}</a>
      </div>
      <p>
        <a href="" @click.prevent="submitProduct(waybill.product_name)">Создать товар "{{waybill.product_name}}"</a>
      </p>
    </div>
    <p>
      <button @click='submitWaybill(waybill, shipment)'>Save</button>
    </p>
    <!--<pre>{{waybill}}</pre>
    <pre>{{shipment}}</pre>-->
  </div>
</template>

<style scoped>
  h1 input { width: 14rem; }
  .options { display: flex; margin-bottom: 1rem; align-items: baseline; }
  .options *:first-child { flex-basis: 15%; }
  .list { position: absolute; background: white; }
  .table { display: flex; flex-flow: column nowrap; flex: 1 1 auto; }
  .table > * { display: flex; flex-flow: row nowrap; width: 100%; }
  .table > * > * { display: flex; flex-flow: row nowrap; flex-grow: 1; flex-basis: 0; min-width: 0px; padding: 0.1rem; }
  .table input { width: 100%; }
</style>

<script>
  import axios from 'axios';
  import merge from 'lodash/merge';
  import clone from 'lodash/clone';
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
      },
      shipment: [],
      shipmentBlueprint: {
        quantity: null,
        sale_price: null,
        cost_total: null,
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
    // computed: {
    //   total: function () {
    //     return this.waybill.shipment.reduce((sum, e) => sum + e.cost_total, 0);
    //   }
    // },
    methods: {
      setCostTotal(e, s) {
        s.cost_total = +e.target.value;
        s.sale_price = +s.cost_total * (100 + +this.waybill.markup) / (100 * +s.quantity)
      },
      computeSalePriceForEach() {
        forEach(this.shipment, this.computeSalePrice)
      },
      computeSalePrice(s) {
        s.sale_price = s.cost_total * (100 + this.waybill.markup) / (100 * s.quantity)
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
               merge(this.waybill, waybill)
               this.shipment = shipment
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
             .then(({data: {data: {product: {product_id, name}}}}) => {
               this.selectProduct(product_id)
             })
             .catch(error => console.log(error))        
      },
      submitWaybill(waybill, shipment) {
        this.$store.dispatch('submitWaybill', {waybill, shipment, router: this.$router})
          .then(data => console.log('success'))
          .catch(error => console.log('error'))
      },
      selectProduct(id) {
        this.waybill.product_name = null;
        this.waybill.product_list = null;
        axios.get(`${URL}/product/${id}`)
             .then(({data: {data: {product}}}) => {
               this.shipment.push(merge(clone(this.shipmentBlueprint), product))
             })
             .catch(error => console.log(error))
      },
      setOriginalDate(e) {
        let date = e.target.value
        this.waybill.original_date = (date === "" ? null : date)
      },
    },
  }
</script>