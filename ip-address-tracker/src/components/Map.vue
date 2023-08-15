
<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import Leaf from "leaflet";

import { onMounted, ref, watch } from "vue";

let props = defineProps(["pos"]);
let lat = ref(0);
let lng = ref(0);
let map = ref();

// create map with leaflet
let setMap = () => {
  map.value = Leaf.map("map").setView([lat.value, lng.value], 12);
  Leaf.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map.value);
};

// load map when dom create & watch for an update from input
onMounted(() => {
  let icon = Leaf.icon({
    iconUrl: "./images/icon-location.svg",
  });

  watch(
    () => props.pos["coords"],
    (a) => {
      lat.value = a[0];
      lng.value = a[1];
      console.log(a);
      map.value.setView([lat.value, lng.value], 12);
      Leaf.marker([lat.value, lng.value], { icon: icon }).addTo(map.value);
    }
  );
  setMap();
});
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

