<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ msg: string }>()
let darkedmode = ref(false);
let root_doc = document.documentElement;

let themes = localStorage.getItem('world-design-themes');

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

// const count = ref(0)
</script>

<template>
  <nav>
    <div class="container">
      <h1 class="brand">{{ msg }}</h1>
      <div class="toggle-wrapper" @click="toggle">
        <span class="toggle" :class="{ 'dark-mode': darkedmode }"></span>
      </div>
    </div>
  </nav>
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
  /* box-shadow: 2px 2px 35px -28px var(--tertiery-bg); */
  border-bottom: 5px solid;
  border-color: black;
}


.toggle-wrapper {
  cursor: pointer;
  height: 25px;
  width: 50px;
  border-radius: 20px;
  background-color: var(--text);
  position: relative;
  background-image: url('../assets/sun.svg'), url('../assets/moon.svg');
  background-position: 28px, 3px;
  background-repeat: no-repeat;

}

.toggle {
  transition: all .5s cubic-bezier(0.79, 0.14, 0.15, 0.86);
  top: 3px;
  left: 3px;
  position: absolute;
  background-color: var(--secondary-bg);
  /* background-color: rgb(255, 238, 6); */
  border-radius: 50%;
  width: 19px;
  height: 19px;
}

.dark-mode {
  left: 28px;
}
</style>
