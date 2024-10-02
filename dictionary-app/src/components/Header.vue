<script setup lang="ts">
import IconCommunity from './icons/IconBook.vue';
import IconChevDown from './icons/IconChevDown.vue';

import { ref } from "vue";

let open = ref(false);
let types = ref('Sans-Serif');
let changePos = ref('light');

let res = ref('');
let dataStore = ref({ 'mode': changePos.value, "font": types.value });

// dark mode toggle
let toggle = () => {
    document.documentElement.classList.toggle('dark');
    if (changePos.value == 'light') {
        changePos.value = 'dark';
    } else {
        changePos.value = 'light';
    }

    updateStorage();
    localStorage.setItem('styles', JSON.stringify(dataStore.value));

};

// font selection toggle w/ dropdown

function dropdown() {
    open.value = !open.value;
}

function fontToggle(this: any, val: string) {
    let res = document.querySelector("body");
    if (res) {
        if (val == "Sans-Serif") {
            res.style.fontFamily = 'Montserrat';
        } else {
            res.style.fontFamily = 'Courier New';
        }
        types.value = val;

        updateStorage();
        localStorage.setItem('styles', JSON.stringify(dataStore.value));
    }
}

// local storage
updateStorage();

// initial Local Storage
if (localStorage.getItem('styles')) {
    let localS = JSON.parse((localStorage.getItem("styles") || ''));
    types.value = localS.font;
    changePos.value = localS.mode;

    let theme = document.documentElement.classList;
    if (changePos.value == 'dark') {
        theme.add('dark');
    } else {
        theme.remove('dark');
    }
    fontToggle(types.value);
} else {
    localStorage.setItem('styles', JSON.stringify(dataStore.value));
}

function updateStorage() {
    dataStore.value = {
        'mode': changePos.value,
        'font': types.value
    }
}

</script>
<template>
    <div class="body">
        <IconCommunity />
        <div class="right-wrapper">
            <div class="dropdown">
                <div class="dropdown-wrapper" v-on:click="dropdown()">
                    <p>{{ types }}</p>
                    <IconChevDown />
                </div>
                <div class="dropdown-result-wrapper" v-if="open">
                    <p v-on:click="fontToggle('Serif'), dropdown()">Serif</p>
                    <p v-on:click="fontToggle('Sans-Serif'), dropdown()">Sans-Serif</p>
                </div>
            </div>
            <span class="border"></span>
            <div class="toggle-wrapper" v-on:click="toggle">
                <span class="toggle" :class="changePos"></span>
            </div>
        </div>
    </div>
</template>
<style scoped>
.body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--primary-soft);
    padding: 1rem 2rem;
    border-radius: 2rem;
}

.right-wrapper {
    display: flex;
    align-items: center;
    gap: 2rem;
    color: var(--secondary);
}

.dropdown {
    position: relative;
}

.dropdown-wrapper {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: .5rem;
}

.dropdown-result-wrapper {
    position: absolute;
    left: -1rem;
    top: 3rem;
    right: 0;
    width: max-content;
    background-color: var(--bg);
    z-index: 2;
    padding: .5rem;
    border-radius: calc(5px + .5rem);
    border: 1px solid var(--primary);
    box-shadow: 1px 1px 10px var(--primary);
    text-align: left;
}

.dropdown-result-wrapper p {
    margin: .1rem 0;
    padding: 2px 10px;
    border-radius: 5px
}

.dropdown-result-wrapper p:hover {
    background-color: var(--tertiery-soft);
    cursor: pointer;
}

.border {
    width: 1px;
    height: 1rem;
    background-color: var(--primary-mute);
}

.font {
    font-size: 1rem;
    background: transparent;
    border: none;
    outline: none;
    width: max-content;
}

.toggle-wrapper {
    position: relative;
    background-color: var(--secondary-soft);
    width: 4rem;
    height: 2rem;
    border-radius: 10rem;
    cursor: pointer;
}

.toggle-wrapper .toggle {
    background-color: var(--primary);
    position: absolute;
    top: .3rem;
    border-radius: 10rem;
    width: 1.4rem;
    height: 1.4rem;
    /* transition: all 2s ease-in-out; */
}

.light {
    left: .3rem;
}

.dark {
    right: .3rem;
}
</style>