<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from "vue-router";
const prop = defineProps(['allCountries', 'totalCountries', 'loading']);
const API_KEY = import.meta.env.VITE_GMAP_API_KEY;


let detailedCountry = ref();

let route = useRoute();

onMounted(() => {
    if (!prop.loading) {
        loadCountry();
    }
})

watch(() => prop.loading, () => {
    loadCountry();

})

const loadCountry = () => {
    if (prop.totalCountries == prop.allCountries.length) {
        detailedCountry.value = prop.allCountries.find((country: any) => country.id == route.params.id);
    }
}

</script>
<template>
    <div class="wrapper">
        <h1>{{ detailedCountry?.name.official }}</h1>
        <div class="detail-wrapper">
            <img :src="detailedCountry?.flags.svg" :alt="detailedCountry?.flags.alt">

            <table class="table-wrapper">
                <tr v-if="detailedCountry?.capital.length > 0">
                    <th class="key">Capital</th>
                    <th class="value">:
                        <p v-for="item in detailedCountry?.capital" class="item-frame">
                            {{ item }}
                        </p>
                    </th>
                </tr>
                <tr>
                    <th class="key">Populations</th>
                    <th class="value">: {{ detailedCountry?.population.toLocaleString() }}</th>
                </tr>
                <tr>
                    <th class="key">Language</th>
                    <th class="value">:
                        <p v-for="item in detailedCountry?.languages" class="item-frame">
                            {{ item }}
                        </p>
                    </th>
                </tr>
                <tr>
                    <th class="key">Currencies</th>
                    <th class="value">:
                        <p v-for="item in detailedCountry?.currencies" class="currencies">
                            {{ item.name }} -- {{ item.symbol }}
                        </p>
                    </th>

                </tr>
                <tr>
                    <th class="key">Region</th>
                    <th class="value">: {{ detailedCountry?.region }}</th>

                </tr>
                <tr>
                    <th class="key">Subregion</th>

                    <th class="value">: {{ detailedCountry?.subregion }}</th>
                </tr>
                <tr>
                    <th class="key">Top Level Domain</th>
                    <th class="value">: {{ detailedCountry?.tld[0] }}</th>
                </tr>
                <tr v-if="detailedCountry?.borders.length > 0">
                    <th>Borders</th>
                    <th class="value">:
                        <p v-for="item in detailedCountry?.borders" class="item-frame">
                            {{ item }}
                        </p>
                    </th>
                </tr>
            </table>

        </div>
        <div class="map-wrapper">
            <iframe loading="lazy" height="450" allowfullscreen referrerpolicy="no-referrer-when-downgrade" :src="`https://www.google.com/maps/embed/v1/place?key=${API_KEY}
    &q=${detailedCountry?.name.common}`">
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
    margin: auto;
    max-width: 70vw;
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
    .detail-wrapper {
        flex-direction: column;
    }

    .table-wrapper {
        margin: auto;
    }
}

@media screen and (max-width: 600px) {
    .detail-wrapper img {
        width: 100%;
    }
}
</style>