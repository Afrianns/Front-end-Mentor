<script setup>
import { ref } from "vue";

let pos = ref("right");

// toggle to change root color styles

function toggle() {
  if (pos.value == "right") {
    document.documentElement.className = "dark";
    pos.value = "left";
  } else {
    document.documentElement.className = "";
    pos.value = "right";
  }
}
</script>

<template>
  <div id="header">
    <h1><span class="age">AGE</span> CALC.</h1>

    <div v-on:click="toggle" class="mode">
      <box-icon type="solid" name="sun" class="sun"></box-icon>
      <span v-bind:class="pos" class="toggle"></span>
      <box-icon type="solid" name="moon" class="moon"></box-icon>
    </div>
  </div>
</template>

<style scoped>
.sun {
  position: absolute;
  top: 0.35rem;
  right: 0.4rem;
}

.moon {
  position: absolute;
  left: 0.3rem;
  top: 0.38rem;
  fill: var(--purple);
}

h1 {
  font-size: 2rem;
  text-align: left;
  font-family: "Poppins-Ebold", sans-serif;
  color: var(--secondary-font);
}
.mode {
  cursor: pointer;
  position: relative;
  background: var(--secondary);
  width: 70px;
  height: 35px;
  border-radius: 20px;
}

.left {
  left: 40px;
}
.right {
  left: 5px;
}

.mode .toggle {
  transition: 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  position: absolute;
  top: 5px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  z-index: 1;
  background: var(--tertiary);
}

.mode .toggle svg {
  fill: rgb(19, 19, 19);
}

.age,
.values {
  color: var(--purple);
}
</style>
