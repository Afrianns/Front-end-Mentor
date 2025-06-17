<script setup lang="ts">

import { ref } from "vue";

import IconMoon from "./icons/IconMoon.vue";
import IconSun from "./icons/IconSun.vue";
import Logo from "./icons/Logo.vue";

let logoColor = ref("#091540")
let mode = ref(false)

const storeMode = localStorage.getItem("DMode");

if (storeMode) {
  let { DMode, Color } = JSON.parse(storeMode)
  logoColor.value = Color
  mode.value = DMode

  if (DMode) document.documentElement.classList.add("dark")

}


const toggleMode = () => {
  document.documentElement.classList.toggle('dark')
  mode.value = !mode.value
  logoColor.value = (mode.value) ? "#fff" : "#091540"

  localStorage.setItem('DMode', JSON.stringify({ "DMode": mode.value, "Color": logoColor.value }))
}
</script>

<template>
  <header class="card header-wrapper">
    <Logo :fillColor="logoColor" class="logo-img" />
    <span class="toggle-wrapper" v-on:click="toggleMode()">
      <IconSun v-if="mode" class="img" />
      <IconMoon v-if="!mode" class="img" />
    </span>
  </header>
</template>

<style scoped>
.card.header-wrapper {
  border-color: var(--header-color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-wrapper .logo-img svg {
  fill: blue;
}


.toggle-wrapper {
  background-color: var(--low-gray);
  border-radius: 10px;
  cursor: pointer;
  width: 3rem;
  height: 3rem;
  display: flex;
}

.toggle-wrapper:hover {
  background-color: var(--medium-gray);
}

.toggle-wrapper .img {
  margin: auto;
}
</style>
