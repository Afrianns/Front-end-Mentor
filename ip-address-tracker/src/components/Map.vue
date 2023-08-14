
<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import Leaf from "leaflet";
let coords = ref();

import { computed, onMounted, onUpdated, ref, watch } from "vue";

let props = defineProps(["pos"]);
let lat = ref(-7.75);
let lng = ref(110.49417);
let map = ref();

let setMap = () => {
  map.value = Leaf.map("map").setView([lat.value, lng.value], 12);
  Leaf.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map.value);
  Leaf.marker([lat.value, lng.value]).addTo(map.value);

  console.log(lat.value, lng.value);
};

onMounted(() => {
  watch(
    () => props.pos["coords"],
    (a) => {
      lat.value = a[0];
      lng.value = a[1];
      console.log(a);
      map.value.setView([lat.value, lng.value], 12);
      Leaf.marker([lat.value, lng.value]).addTo(map.value);
    }
  );
  setMap();
});

function getCoords(params: any) {
  console.log(params.target[0].value, params.target[1].value);
  lat.value = params.target[0].value;
  lng.value = params.target[1].value;
}

</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
#map {
  position: relative;
  z-index: 0;
  height: calc(100vh - 13.5rem);
}
</style>

