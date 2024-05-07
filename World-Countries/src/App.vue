<script setup lang="ts">
import Header from "./components/Header.vue";
import Filters from "./components/Filters.vue";

import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";
import { ref, onUpdated, onBeforeUpdate, onMounted } from "vue";

let countries = ref();
let grid = ref(null);

let count = ref(0);

const getCountries = async (param = 'all') => {
  let data = await fetch(`https://restcountries.com/v3.1/${param}`);

  let result = await data.json();
  countries.value = result;
  console.log(result);
};

getCountries();

onUpdated(() => {
  let masonry = new Masonry(grid.value, {
    itemSelector: ".card",
    gutter: 20
  });

  console.log("updated ", grid.value);
  imagesLoaded(grid.value).on("progress", () => {
    masonry.layout();
  })
});


const checkResult = (val) => {
  if(val != "All"){
    getCountries('region/' + val);
  } else{
    getCountries();
  }
}

</script>

<template>
  <Header msg="World Countries" />
  <Filters @filter-regions="checkResult" />
  <section class="container content">
    <div class="card-wrapper">
      <div ref="grid">
      <template v-for="(country, key) in countries" :key="key">
          <div class="card">
            <img :src="country.flags.png" :alt="country.flags.alt" />
            <div class="info-wrapper">
              <h1>{{ country.name.common }}</h1>
              <ul>
                <li>
                  <span>Population:</span>
                  {{ country.population.toLocaleString() }}
                </li>
                <li><span>Capital:</span> {{ country.capital }}</li>
                <li><span>Region:</span> {{ country.region }}</li>
              </ul>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>
.content {
  margin-top: 3rem;
}
.grid {
  background-color: red;
}

.card-wrapper{
  width: 100%;
}

.card {
  border: 0.1px solid var(--tertiery-bg);
  margin-bottom: 1rem;
  width: calc(20rem + 2px);
  background-color: var(--secondary-bg);
}

.card ul li {
  list-style: none;
}

.card img{
  width: 100%;
}

.info-wrapper {
  padding: 20px;
}

.info-wrapper span {
  font-weight: bold;
}

.info-wrapper h1 {
  padding-bottom: 1rem;
}
</style>
