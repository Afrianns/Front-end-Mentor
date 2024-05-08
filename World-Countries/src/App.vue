<script setup lang="ts">
import Header from "./components/Header.vue";
import Filters from "./components/Filters.vue";
import Details from "./components/Details.vue";

import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

import { ref, onUpdated } from "vue";

let countries = ref();
let searchedCountries = ref();
let grid = ref();
let isClicked = ref(false);
let detailCountry = ref();
let isFarFromTop = ref(false);
let filteredRegion = ref();


const getCountries = async (param = 'all') => {
  let data = await fetch(`https://restcountries.com/v3.1/${param}?fields=name,capital,flags,population,region,languages,currencies,borders,subregion,tld,maps`);
  countries.value = await data.json();
  searchCountry('');
};

window.addEventListener('scroll', () => {
  if (window.scrollY >= 1050) {
    isFarFromTop.value = true;
  } else {
    isFarFromTop.value = false;
  }
});

getCountries();
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


const checkResult = (val: string) => {

  if (val != "All") {
    filteredRegion.value = val;
    getCountries('region/' + val);
  } else {
    filteredRegion.value = '';
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

const hidepage = (val: number) => {
  console.log("check page ", val);
  isClicked.value = !isClicked.value;
  detailCountry = searchedCountries.value[val];
}

const home = () => {
  isClicked.value = !isClicked.value;
  searchCountry('');
}

</script>

<template>
  <Header msg="World Countries" id="header" />
  <div v-if="!isClicked">
    <Filters @filter-regions="checkResult" @search="searchCountry" :region="filteredRegion" />
    <section class="container content">
      <div class="card-wrapper">
        <div ref="grid" class="grid">
          <template v-for="(country, key) in searchedCountries">
            <div class="card" @click="hidepage(key)">
              <img :src="country.flags.png" :alt="country.flags.alt" />
              <div class="info-wrapper">
                <h1>{{ country.name.common }}</h1>
                <ul>
                  <li v-if="country.capital.length > 0"><span>Capital:</span> {{ country.capital.join(', ') }}</li>
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
      </div>
    </section>
    <a class="back-top" href="#header" v-if="isFarFromTop">
      <i class='bx bx-up-arrow-alt bx-sm'></i>
    </a>
  </div>
  <div v-else class="container">
    <Details :data="detailCountry" @back="home" />
  </div>

  <footer class="footer">
    <p>Develop by <a href="http://hanifna.rf.gd" target="_blank">HanifNA</a> from <a href="http://frontendmentor.com"
        target="_blank">Frontend Mentor</a></p>
    <p>API from <a href="http://restcountries.com" target="_blank">Rest Countries</a></p>
  </footer>
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
