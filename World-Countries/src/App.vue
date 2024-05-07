<script setup lang="ts">
import Header from "./components/Header.vue";
import Filters from "./components/Filters.vue";

import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

import { ref, onUpdated } from "vue";

let countries = ref();
let searchedCountries = ref();
let grid = ref();
// const color = ref(['a', "b", "c", "d", "e"]);

const getCountries = async (param = 'all') => {
  let data = await fetch(`https://restcountries.com/v3.1/${param}?fields=name,capital,flags,population,region`);

  countries.value = await data.json();
  searchCountry('');
};

getCountries();
onUpdated(() => {
  let masonry: any = new Masonry(grid.value, {
    itemSelector: ".card",
    gutter: 20
  });

  imagesLoaded(grid.value).on("progress", () => {
    masonry.layout();
  })
});


const checkResult = (val: string) => {
  if (val != "All") {
    getCountries('region/' + val);
  } else {
    getCountries();
  }
}

const searchCountry = (val: string) => {
  if (val) {
    searchedCountries.value = countries.value.filter((country: any, key: number) => {
      if (country.name.common.toLowerCase().indexOf(val) > -1) {
        return countries.value[key];
      }
    })
  } else {
    searchedCountries.value = countries.value;
  }
}

</script>

<template>
  <Header msg="World Countries" id="header" />
  <Filters @filter-regions="checkResult" @search="searchCountry" />
  <!-- {{ color[Math.random() * color.length - 1] }} -->
  <section class="container content">
    <div class="card-wrapper">
      <div ref="grid">
        <template v-for="country in searchedCountries">
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
  <a class="back-top" href="#header">
    <!-- <div class='img'></div> -->
    <i class='bx bx-up-arrow-alt bx-sm'></i>
  </a>

  <footer class="footer">
    <p>Made by <a href="http://hanifna.rf.gd" target="_blank">HanifNA</a></p>
    <p>API from <a href="http://restcountries.com" target="_blank">Rest Countries</a></p>
  </footer>
</template>

<style scoped>
.content {
  margin-top: 3rem;
}

.grid {
  background-color: red;
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
  font-size: 1.2rem;
  padding-bottom: 1rem;
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


.footer {
  margin: 5rem;
  text-align: center;
  font-size: .75rem;
  color: rgb(151, 151, 151);
}

.footer a {
  color: rgb(151, 151, 151);
  text-decoration: underline;
}
</style>
