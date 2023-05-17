<script setup>
import { ref } from "vue";
import Header from "./components/Header.vue";
import Calc from "./components/Calculate.vue";

let monthsInDays = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};

let dateOfBirth = ref({});

let days = ref();
let months = ref();
let years = ref();

let errors = {};
let isError = ref([false, false, false]);
let status = true;

const birthData = (e) => {
  const now = new Date();
  e.preventDefault();
  status = true;

  errors = {};
  isError.value = [false, false, false];

  let dates = [days.value, months.value, years.value];
  let datesNow = [now.getDate(), now.getMonth() + 1, now.getFullYear()];

  // check if user input is empty or not

  dates.forEach((a, b) => {
    if (!a) {
      isError.value[b] = true;
      errors[b] = "This Field is Required!";
      status = false;
    }
  });

  // check if day, months, years more than this day

  if (dates[2] > datesNow[2]) {
    errors[2] = "Must be in the Past";
    warn(2);
  }

  if (dates[2] == datesNow[2]) {
    if (dates[1] > datesNow[1]) {
      errors[1] = "Must be in the Past";
      warn(1);
    }
    if (dates[0] > datesNow[0] && dates[1] >= datesNow[1]) {
      errors[0] = "Must be in the Past";
      warn(0);
    }
  }

  // validate if date is not valid date

  if (days.value > monthsInDays[months.value] || days.value > 31) {
    errors[0] = "Must be a Valid Day!";
    warn(0);
  }

  if (months.value > 1 && monthsInDays[months.value] == undefined) {
    errors[1] = "Must be a Valid Month!";
    warn(1);
  }

  if (years.value && years.value.toString().length != 4) {
    errors[2] = "Must be a Valid Year!";
    warn(2);
  }

  if (status) {
    dateOfBirth.value = {
      days: days.value,
      months: months.value,
      years: years.value,
    };
  } else {
    return status;
  }
};

// error warning indicator
function warn(ind) {
  isError.value[ind] = true;
  status = false;
}
</script>

<template>
  <main class="content">
    <Header />
    <div id="container">
      <section class="input-user">
        <div class="form form-day">
          <label for="days" :class="{ error: isError[0] }">Day</label>
          <input
            :class="{ error: isError[0] }"
            v-model="days"
            type="number"
            min="1"
            max="31"
            id="days"
            required
            placeholder="DD"
          />
          <p v-if="birthData" class="msgError">
            {{ errors[0] }}
          </p>
        </div>
        <div class="form form-month">
          <label for="months" :class="{ error: isError[1] }">Month</label>
          <input
            :class="{ error: isError[1] }"
            v-model="months"
            type="number"
            min="1"
            max="12"
            id="months"
            placeholder="MM"
            required
          />
          <p v-if="birthData" class="msgError">
            {{ errors[1] }}
          </p>
        </div>
        <div class="form form-year">
          <label for="years" :class="{ error: isError[2] }">Year</label>
          <input
            :class="{ error: isError[2] }"
            v-model="years"
            type="number"
            min="1000"
            id="years"
            placeholder="YYYY"
            required
          />
          <p v-if="birthData" class="msgError">
            {{ errors[2] }}
          </p>
        </div>
      </section>
      <section class="btn">
        <span class="line" />
        <button class="submit" v-on:click="birthData" type="submit">
          <img src="../public/images/icon-arrow.svg" class="icon" alt="" />
        </button>
      </section>
      <Calc :date="dateOfBirth" />
    </div>
  </main>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.input-user {
  gap: 1.5rem;
  display: flex;
}

.line {
  width: 100%;
  left: 0;
  top: 3rem;
  border-bottom: 2px solid var(--secondary);
  position: absolute;
  z-index: 0;
}

.input-user input {
  width: 9rem;
  height: 4.5rem;
  border-radius: 10px;
  border: 1px solid var(--secondary);
  padding-left: 15px;
  font-weight: bolder;
  font-size: 2.3rem;
  background-color: var(--input-bg);
  color: var(--secondary-font);
}

.input-user input:focus {
  outline-color: var(--purple);
}

.input-user .error {
  color: var(--lightred);
  text-align: left;
  font-weight: bolder;
  border-color: var(--lightred);
}

.btn {
  display: block;
  text-align: right;
  position: relative;
}
button {
  border-radius: 20px;
}

.btn img {
  width: 2.5rem;
}

.icon {
  width: 1.5rem;
}

.submit {
  position: relative;
  background: var(--purple);
  width: 6.5rem;
  height: 6.5rem;
  border-radius: 50%;
}
.submit:hover {
  border-color: var(--purple);
}

.form label {
  margin: 0.5rem 0;
  text-align: left;
  display: block;
}

@media screen and (max-width: 600px) {
  .input-user input {
    width: 7rem;
    height: 4rem;
    font-size: 3ch;
  }

  .input-user {
    gap: 0.85rem;
    display: flex;
    justify-content: space-around;
  }
  .msgError {
    font-size: 0.5rem;
  }

  .submit {
    margin-top: 0.75rem;
    width: 5rem;
    height: 5rem;
  }
  .btn {
    text-align: center;
  }
}
</style>
