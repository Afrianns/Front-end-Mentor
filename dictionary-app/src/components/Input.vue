<script setup lang="ts">

import { ref } from 'vue';

const emit = defineEmits(['data', 'loadingData'])

let input = ref('');
let loadingData = ref(false);

async function calldata() {
    if (input.value) {
        loadingData.value = true;
        emit('loadingData', loadingData.value);
        await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + input.value)
            .then((res) => {
                return res.json();
            }).then((res) => {
                emit('data', res);
                input.value = '';
                loadingData.value = false;
                emit('loadingData', loadingData.value);
            }).catch(err => {
                console.log(err);
            })
    }
}

</script>
<template>
    <div class="body">
        <div class="search-wrapper">
            <form v-on:submit.prevent="calldata()">
                <input type="text" class="form" v-model="input">
                <button type="submit" class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path
                            d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z">
                        </path>
                    </svg>
                </button>
            </form>
        </div>
    </div>
</template>
<style scoped>
.search-wrapper {
    position: relative;
    width: 90%;
    height: 5rem;
    margin: auto;
    background-color: var(--primary-soft);
    border-radius: 1rem;
    border: 1px solid var(--primary-mute);
}

.search-wrapper .form {
    background: transparent;
    position: absolute;
    width: 95%;
    height: 100%;
    font-size: 2rem;
    padding: 0 1rem;
    outline: none;
    border: 0;
    left: 0;
    color: inherit;
    font-family: inherit;
}

.search-wrapper .icon {
    position: absolute;
    background-color: transparent;
    border: none;
    top: 1.5rem;
    right: 1.5rem;
    cursor: pointer;
    z-index: 5;
}

.search-wrapper .icon svg {
    fill: var(--tertiery);
}

@media screen and (max-width: 650px) {
    .search-wrapper {
        width: 100%;
        border-radius: .5rem;
    }
}
</style>