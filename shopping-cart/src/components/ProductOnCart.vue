<script lang="ts" setup>
import IconEmptyCart from '../components/icons/IconEmptyCart.vue';
import IconRemoveItem from "./icons/IconRemoveItem.vue";

import { formatCurrency } from "./useUtils";
import type { productOnCartType } from "../types/types";

defineProps<{ productOnCart: productOnCartType[], counts: { [id: string]: number }, totalPrices: string }>();

</script>
<template>
    <div class="cart-wrapper">
        <h2>Your Cart ({{ productOnCart.length }})</h2>
        <template v-if="productOnCart.length > 0">
            <template v-for="product of productOnCart">
                <section class="product-on-cart-wrapper">
                    <div class="product-on-cart">
                        <h4>{{ product['name'] }}</h4>
                        <div class="product-cart">
                            <span class="quantity">{{ counts[product['id']] }}x</span>
                            <p class="original-price">{{ formatCurrency(product['price']) }}</p>
                            <p class="total-price">{{ formatCurrency(product['price'] * counts[product['id']]) }}</p>
                        </div>
                    </div>
                    <IconRemoveItem @click="$emit('removeFromCart', product['id'])" />
                </section>
            </template>
            <div class="footer-cart-info-wrapper">
                <div class="all-total-price">
                    <span>Order Total</span>
                    <h3>{{ totalPrices }}</h3>
                </div>
                <div class="carbon-neutral">
                    <img src="/assets/images/icon-carbon-neutral.svg" alt="">
                    <p>This is <strong>carbon-neutral</strong> delivery</p>
                </div>
                <button class="order-btn" @click="$emit('showPopup')">Confirm Order</button>
            </div>
        </template>
        <template v-else>
            <div class="cart-info-wrapper">
                <IconEmptyCart />
                <p>Your added items will appear here</p>
            </div>
        </template>
    </div>
</template>
<style scoped>
.cart-wrapper {
    background-color: var(--Rose-50);
    padding: 1rem 2rem;
    border-radius: 15px;
    width: 100%;
    margin: 0;
}

.cart-wrapper h2 {
    font-weight: 600;
    color: var(--Red);
    margin-bottom: 1rem;
}

.cart-info-wrapper {
    margin: 2rem 0 1rem;
    text-align: center;
}

.footer-cart-info-wrapper {
    margin: 2rem 0 0;
}

.footer-cart-info-wrapper>* {
    margin: 1rem 0;
}

/* Carbon-Neutral Info */

.carbon-neutral {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: .5rem;
    background-color: var(--Rose-100);
    padding: 1rem .5rem;
    border-radius: 10px;
}
</style>