<script setup lang="ts">
import Headers from "./components/Headers.vue";
import Contents from "./components/Contents.vue";
import { ref } from "vue";

const active = ref('all')

const setFilters = (type: string) => {
  active.value = type;
}

</script>

<template>
  <Headers />
  <main>
    <div class="header-filter">
      <h1>Extensions List</h1>
      <ul class="filter-wrapper">
        <li class="button-default-style" :class="{ 'active': active == 'all' }" v-on:click="setFilters('all')">All</li>
        <li class="button-default-style" :class="{ 'active': active == 'active' }" v-on:click="setFilters('active')">
          Active</li>
        <li class="button-default-style" :class="{ 'active': active == 'inactive' }"
          v-on:click="setFilters('inactive')">Inactive</li>
      </ul>
    </div>
    <Contents :type="active" />
  </main>
</template>

<style scoped>
.header-filter {
  margin: 1rem 0;
  justify-content: space-between;
  display: flex;
  align-items: center;
}

.filter-wrapper {
  list-style: none;
  display: flex;
  gap: .5rem;
  align-items: center;
}

.filter-wrapper li {
  background-color: var(--card-background-color);
}

.filter-wrapper li:hover {
  opacity: 80%;
  background-color: var(--medium-gray);
}

.filter-wrapper .active {
  background-color: var(--Red-400);
}

.filter-wrapper .active:hover {
  opacity: 80%;
  background-color: var(--Red-500);
}


@media screen and (max-width: 650px) {
  .header-filter {
    flex-direction: column;
  }
  .filter-wrapper{
    gap: 1rem;
  }
}
</style>
