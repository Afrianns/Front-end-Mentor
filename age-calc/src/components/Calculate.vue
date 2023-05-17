<script setup>
import { ref } from "vue";
const val = defineProps(["date"]);

//check if props value is empty or not

function isAvail() {
  let props = val.date;
  if (
    props.years == undefined &&
    props.months == undefined &&
    props.days == undefined
  ) {
    return false;
  } else {
    return true;
  }
}

//calculate porps value to get age in year, month, day

function calcAge(indx) {
  const date = new Date();

  const years = val.date.years - date.getFullYear();
  const months = val.date.months - (date.getMonth() + 1);
  const days = val.date.days - date.getDate();
  
  const age = years * 365 + months * 30 + days || 1;

  const ageInYears = (age / 365).toString().split(".");
  const ageInMonths = ((Number("." + ageInYears[1]) || 0) * 12)
    .toString()
    .split(".");
  const ageInDays = Math.trunc((Number("." + ageInMonths[1]) || 0) * 30);

  // console.log(years, months, days, ageInYears, ageInMonths);

  if (indx == "year") {
    return Math.abs(ageInYears[0]);
  } else if (indx == "month") {
    return ageInMonths[0];
  } else if (indx == "day") {
    return ageInDays;
  }
}
</script>
<template>
  <div class="card">
    <div class="result">
      <p class="placeholder">
        <span class="values" v-if="isAvail()">{{ calcAge("year") }}</span>
        <span class="values" v-else>~~</span>
        Years
      </p>
      <p class="placeholder">
        <span class="values" v-if="isAvail()">{{ calcAge("month") }}</span>
        <span class="values" v-else>~~</span>
        Months
      </p>
      <p class="placeholder">
        <span class="values" v-if="isAvail()">{{ calcAge("day") }}</span>
        <span class="values" v-else>~~</span>
        Days
      </p>
    </div>
  </div>
</template>

<style scoped>
.values {
  font-family: "Poppins-Ebold", sans-serif;
  color: var(--purple);
}
.placeholder {
  margin-top: 2.5rem;
  text-align: left;
  line-height: 0;
  font-size: 5.8rem;
}

@media screen and (max-width: 600px) {
  .placeholder {
    font-size: 4.5rem;
  }
}
</style>
