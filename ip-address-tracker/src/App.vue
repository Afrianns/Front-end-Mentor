<script setup lang="ts">
import "boxicons";
</script>

<template>
  <div class="header">
    <h1>IP Address Tracker</h1>
    <form class="form-wrapper" action="post">
      <input
        placeholder="Search for any IP address or domain IP Address"
        type="text"
        name="city"
      />
      <button>
        <box-icon size="md" color="white" name="chevron-right"></box-icon>
      </button>
    </form>

    <div class="content-wrapper">
      <div class="address-wrapper"></div>
      <div class="location-wrapper"></div>
      <div class="timezone-wrapper"></div>
      <div class="isp-wrapper"></div>
    </div>
  </div>

  <!--  
     Location
    Timezone UTC
    ISP
     -->
  <!-- add offset value dynamically using the API -->
</template>

<style scoped>
.header {
  padding: 1rem 0 3rem;
  width: 100%;
  color: #fff;
  background-image: url("/images/pattern-bg-desktop.png");
}
.header h1 {
  font-size: 2rem;
  margin: 1rem 0 2rem;
}

.form-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-wrapper input,
.form-wrapper button {
  border: 0;
  height: 3.5rem;
  padding: 0.5rem 0.5rem;
}

.form-wrapper button {
  background-color: var(--Very-Dark-Gray);
  width: 100%;
  max-width: 5rem;
  border-radius: 0 25px 25px 0;
}

.form-wrapper input {
  background-color: #fff;
  max-width: 30rem;
  border-radius: 25px 0 0 25px;
  padding: 0 1rem;
  font-size: 1rem;
  width: 50%;
}
</style>
