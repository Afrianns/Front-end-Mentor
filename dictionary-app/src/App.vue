<script setup lang="ts">
import Header from './components/Header.vue';
import Input from './components/Input.vue';
import IconPlayer from './components/icons/IconPlayer.vue';


import { ref } from "vue";

let result = ref();

let audioUS = ref('');
let audiononUS = ref('');

function checkIfUS(audioUrl: string) {
  let audio = audioUrl.split('/');
  const regex = /-us./g;
  const found = audio[audio.length - 1].match(regex);

  console.log(found);
  return (found) ? true : false;
}

function checkEveryAudio() {
  for (let item of result.value.phonetics) {
    if (checkIfUS(item.audio)) {
      audioUS.value = item.audio;
      audiononUS.value = '';
      break;
    }
    if (item.audio) {
      audiononUS.value = item.audio;
    }
  }

  audioPlay();
}

function audioPlay() {
  let audio = new Audio(audioUS.value || audiononUS.value);
  audio.play();
}

function showData(param: string[]) {
  console.log("parent", param[0]);
  result.value = null;
  audioUS.value = '';
  audiononUS.value = '';
  result.value = param[0];
}

</script>

<template>
  <main>
    <Header />
    <Input @data="showData" />

    <div v-if="result" class="header-result-wrapper">
      <div class="title-wrapper">
        <h1>{{ result.word }}</h1>
        <p>{{ result.phonetic }}</p>
      </div>
      <div>
        <IconPlayer v-on:click="checkEveryAudio" />
      </div>
    </div>
    <div v-if="result" v-for="(item, index) in result.meanings" :key="index" class="meaning-wrapper">
      <div class="subtitle">
        <h2>{{ item.partOfSpeech }}</h2>
        <span class="border"></span>
      </div>
      <p>Meaning</p>
      <ul v-for="(define, id) in item.definitions" :key="id">
        <li>{{ define.definition }}</li>
      </ul>
      <!-- </div> -->
    </div>
    <span class="border"></span>

    <ul v-if="result" class="sources" v-for="(item, index) in result.sourceUrls" :key="index">
      <li>{{ item }}</li>
    </ul>
  </main>
</template>

<style scoped>
main {
  text-align: center;
  display: flex;
  flex-direction: column;
  row-gap: 3rem;
  /* width: 90%; */
}

h1 {
  font-size: 3rem;
}

.header-result-wrapper {
  display: flex;
  width: 90%;
  margin: auto;
  align-items: center;
  justify-content: space-between;
}

.header-result-wrapper .title-wrapper>* {
  text-align: left;
  margin: 0;
  padding: 0;
}

.subtitle {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.border {
  width: 100%;
  height: 1px;
  background-color: var(--primary-mute);
  margin: auto;
}

.meaning-wrapper {
  width: 90%;
  margin: auto;
  text-align: left;
}

.meaning-wrapper p {
  margin: auto;
  text-align: left;
  color: var(--secondary-mute);
}

.sources {
  width: 90%;
  margin: auto;
  text-align: left;
  color: var(--tertiery);
}

.sources:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
