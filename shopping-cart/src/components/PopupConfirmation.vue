<script setup lang="ts">

import Swal from 'sweetalert2';

import { formatCurrency } from "./useUtils";

import { sendProductOrder } from "./useFetch";

import type { productOnCartType } from "../types/types";

import IconRemoveItem from "./icons/IconRemoveItem.vue";
import { ref } from "vue";

let sendLoading = ref(false);

type SweetAlertIcon = 'success' | 'error' | 'warning' | 'info' | 'question';

const props = defineProps<{ productOnCart: productOnCartType[], counts: { [id: string]: number }, totalPrices: string }>();
const emit = defineEmits(['closePopup']);

const toTelegramAPI = () => {
    sendLoading.value = true;
    sendProductOrder(props.productOnCart, props.counts).then(res => {
        return res.json();
    }).then(() => {
        sendLoading.value = false;
        popupMessageInfo();
        emit("closePopup", true);
    }).catch((err) => {
        sendLoading.value = false;
        popupMessageInfo("error", "Failed to Send");
        console.log("error", err);
    })
}

const popupMessageInfo = (type: SweetAlertIcon = "success", message: string = "Successfully Sent") => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: type,
        title: message
    });
}

</script>
<template>
    <div class="confirmation-wrapper">
        <div class="confirmed-container">
            <IconRemoveItem class="close-btn" @click="$emit('closePopup')" />
            <div class="confirmation-content">
                <img src="../assets/images/icon-order-confirmed.svg" class="confirmed-icon" alt="icon-checklist-green">
                <div class="title-info-wrapper">
                    <h2>Order Confirmed</h2>
                    <p>We hope you enjoy your food!</p>
                </div>
                <div class="products-list">
                    <template v-for="product of productOnCart">
                        <section class="product-on-cart-wrapper">
                            <div class="product-on-cart">
                                <h4>{{ product['name'] }}</h4>
                                <div class="product-cart">
                                    <span class="quantity">{{ counts[product['id']] }}x</span>
                                    <p class="original-price">{{ formatCurrency(product['price']) }}</p>
                                </div>
                            </div>
                            <p class="total-price">{{ formatCurrency(product['price'] * counts[product['id']]) }}
                            </p>
                        </section>
                    </template>
                    <div class="all-total-price">
                        <span>Order Total</span>
                        <h3>{{ totalPrices }}</h3>
                    </div>
                </div>
                <div class="footer-confirmed-wrapper">
                    <template v-if="sendLoading">
                        <button class="order-btn loading">Loading...</button>
                    </template>
                    <template v-else>
                        <button class="order-btn" @click="toTelegramAPI()">Confirmed</button>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.confirmed-container {
    position: relative;
    display: flex;
    width: 100%;
    max-width: 35rem;
    justify-content: center;
    align-items: flex-start;
    gap: 1rem;
    flex-direction: row-reverse;
}

.close-btn {
    fill: #fff;
    border-color: #fff;
}

.loading {
    opacity: .7;
    cursor: progress;
}

.products-list {
    background-color: var(--Rose-50);
    padding: 0 2rem;
}

.confirmed-icon {
    margin: 1rem 0;
}

.title-info-wrapper p {
    font-size: .8rem;
    color: var(--Rose-500);
}

.confirmation-content .title-info-wrapper {
    margin-bottom: 1rem;
}

.confirmation-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.39);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    overflow: hidden;
}

.confirmation-wrapper .confirmation-content {
    background-color: #fff;
    padding: 1rem;
    border-radius: 10px;
    width: 100%;
}

/* product total price */

.all-total-price {
    padding-bottom: 1rem;
    margin: 1.2rem 0;
}

.footer-confirmed-wrapper {
    margin-top: 2rem;
}

@media screen and (max-width: 800px) {
    .confirmed-container {
        flex-direction: column;
        align-items: center;
        max-width: 100%;
        height: 100%;
    }
}

@media screen and (max-width: 600px) {
    .confirmed-container {
        justify-content: flex-end;
    }

    .confirmation-wrapper .confirmation-content {
        padding: 3rem 1rem;
    }

    .title-info-wrapper h2 {
        font-size: 2rem;
    }

    .title-info-wrapper p {
        font-size: 1.5rem;
    }
}
</style>