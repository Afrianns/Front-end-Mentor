<script setup lang="ts">

import products from "../data/data.json";

import productCart from "./components/ProductOnCart.vue";
import { countTotalPrice, formatCurrency } from "./components/useUtils";

import IconIncrementQuantity from "./components/icons/IconIncrementQuantity.vue";
import IconDecrementQuantity from "./components/icons/IconDecrementQuantity.vue";

import PopupConfirmation from "./components/PopupConfirmation.vue";

import { reactive, ref, watch } from 'vue';

import type { productOnCartType, imagesType } from "./types/types";

const productOnCart = ref<productOnCartType[]>([]);
const showPopup = ref(false);
const counts = reactive<{ [a: string]: number }>({});

const totalProductsPrice = ref("0");

const productsImage = import.meta.glob('./assets/images/*.jpg', {
  import: 'default',
  eager: true
}) as imagesType

const addToCart = (id: number) => {
  products.forEach((product) => {
    if (product['id'] == id) {
      counts[id] = 1;
      productOnCart.value.push(product);
    }
  })
}

const checkIfCarted = (id: number) => {
  let result = false;
  productOnCart.value.forEach((product) => {
    if (product.id == id) {
      result = true;
    }
  })
  return result;
}


watch(counts,
  () => {
    totalProductsPrice.value = formatCurrency(countTotalPrice(productOnCart.value, counts))
  })

const removeFromCart = (id: number) => {
  productOnCart.value = productOnCart.value.filter((product) => product['id'] !== id);
}

const confirmedOrder = () => {
  showPopup.value = true;
}

const closeOrder = (completed: boolean = false) => {
  showPopup.value = false;
  if (completed) {
    productOnCart.value = [];
  }
}
</script>

<template>
  <main class="container">
    <div class="contents-wrapper">
      <h1>Desserts</h1>
      <div class="products-list">
        <template v-for="product of products">
          <section class="product-wrapper">
            <div class="product">
              <div class="product-img-frame" :class="{ 'active-border-img': checkIfCarted(product['id']) }">
                <img :src="productsImage[`${product['image']['desktop']}`]" alt="thumbnail" class="product-img">

              </div>

              <div class="wrapper">
                <template v-if="checkIfCarted(product['id'])">
                  <span class="add-cart active-add-chart">
                    <IconDecrementQuantity @click="counts[product['id']]--" v-show="counts[product['id']] > 1" />
                    <span class="gap" v-show="counts[product['id']] <= 1"></span>
                    <p>{{ counts[product['id']] }}</p>
                    <IconIncrementQuantity @click="counts[product['id']]++" v-show="counts[product['id']] < 10" />
                    <span class="gap" v-show="counts[product['id']] >= 10"></span>
                  </span>
                </template>
                <template v-else>
                  <span class="add-cart" @click="addToCart(product['id'])">
                    <img src="./assets/images/icon-add-to-cart.svg" width="20" height="20" alt="">
                    <p class="add-cart-text">Add to Cart</p>
                  </span>
                </template>
              </div>
            </div>
            <div class="product-info-wrapper">
              <span class="type">{{ product['category'] }}</span>
              <h3 class="title">{{ product['name'] }}</h3>
              <p class="price">{{ formatCurrency(product['price']) }}</p>
            </div>
          </section>
        </template>
      </div>
    </div>
    <div class="cart-wrapper">
      <productCart :productOnCart="productOnCart" :counts="counts" @removeFromCart="removeFromCart"
        @showPopup="confirmedOrder" :totalPrices="totalProductsPrice" />
    </div>
  </main>
  <PopupConfirmation :productOnCart="productOnCart" :counts="counts" :totalPrices="totalProductsPrice"
    @closePopup="closeOrder" v-show="showPopup" />
  <footer>
    <div class="attribution">
      Challenge by <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>.
      Coded by <a href="https://hanifna.vercel.app">Hanif Nanda Afrian</a>.
    </div>
  </footer>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  margin: 5rem 0;
}

.contents-wrapper h1 {
  margin-top: 0;
  font-weight: 700;
}


.contents-wrapper {
  grid-column: 1 / span 5;
  margin: 0 0 5rem;
}

.products-list {
  margin: 2rem 0 1rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
}

.cart-wrapper {
  grid-column: span 3;
}

/* each product content style */
.product {
  position: relative;
  margin-bottom: 1.5rem;
  padding: 0;
}

.product .product-img-frame {
  border-radius: 20px;
  overflow: hidden;
  border: 3px solid transparent;
}

.product .product-img-frame .product-img {
  width: 100%;
  height: 100%;
  display: block;
}

.wrapper {
  position: absolute;
  bottom: -1rem;
  left: 0;
  right: 0;
}

/* each add cart product */
.product .add-cart {
  background-color: var(--Rose-50);
  border: 1px solid var(--Rose-500);
  padding: .5rem;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5rem;
  margin: auto;
  height: 2rem;
  width: fit-content;
  cursor: pointer;
  padding: 1rem 2rem;
}

.product .add-cart:hover {
  border-color: var(--Red);
}

.product .add-cart p {
  font-size: .85rem;
  font-weight: 600;
}

.product .add-cart:hover .add-cart-text {
  color: var(--Red);
}

/* active when add to chart selected */

.product .active-border-img {
  border-color: var(--Red);
}

.product .active-add-chart {
  border: none;
  color: #fff;
  justify-content: space-between;
  width: 50%;
  padding: .5rem;
  background-color: var(--Red);
}

.product .active-add-chart img {
  border: 1px solid #fff;
  padding: 6px 6px;
  border-radius: 50px;
}

/* popup wrapper  */

/* each product information style*/
.product-info-wrapper {
  margin: 2rem 0;
}

.product-info-wrapper>* {
  margin: .2rem 0;
}

.product-wrapper .type {
  font-size: 1rem;
  font-weight: 400;
  color: var(--Rose-300);
}

.product-wrapper .title {
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--Rose-900);
}

.product-wrapper .price {
  font-size: 1rem;
  font-weight: 500;
  color: var(--Red);
}

@media screen and (max-width: 1200px) {
  .products-list {
    grid-template-columns: repeat(2, 1fr);
  }


  .contents-wrapper {
    margin: auto;
  }

  .contents-wrapper {
    grid-column: span 5;
  }

  .cart-wrapper {
    grid-column: span 3;
  }
}

@media screen and (max-width: 900px) {
  .container {
    grid-template-columns: 1fr;
    justify-content: center;
  }
}


@media screen and (max-width: 600px) {
  .products-list {
    grid-template-columns: 1fr;
  }

  .contents-wrapper {
    grid-column: 1;
  }

  .cart-wrapper {
    grid-column: 1;
  }
}
</style>
