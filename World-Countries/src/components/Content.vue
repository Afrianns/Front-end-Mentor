<script setup lang="ts">
import Filters from "./Filters.vue";

import { ref, onMounted, onUpdated, watch } from "vue";

import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

const props = defineProps(['totalCountries', 'allCountries', 'loading', 'latestPosLoaded']);

const emit = defineEmits(['goToDetail']);

type countryObj = {
    id: number,
    name: { common: string, official: string, nativeName: any },
    capital: string[],
    flags: { png: string, svg: string, alt: string },
    population: number,
    region: string
}

let totalCountries = ref(0);
let grid = ref();
let isClicked = ref(false);
let isFarFromTop = ref(false);
let filteredRegion = ref();

let perCountries = ref<countryObj[]>([]);

let allFilteredCountries = ref<countryObj[]>([]);

let continent = ref('All');
let startPos = ref(0);
let endPos = ref(props.latestPosLoaded);

onMounted(() => {
    if (!props.loading) initLoad();
})

watch(() => props.loading, () => initLoad())

const initLoad = () => {
    if (props.totalCountries == props.allCountries.length) {
        totalCountries.value = props.totalCountries;
        filterByRegions(continent.value);
    }
}

window.addEventListener('scroll', () => {
    if (window.scrollY >= 1050) {
        isFarFromTop.value = true;
    } else {
        isFarFromTop.value = false;
    }
});


onUpdated(() => {
    if (!isClicked.value) {
        let masonry: any = new Masonry(grid.value, {
            itemSelector: ".card",
            fitWidth: true,
            gutter: 20
        });

        imagesLoaded(grid.value).on("progress", () => {
            masonry.layout();
        })
    }
});


const countriesGroup = (countries: countryObj[], regionName: string = "All") => {

    // console.log(countries);
    for (let i = startPos.value; i <= endPos.value; i++) {

        if (i > totalCountries.value) {
            break;
        }

        if (regionName == 'All') {
            perCountries.value.push(countries[i])
        } else if (regionName == countries[i].region) {
            perCountries.value.push(countries[i])
        }
    }
}

const updatePos = () => {
    startPos.value = endPos.value + 1;
    endPos.value += 6;
    countriesGroup(allFilteredCountries.value);
}


const filterByRegions = (val: string) => {
    startPos.value = 0;
    continent.value = val;
    perCountries.value = [];
    let filteredCountries: countryObj[] = [];
    if (val != 'All') {
        filteredCountries = props.allCountries.filter((country: countryObj, key: number) => (country.region == val))
    } else {
        filteredCountries = props.allCountries;
    }

    totalCountries.value = filteredCountries.length - 1;

    allFilteredCountries.value = filteredCountries;

    countriesGroup(allFilteredCountries.value, continent.value);
}

const searchCountry = (val: string) => {
    perCountries.value = [];


    if (val) {
        startPos.value = 0;
        let filtered = allFilteredCountries.value.filter((country: any, key: number) => {
            if (country.name.common.toLowerCase().indexOf(val) > -1) {
                return country;
            }
        })
        totalCountries.value = filtered.length - 1;
        countriesGroup(filtered, continent.value);
    } else {
        totalCountries.value = allFilteredCountries.value.length - 1;
        countriesGroup(allFilteredCountries.value, continent.value);
        if (endPos.value >= 11) {
            startPos.value = endPos.value - 6;
        }
    }
}

const goDetail = (id: number) => emit('goToDetail', id, endPos.value);

</script>

<template>
    <div>
        <Filters @filter-regions="filterByRegions" @search="searchCountry" :region="filteredRegion" />
        {{ totalCountries }} --- {{ startPos }} - {{ endPos }}
        <section class="container content">
            <div class="card-wrapper">
                <div ref="grid" class="grid">
                    <template v-for="(country, key) in perCountries">
                        <div class="card" @click="goDetail(country.id)">
                            <img :src="country.flags.png" :alt="country.flags.alt" />
                            <div class="info-wrapper">
                                <h1>{{ country.name.common }}</h1>
                                <ul>
                                    <li v-if="country.capital.length > 0"><span>Capital:</span> {{
                                        country.capital.join(', ') }}</li>
                                    <li>
                                        <span>Population:</span>
                                        {{ country.population.toLocaleString() }}
                                    </li>
                                    <li><span>Region:</span> {{ country.region }}</li>
                                </ul>
                            </div>
                        </div>
                    </template>
                </div>
                <div v-if="totalCountries >= endPos" class="load-container">
                    <button class="loadmore" @click="updatePos()">load more</button>
                </div>
            </div>
        </section>
        <a class="back-top" href="#header" v-if="isFarFromTop">
            <i class='bx bx-up-arrow-alt bx-sm'></i>
        </a>
    </div>

</template>

<style scoped>
.content {
    margin-top: 3rem;
}

.hide {
    display: hidden;
}

.capital {
    display: inline;
    margin-left: 5px;
}

.grid {
    margin: auto;
}

.card-wrapper {
    width: 100%;
}

.card {
    cursor: pointer;
    position: absolute;
    border: 0.1px solid gray;
    margin-bottom: 1rem;
    width: calc(20rem + 2px);
    background-color: var(--secondary-bg);
    border-bottom: 5px solid;
    border-right: 5px solid;
    border-color: black;
}

.card:hover {
    transform: translate(3px, 3px);
    border-bottom: .1px solid;
    border-right: .1px solid;
    border-color: black;
}


.card ul li {
    list-style: none;
    margin: 5px 0;
}

.card img {
    width: 100%;
    border-bottom: .1px solid gray;
}

.info-wrapper {
    padding: 20px;
}

.info-wrapper span {
    font-weight: bold;

}

.info-wrapper h1 {
    font-size: 1.3rem;
    padding-bottom: 1rem;
}

.load-container {
    display: flex;
    justify-content: center;
}

.loadmore {
    position: absolute;

    padding: .5rem 1rem;
    color: var(--text);
    border: .5px solid var(--tertiery-bg);
    background-color: var(--secondary-bg);
    border-bottom: 5px solid;
    border-right: 5px solid;
    border-color: black;
}

.loadmore:hover {
    cursor: pointer;
    transform: translate(3px, 3px);
    border-bottom: .1px solid;
    border-right: .1px solid;
    border-color: black;
}

.back-top {
    cursor: pointer;
    position: fixed;
    bottom: 2rem;
    right: 1.5rem;
    padding: 1.3rem 1.2rem .7rem;
    border: .5px solid var(--tertiery-bg);
    background-color: var(--secondary-bg);
    border-bottom: 5px solid black;
    border-right: 5px solid black;
}

.back-top:hover {
    border-bottom: 1px solid black;
    border-right: 1px solid black;
}

.back-top .bx {
    color: var(--text);
}
</style>
