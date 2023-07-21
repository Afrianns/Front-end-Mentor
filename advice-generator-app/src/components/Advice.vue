<script setup>
import { ref, watch } from "vue";
import axios from "axios";

let isClicked = defineProps(["clicked"]);
let getEmit = defineEmits(["passing", "finished"]);
let advice = ref();
let adviceText = ref("");
let errHand = ref();
let isLoaded = ref(false);

// watch clicked props from parent when state change or button get clicked
watch(
  () => isClicked.clicked,
  (e) => {
    if (e) {
      generateAdvice();
    }
  }
);

// Animate Advice text per Letters

let animText = (txt) => {
  txt.forEach((e, i) => {
    setTimeout(() => {
      if (i >= txt.length - 1) {
        getEmit("passing", advice?.value["slip"]?.id, false);
      }
      adviceText.value += e;
    }, 120 * i);
  });
};

// function generate advice from  advices API
let generateAdvice = () => {
  advice.value = "";
  errHand.value = "";
  adviceText.value = "";
  isLoaded.value = false;

  axios
    .get("https://api.adviceslip.com/advice")
    .then((e) => {
      advice.value = e.data;
    })
    .catch((err) => {
      console.log(err);
      errHand.value = err.message;
      getEmit("passing", "", false);
      isLoaded.value = true;
    })
    .finally((e) => {
      isLoaded.value = true;
      let txt = advice.value?.["slip"]?.advice.match(/.{1,3}/g);
      animText(txt);
    });
};

// called API when page first load
generateAdvice();
</script>

<template>
  <div class="generate" :class="{ loaded: isLoaded }">
    <p v-if="advice" class="advice">
      <span class="quote"> "</span>
      <span class="letters" v-html="adviceText"></span>
      <span class="quote"> "</span>
    </p>
    <p v-if="errHand" class="err">{{ errHand }}</p>
    <div v-if="!isLoaded" class="loading-wrapper">
      <div class="spinner">
        <div class="dot dot-1"></div>
        <div class="dot dot-2"></div>
        <div class="dot dot-3"></div>
        <div class="dot dot-4"></div>
        <div class="dot dot-5"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.quote {
  color: var(--Neon-Green);
}
.err {
  font-style: italic;
  color: rgb(255, 126, 126);
}
.advice {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
}

.loading-wrapper {
  margin: 2rem 0 1rem;
}
.spinner {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.dot {
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background: var(--Light-Cyan);
  animation: animDot 1.5s infinite;
}

.dot-1 {
  animation-delay: 100ms;
}
.dot-2 {
  animation-delay: 300ms;
}
.dot-3 {
  animation-delay: 500ms;
}
.dot-4 {
  animation-delay: 700ms;
}
.dot-5 {
  animation-delay: 900ms;
}

@keyframes animDot {
  0% {
    width: 10px;
    height: 10px;
    background: var(--Neon-Green);
    transform: translateY(0);
  }
  50% {
    transform: translateY(-24px);
    width: 20px;
    height: 20px;
  }
  100% {
    transform: translateY(0);
    width: 10px;
    height: 10px;
    background: var(--Light-Cyan);
  }
}

.load {
  height: 50%;
  mix-blend-mode: color-burn;
}
.generate {
  font-size: 28px;
  max-width: 30ch;
  margin: 1rem 0;
  animation: animWidth 1s infinite;
}
.generate p {
  margin: 1.5rem 0;
}

@keyframes animWidth {
  100% {
    height: 100%;
  }
}
</style>
