<script setup lang="ts">
import { ref } from 'vue';
defineProps(['data']);
const emit = defineEmits(['back']);

const goback = () => {
    emit('back');
}
const API_KEY = ref(import.meta.env.VITE_API_KEY);
</script>
<template>
    <div class="wrapper">
        <div class="back" @click="goback">
            <i class='bx bx-left-arrow-alt bx-sm'></i>
        </div>
        <h1>{{ data.name.official }}</h1>

        <div class="detail-wrapper">
            <img :src="data.flags.svg" :alt="data.flags.alt">
            <table class="table-wrapper">
                <tr v-if="data.capital.length > 0">
                    <th class="key">Capital</th>
                    <th class="value">:
                        <p v-for="item in data.capital" class="item-frame">
                            {{ item }}
                        </p>
                    </th>
                </tr>
                <tr>
                    <th class="key">Populations</th>
                    <th class="value">: {{ data.population.toLocaleString() }}</th>
                </tr>
                <tr>
                    <th class="key">Language</th>
                    <th class="value">:
                        <p v-for="item in data.languages" class="item-frame">
                            {{ item }}
                        </p>
                    </th>
                </tr>
                <tr>
                    <th class="key">Currencies</th>
                    <th class="value">:
                        <p v-for="item in data.currencies" class="currencies">
                            {{ item.name }} -- {{ item.symbol }}
                        </p>
                    </th>

                </tr>
                <tr>
                    <th class="key">Region</th>
                    <th class="value">: {{ data.region }}</th>

                </tr>
                <tr>
                    <th class="key">Subregion</th>

                    <th class="value">: {{ data.subregion }}</th>
                </tr>
                <tr>
                    <th class="key">Top Level Domain</th>
                    <th class="value">: {{ data.tld[0] }}</th>
                </tr>
                <tr v-if="data.borders.length > 0">
                    <th>Borders</th>
                    <th class="value">:
                        <p v-for="item in data.borders" class="item-frame">
                            {{ item }}
                        </p>
                    </th>
                </tr>
            </table>
        </div>
        <div class="map-wrapper">
            <iframe loading="lazy" height="450" allowfullscreen referrerpolicy="no-referrer-when-downgrade" :src="`https://www.google.com/maps/embed/v1/place?key=${API_KEY}
    &q=${data.name.common}`">
            </iframe>
        </div>
    </div>
</template>
<style scoped>
span {
    font-weight: bolder;
}

.table-wrapper {
    width: 100%;
}

tr {
    text-align: left;
    vertical-align: top;
}

.key {
    width: 40%;
    padding-right: 1rem;
}

.currencies {
    display: inline-block;
}

.items-wrapper {
    font-weight: 500;
    font-size: 1rem;
}

.detail-item {
    padding: 5px 6px;
}


h1 {
    text-align: center;
    margin-top: 8rem;
}

.wrapper {
    width: 100%;
}

.detail-wrapper img {
    width: 50%;
}

.detail-wrapper {
    margin-top: 3rem;
    display: flex;
    justify-content: center;
    gap: 2rem;
    align-items: center;
}

.map-wrapper {
    margin: 2rem 0;
    padding: 0;
}

.map-wrapper iframe {
    width: 100%;
    border: .1px solid black;
    border-bottom: 5px solid;
    border-right: 5px solid;
    border-color: black;
}

.back {
    position: absolute;
    margin: 3rem 0;
    cursor: pointer;
    width: fit-content;
    padding: .5rem 1.5rem;
    background-color: var(--secondary-bg);
    border: .1px solid var(--tertiery-bg);
    border-bottom: 5px solid black;
    border-right: 5px solid black;
}

.back:hover {
    transform: translate(5px, 5px);
    border-bottom: .1px solid black;
    border-right: .1px solid black;
}

@media screen and (max-width: 790px) {
    .detail-wrapper{
        flex-direction: column;
    }

    .table-wrapper{
        margin: auto;
    }
}

@media screen and (max-width: 600px) {
    .detail-wrapper img{
        width: 100%;
    }
}
</style>