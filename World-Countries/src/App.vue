<script setup lang="ts">
import { ref, onMounted } from 'vue';
import router from './router/route';
let themes = localStorage.getItem('world-design-themes');
let root_doc = document.documentElement;

const title = "World Countries";

let darkedmode = ref(false);
let allCountries = ref([]);
let totalCountries = ref(0);
let loading = ref(false);

let latestPosLoaded = ref(5);

type countryObj = {
  id: number,
  name: { common: string, official: string, nativeName: any },
  capital: string[],
  flags: { png: string, svg: string, alt: string },
  languages: {},
  maps: {},
  currencies: {},
  subregion?: {},
  borders: string[],
  tld: string[],
  population: number,
  region: string
}

if (themes) {
  root_doc.classList.add(themes);
  darkedmode.value = !darkedmode.value
}

let toggle = () => {
  darkedmode.value = !darkedmode.value;

  if (darkedmode.value) {
    localStorage.setItem('world-design-themes', 'dark-mode');
    root_doc.classList.add("dark-mode");
  } else {
    localStorage.removeItem('world-design-themes');
    root_doc.classList.remove("dark-mode");
  }
}

// get all countries 
const getAllCountries = () => {
  let id = 1;
  let data = fetch(`https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region,languages,currencies,borders,subregion,tld,maps`)

  data.then((val) => {
    return val.json();
  }).then((countries) => {
    allCountries.value = countries.map((country: countryObj) => {
      return {
        'id': id++,
        'name': country.name,
        'capital': country.capital,
        'flags': country.flags,
        'population': country.population,
        'region': country.region,
        'languages': country.languages,
        'maps': country.maps,
        'currencies': country.currencies,
        'subregion': country.subregion,
        'borders': country.borders,
        'tld': country.tld,
      }
    });

    totalCountries.value = countries.length;
    loading.value = false;
  })
};

const goToDetail = (cid: number, lastPos: number) => {
  latestPosLoaded.value = lastPos;
  router.push(`detail/${cid}`);
}

onMounted(() => {
  loading.value = true;
  getAllCountries();
});

</script>

<template>
  <div>
    <nav>
      <div class="container">
        <h1 class="brand">{{ title }}</h1>
        <div class="toggle-wrapper" @click="toggle">
          <span class="toggle" :class="{ 'dark-mode': darkedmode }"></span>
        </div>
      </div>
    </nav>
    <main>
      <router-view v-slot="{ Component }">
        <component :is="Component" :totalCountries="totalCountries" :allCountries="allCountries"
          :latestPosLoaded="latestPosLoaded" @goToDetail="goToDetail" :loading="loading" />
      </router-view>
    </main>
    <footer class="footer">
      <p>Develop by <a href="http://hanifna.rf.gd" target="_blank">HanifNA</a> from <a href="http://frontendmentor.com"
          target="_blank">Frontend Mentor</a></p>
      <p>API from <a href="http://restcountries.com" target="_blank">Rest Countries</a></p>
    </footer>
  </div>
</template>

<style scoped>
.brand {
  font-family: var(--title-font);
  font-size: clamp(1rem, 6vw, 2rem);
}

nav {
  padding: 1rem 0;
  width: 100%;
  background-color: var(--secondary-bg);
  border-bottom: 1px solid var(--tertiery-bg);
  border-bottom: 5px solid black;
}


.toggle-wrapper {
  cursor: pointer;
  height: 25px;
  width: 50px;
  border-radius: 20px;
  background-color: var(--text);
  position: relative;
  background-image: url('./assets/sun.svg'), url('./assets/moon.svg');
  background-position: 28px, 3px;
  background-repeat: no-repeat;

}

.toggle {
  transition: all .5s cubic-bezier(0.79, 0.14, 0.15, 0.86);
  top: 3px;
  left: 3px;
  position: absolute;
  background-color: var(--secondary-bg);
  border-radius: 50%;
  width: 19px;
  height: 19px;
}

.dark-mode {
  left: 28px;
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
