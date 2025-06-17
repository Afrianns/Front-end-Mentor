<script setup lang="ts">
import datas from "../../api/data.json";
import { useFetch } from "./Fetch";

const props = defineProps<{ type: string }>()

const toggleActivate = async (idx: number) => {
    let res = useFetch("http://localhost:4100/update_extensions", idx);
    console.log(res)
}

const filtering = (activate: boolean) => {

    if (props.type == "active") {
        return (activate);
    } else if (props.type == "inactive") {
        return (!activate);
    } else {
        return true;
    }
}

const deleteExtension = async (idx: number) => {
    let res = useFetch("http://localhost:4100/delete_extension", idx)
    console.log(res)
}

</script>
<template>
    <div class="contents-wrapper">
        <template v-for="(data, idx) in datas">
            <section class="card content" v-if="filtering(data.isActive)">
                <div class="content-header">
                    <img :src="data.logo" alt="">
                    <div class="content-info">
                        <h3>
                            {{ data.name }}
                        </h3>
                        <p>
                            {{ data.description }}
                        </p>
                    </div>
                </div>
                <div class="content-footer">
                    <button class="button-default-style" v-on:click="deleteExtension(idx)">remove</button>
                    <div class="toggle-wrapper" :class="{ 'toggle-inactive-color': data.isActive }"
                        v-on:click="toggleActivate(idx)">
                        <span :class="{ 'toggle-pos': data.isActive }"></span>
                    </div>
                </div>
            </section>
        </template>
    </div>
</template>
<style setup>
.contents-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

.content {
    /* border-color: var(--low-gray); */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.5rem;
}

.content-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
}

.content-info>* {
    margin: 0;
}

.content-info h3 {
    margin-bottom: .5rem;
}

.content-info p {
    color: var(--font-medium-color);
}

.content-footer {
    margin-top: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.content-footer button:hover {
    background-color: var(--Red-400);
}

.toggle-wrapper {
    background-color: var(--toggle-color);
    cursor: pointer;
    width: 2.5rem;
    height: 1.2rem;
    padding: .2rem;
    border-radius: 50px;
    position: relative;
}

.toggle-inactive-color {
    background-color: var(--Red-400);
}

.toggle-wrapper span {
    background-color: #fff;
    position: absolute;
    display: block;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 100%;
    right: 1.5rem;
}

.toggle-wrapper .toggle-pos {
    right: .2rem;
}

@media screen and (max-width: 920px) {
    .contents-wrapper {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media screen and (max-width: 650px) {
    .contents-wrapper {
        grid-template-columns: 1fr;
    }
}
</style>