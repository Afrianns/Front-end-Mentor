<script setup lang="ts">
import Header from './components/Header.vue';
import Input from './components/Input.vue';


</script>

<template>
  <main>
    <Header />
    <Input />
    <span class="border"></span>
  </main>
</template>

<style scoped>
main {
  text-align: center;
  display: flex;
  flex-direction: column;
  row-gap: 5rem;
}

.border {
  width: 90%;
  height: 1px;
  background-color: var(--primary-mute);
  margin: auto;
}
</style>
