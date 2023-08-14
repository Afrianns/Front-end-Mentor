<script lang="ts" setup>
import Input from "./components/Input.vue";
import Info from "./components/Info.vue";
import Map from "./components/Map.vue";
import { resultType } from "./components/types";
import axios from "axios";
import Swal from "sweetalert2";

import "boxicons";

import { onMounted, ref } from "vue";

const api_key = import.meta.env.VITE_API_KEY;
let ip_address = ref("");
let val = ref();

let information_data = ref();
let coords = ref();
const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${api_key}`;

// catch all emit data from input component
function getData(params: resultType) {
  val.value = params;

  let option_param = "";
  if (val.value["type"] == "domain") {
    option_param = `&domain=${val.value["value"]}`;
  } else {
    option_param = `&ipAddress=${val.value["value"]}`;
  }
  getLocation(option_param);
}

onMounted(() => {
  getLocation();
});

// gets data from geo api (limited)
async function getLocation(params: string = "") {
  axios
    .get(url + params)
    .then(function (response) {
      console.log(response);
      information_data.value = {
        ip: response.data.ip,
        isp: response.data.isp,
        timezone: response.data.location.timezone,
        location: `${response.data.location.region}, ${response.data.location.country}`,
      };
      coords.value = [response.data.location.lat, response.data.location.lng];
    })
    .catch(function (error) {
      console.log(error);
      setStatus(`${error.message}<br> <small> Please Try Again!</small>`);
    });
}

// alert if there is an errors occur
function setStatus(params: string) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "error",
    title: params,
  });
}
</script>

<template>
  <div class="header">
    <h1>IP Address Tracker</h1>
    <Input @data="getData" @warn="setStatus" />
    <Info :data="information_data" />
  </div>
  <Map :pos="{ val, coords }" />
</template>

<style scoped>
.header {
  text-align: center;
  margin: auto;
  padding: 0.5rem 0;
  width: 100%;
  color: #fff;
  height: 13.5rem;
  background-repeat: no-repeat;
  background-image: url("/images/pattern-bg-desktop.png");
}
.header h1 {
  font-size: 2rem;
  margin: 0;
}
</style>
