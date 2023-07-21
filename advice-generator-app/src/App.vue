<script setup>
import { onMounted, ref } from "vue";
import Advice from "./components/Advice.vue";

let Aid = ref();
let getAdvice = ref();
let loaded = ref(true);
let width = ref(window.innerWidth);

// reset when all finished
function reset(props = "", finished) {
  getAdvice.value = false;
  console.log(Aid.value);

  if (props) {
    Aid.value = "#" + props;
  } else {
    Aid.value = "";
  }
  loaded.value = finished;
}

// called function generate & passing to advice comps
let generateAdvice = () => {
  Aid.value = "";
  if (loaded.value != true) {
    loaded.value = true;
    getAdvice.value = true;
  }
};

// checking window width
onMounted(() => {
  window.addEventListener("resize", () => {
    width.value = window.innerWidth;
  });
});
</script>

<template>
  <div class="container">
    <h1>ADVICE {{ Aid }}</h1>
    <Advice :clicked="getAdvice" @reset="reset" />
    <img
      v-if="width >= 550"
      class="border"
      src="./assets/pattern-divider-desktop.svg"
      alt=""
    />
    <img
      v-else
      class="border"
      src="./assets/pattern-divider-mobile.svg"
      alt=""
    />
    <div
      class="dice-wrapper"
      :class="{ loading: loaded }"
      v-on:click="generateAdvice()"
    >
      <img
        class="dice"
        :class="{ diceAnim: loaded }"
        src="./assets/icon-dice.svg"
        alt=""
      />
    </div>
  </div>
  <div class="attribution">
    Challenge by
    <a href="https://www.frontendmentor.io?ref=challenge" target="_blank"
      >Frontend Mentor</a
    >. Coded by
    <a target="_blank" href="http://hanifna.rf.gd/">Hanif N Afrian</a>.
  </div>
</template>

<style scoped>
.container {
  position: relative;
  transition: all 0.5s ease-in-out;
  padding: 1rem 2rem 1.6rem;
  margin: 0 1rem;
  border-radius: 10px;
  background: var(--Dark-Grayish-Blue);
}
.border {
  margin: 0.5rem 0 1.5rem;
}
.container h1 {
  margin: 1.6rem 0;
  color: var(--Neon-Green);
  font-size: 0.95rem;
  letter-spacing: 4px;
}

.dice-wrapper {
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--Neon-Green);
  width: 55px;
  height: 55px;
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  transition: 0.2s ease-in-out;
}

.dice-wrapper:hover {
  box-shadow: 0 0 15px var(--Neon-Green);
  filter: blur(50%);
}

.dice {
  width: 45%;
  height: 45%;
}

.loading {
  box-shadow: 0 0 15px var(--Neon-Green);
  filter: blur(50%);
  width: 60px;
  height: 60px;
  cursor: not-allowed;
}

.diceAnim {
  width: 50%;
  height: 50%;
  animation: dice-anim 1.5s infinite steps(3, end);
}

@keyframes dice-anim {
  0% {
    rotate: 180deg;
  }
  100% {
    rotate: 0deg;
  }
}

.dice-wrapper:hover .dice {
  transition: 0.1s ease-in-out;
  width: 50%;
  height: 50%;
}

@media screen and (max-width: 500px) {
  .container {
    padding: 1rem 1rem 1.6rem;
    margin-left: 1rem;
    margin-right: 1rem;
  }
}
</style>
