<script setup lang="ts">
let props = defineProps(["data"]);
</script>

<template>
  <div class="wrapper">
    <div class="content-wrapper">
      <div class="infos address-wrapper">
        <p>IP Address</p>
        <h2 v-if="props.data">{{ props.data["ip"] }}</h2>
        <h2 v-else>...</h2>
      </div>
      <div class="infos location-wrapper">
        <p>location</p>
        <h2 v-if="props.data">{{ props.data["location"] }}</h2>
        <h2 v-else>...</h2>
      </div>
      <div class="infos timezone-wrapper">
        <p>Timezone</p>
        <h2 v-if="props.data">UTC{{ props.data["timezone"] }}</h2>
        <h2 v-else>...</h2>
      </div>
      <div class="infos isp-wrapper">
        <p>ISP</p>
        <h2 v-if="props.data">{{ props.data["isp"] }}</h2>
        <h2 v-else>...</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  z-index: 1;
  margin: 3rem 0 0;
  justify-content: center;
  display: flex;
  position: relative;
}

.content-wrapper {
  position: absolute;
  /* top: -1rem; */
  text-align: left;
  width: 100%;
  max-width: 60rem;
  background-color: #fff;
  color: var(--Very-Dark-Gray);
  padding: 1.5rem 1rem;
  border-radius: 20px;
  display: grid;
  column-gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
}

.content-wrapper p {
  font-size: 0.78rem;
  color: var(--Dark-Gray);
}

.content-wrapper .infos h2:nth-child(2) {
  font-size: 1.2rem;
}

@media screen and (max-width: 970px) {
  .wrapper {
    margin-left: 1rem;
    margin-right: 1rem;
  }
}

@media screen and (max-width: 720px) {
  .content-wrapper {
    text-align: center;
    row-gap: 2rem;
    grid-template-columns: 1fr;
  }

  .wrapper {
    margin-top: 0;
  }
}
</style>