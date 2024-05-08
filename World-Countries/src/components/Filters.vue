<script setup lang="ts">
import { ref, watch } from "vue";
const emit = defineEmits(["filterRegions", "search"]);
const prop = defineProps(['region']);

let selected = ref('All');
let regions = ref(["All", "Europe", "Asia", "America", "Africa", "Oceania"]);

let search = ref('');

watch(search, () => {
  emit("search", search.value);
})

watch(selected, () => {
  emit('filterRegions', selected.value);
})

if (prop.region) {
  selected.value = prop.region;
}
</script>

<template>
  <div class="container">
    <div class="search-bar-wrapper">
      <form action="#" method="post">
        <i class='bx bx-search bx-sm'></i>
        <input type="text" placeholder="e.g. Indonesia" class="search-bar" v-model="search" />
      </form>
    </div>
    <div class="filter-bar-wrapper">
      <select name="filters" id="filters" v-model="selected">
        <option v-for="(region, key) in regions" :value="region" :key="key">
          {{ region }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.container {
  gap: 1rem;
  margin-top: 2rem;
}

.container input,
.search-bar-wrapper,
.filter-bar-wrapper {
  background-color: var(--secondary-bg);
}

.search-bar-wrapper {
  border: 1px solid var(--tertiery-bg);
  width: 100%;
  max-width: 25rem;
  padding: 2px;
  border-bottom: 5px solid;
  border-right: 5px solid;
  border-color: black;
}


.search-bar-wrapper .search-bar {
  padding: 0 10px;
  font-size: clamp(1rem, 1.2rem, 2rem);
  color: var(--text);
  width: clamp(80%, 5vw, 80%);
  outline: 0;
}

.search-bar-wrapper form {
  display: flex;
  align-items: center;
}

.bx {
  padding: 8px;
  padding-left: 1rem;
  height: 100%;
}

.search-bar-wrapper button {
  background-color: rgb(255, 124, 124);
  font-size: clamp(1rem, 1vw, 2rem);
  text-transform: uppercase;
  color: #fff;
  width: clamp(30%, 10px, 30%);
}

.search-bar-wrapper button:hover {
  background-color: #f75e49;
  cursor: pointer;
}

.search-bar-wrapper form>* {
  border: 0;
  height: 2.5rem;
}

.filter-bar-wrapper {
  border: 1px solid var(--tertiery-bg);
  width: 25%;
  padding: 2px;
  border-bottom: 5px solid;
  border-right: 5px solid;
  border-color: black;
}

.filters-bar,
#filters {
  background-color: var(--secondary-bg);
}

.filters-bar {
  padding: 0 15px;
}

#filters {
  cursor: pointer;
  color: var(--text);
  outline: 0;
  border: 0;
  height: 2.5rem;
  width: 100%;
}

@media screen and (max-width: 720px) {
  .container {
    flex-direction: column;
  }

  .filter-bar-wrapper {
    width: clamp(100px, 100%, 200px);
    align-self: flex-end;
  }

  .search-bar-wrapper {
    max-width: 100%;
  }
}

@media screen and (max-width: 400px) {
  .search-bar-wrapper {
    padding: 3px;
  }

  .search-bar-wrapper form {
    display: flex;
  }

  .search-bar-wrapper .search-bar,
  .search-bar-wrapper button {
    width: 100%;
  }

  .filter-bar-wrapper {
    width: 100%;
  }
}
</style>
