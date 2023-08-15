<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { resultType } from "./types";

let emit = defineEmits(["data", "warn"]);
let user_in = ref("");

// get user submit data and check if input is domain or ip address
function formSubmit(params: any) {
  user_in.value = params.target[0].value;
  user_in.value = validateInput(user_in.value);

  const regex = new RegExp(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/, "g");
  let res = regex.test(user_in.value);

  if (res) {
    validateIP(user_in.value);
  } else {
    validateDomain(user_in.value);
  }
  user_in.value = "";
}

// validate and fixed user input
function validateInput(input_val: string) {
  const regexComma = new RegExp(/[,]/, "gi");
  const regexSlash = new RegExp(/\/(.)*/, "gi");
  const regex = new RegExp(/^((https?:\/\/(www.)?)|www.)/, "gi");

  let result = input_val
    .replace(regex, "")
    .replace(regexComma, ".")
    .replace(regexSlash, "");
  return result;
}

// validate if it IP address or not
function validateIP(input_val: string) {
  let len = false;

  input_val.split(".").forEach((a) => {
    if (Number(a) > 255 || Number(a) < 1) {
      len = true;
      return;
    }
  });

  if (len) {
    emit("warn", "ip address is out of range");
  } else {
    let result: resultType = {
      type: "ip",
      value: user_in.value,
    };
    emit("data", result);
  }
}

// validate if it Domain is valid
function validateDomain(input_val: string) {
  const splitted = input_val.split(".");
  if (splitted.length <= 1) {
    emit("warn", "value is not valid");
    return;
  }
  const isDomain = splitted[splitted.length - 1];
  const isValid = /^[a-z]*$/gi.test(isDomain);

  if (isValid) {
    let result: resultType = {
      type: "domain",
      value: input_val,
    };
    emit("data", result);
  } else {
    emit("warn", "value is not valid");
  }
}
</script>


<template>
  <form
    id="content-wrapper"
    class="form-wrapper"
    action="post"
    v-on:submit.prevent="formSubmit"
  >
    <input
      placeholder="Search for any IP address or domain IP Address"
      type="text"
      name="city"
      :value="user_in"
    />
    <button type="submit">
      <box-icon size="md" color="white" name="chevron-right"></box-icon>
    </button>
  </form>
</template>

<style scoped>
.form-wrapper {
  width: 100%;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-wrapper input,
.form-wrapper button {
  border: 0;
  height: 3rem;
  padding: 0.5rem 0.5rem;
}

.form-wrapper button {
  background-color: var(--Very-Dark-Gray);
  width: 100%;
  padding: 0;
  max-width: 5rem;
  border-radius: 0 25px 25px 0;
  cursor: pointer;
}

.form-wrapper input {
  color: var(--Very-Dark-Gray);
  background-color: #fff;
  max-width: 30rem;
  border-radius: 25px 0 0 25px;
  padding: 0 1rem;
  font-size: 1.2rem;
  width: 100%;
}
@media screen and (max-width: 720px) {
  .form-wrapper {
    margin: 1.5rem 0;
  }
}
</style>
