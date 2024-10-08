<script setup lang="ts">
import Header from './components/Header.vue';
import Input from './components/Input.vue';

import { ref } from "vue";

// icons 
import IconPlayer from './components/icons/IconPlayer.vue';
import IconStop from './components/icons/IconStop.vue';
import iconPause from './components/icons/IconPause.vue';
import IconLoadingAnim from './components/icons/IconLoadingAnim.vue';


let result = ref();
let audioUS = ref('');
let audiononUS = ref('');
let resultNotFound = ref();

let isPlay = ref(false);
let loadingData = ref(false);

// local storage save current search definition

if (!localStorage.getItem("definition")) {
  if (result.value) {
    localStorage.setItem("definition", JSON.stringify(result.value));
  } else {
    console.log('not exist');
  }
} else {
  let data = JSON.parse(localStorage.getItem('definition') || '');
  result.value = data;
  checkEveryAudio();
}

// audio section
let isAudioEnded = false;
let intervalID = 0;

// Audio Setting

// check audio for primary US
function checkIfUS(audioUrl: string) {
  let audio = audioUrl.split('/');
  const regex = /-us./g;
  const found = audio[audio.length - 1].match(regex);

  console.log(found);
  return (found) ? true : false;
}

// check every audio; select US ver else select secondary other lang
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
}

// play audio with selected lang 
// ability to change ui frontend 
function audioPlay() {
  isPlay.value = true;
  let audio = new Audio(audioUS.value || audiononUS.value);
  audio.play();

  intervalID = setInterval(() => {
    isAudioEnded = audio.ended;
    if (isAudioEnded) {
      stopInterVal();
    }
  }, 100);
}

function stopInterVal() {
  if (isAudioEnded) {
    isPlay.value = false;
    clearInterval(intervalID);
  }
}

// get from child "input" & store data to result; reset data 

function showData(param: any) {
  resultNotFound.value = null;
  result.value = null;
  console.log(param);
  if (param.title == 'No Definitions Found') {
    resultNotFound.value = param;
    localStorage.removeItem("definition");
    return;
  }
  audioUS.value = '';
  audiononUS.value = '';

  result.value = param[0];

  checkEveryAudio();
  localStorage.setItem("definition", JSON.stringify(result.value));
}

function load(param: any) {
  loadingData.value = param;
}

</script>

<template>
  <main>
    <Header />
    <Input @data="showData" @loading-data="load" />
    <IconLoadingAnim class="loadingAnim" v-if="loadingData && !result && !resultNotFound" />
    <p v-if="!result && !resultNotFound && !loadingData">Search for Definitions of Any Words in English; Start Write Any
      Words from Form Above You Curious About.</p>
    <section :class="{ 'loading': loadingData }">
      <div v-if="resultNotFound" class="not-found">
        <h1>{{ resultNotFound.title }}</h1>
        <p>{{ resultNotFound.message }}</p>
        <span>{{ resultNotFound.resolution }}</span>
      </div>

      <div v-if="result" class="header-result-wrapper">
        <section class="title-wrapper">
          <h1>{{ result.word }}</h1>
          <p>{{ result.phonetic }}</p>
        </section>
        <section>
          <div v-if="audioUS || audiononUS">
            <div v-if="isPlay">
              <iconPause class="icon-pause" />
            </div>
            <div v-else>
              <IconPlayer class="icon-play" v-on:click="audioPlay" />
            </div>
          </div>
          <div class="icon-wrapper" v-else>
            <IconStop class="icon-stop" />
            <p class="info-stop">No Audio</p>
          </div>
        </section>
      </div>
      <div v-if="result" v-for="(item, index) in result.meanings" :key="index" class="meaning-wrapper">
        <div class="subtitle">
          <h2>{{ item.partOfSpeech }}</h2>
          <span class="border"></span>
        </div>
        <h3>Meaning</h3>
        <ul v-for="(define, id) in item.definitions" :key="id">
          <li>
            <p>{{ define.definition }}</p>
            <span v-if="define.example">"{{ define.example }}"</span>
          </li>
        </ul>
        <h3 v-if="item.synonyms.length - 1 > 1">Synonyms <span class="synonyms">{{ item.synonyms.join(', ') }}</span>
        </h3>
      </div>
      <span class="border"></span>
      <div class="sources-wrapper" v-if="result">
        <h3>Source(s)</h3>
        <ul class="sources" v-for="(item, index) in result.sourceUrls" :key="index">
          <li><a :href="item" target="_blank">{{ item }}</a></li>
        </ul>
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  text-align: center;
  display: flex;
  flex-direction: column;
  row-gap: 3rem;
}

.loadingAnim {
  margin: auto;
}

.loading {
  position: relative;
}

.loading::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  opacity: .5;
  cursor: progress;
  background-color: var(--primary);
  animation: pulse 1s infinite ease;
}

@keyframes pulse {
  0% {
    opacity: .6;
  }

  50% {
    opacity: .4;
  }

  100% {
    opacity: .6;
  }
}


h1 {
  font-size: 3rem;
  text-transform: capitalize;
}

h3 {
  color: var(--secondary-mute);
  font-weight: 500;
}

span {
  color: var(--secondary-soft);
}

.synonyms {
  margin-left: 8px;
  color: rgb(242, 103, 38);
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

/* icon stypes */

.icon-play {
  cursor: pointer;
}

.icon-wrapper {
  cursor: not-allowed;
  position: relative;
}

.info-stop {
  display: none;
  width: max-content;
}

.icon-stop:hover+.info-stop {
  position: absolute;
  display: block;
  background-color: var(--primary-mute);
  padding: 2px 10px;
  border: 1px solid var(--primary-soft);
  left: -7px;
}

/* end icon style */

.subtitle {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.border {
  display: block;
  width: 100%;
  height: 1px;
  background-color: var(--primary-mute);
  margin: auto;
}

.meaning-wrapper {
  width: 90%;
  margin: 0 auto 3rem;
  text-align: left;
}

.meaning-wrapper p {
  margin: auto;
  text-align: left;
  font-weight: 500;
  color: var(--secondary);
}

.not-found {
  padding: 1rem 0 5rem;
}

.sources-wrapper {
  width: 90%;
  margin: 2rem auto;
  text-align: left;

}

.sources a {
  text-decoration: none;
  color: var(--tertiery);
}

.sources a:hover {
  text-decoration: underline;
  cursor: pointer;
}

@media screen and (max-width: 650px) {

  .header-result-wrapper,
  .meaning-wrapper,
  .sources-wrapper {
    width: 100%;
  }
}
</style>
