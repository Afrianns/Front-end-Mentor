<script setup lang="ts">
</script>

<template>
<div class="container">
    <div class="search-bar-wrapper">
        <form action="#" method="post">
            <input type="text" placeholder="e.g. Indonesia" class="search-bar">
            <button type="submit">Search</button>
        </form>
    </div>
    <div class="filter-bar-wrapper">
        <form action="#" method="post" class="filters-bar">
            <select name="filters" id="filters">
                <option selected disabled>Filter By Region</option>
                <option value="All">All</option>
                <option value="Europe">Europe</option>
                <option value="Asia">Asia</option>
                <option value="America">America</option>
                <option value="Africa">Africa</option>
                <option value="Australia">Oceania</option>
            </select>
        </form>
    </div>
</div>
</template>

<style scoped>
.container{
    gap: 1rem;
    margin-top: 2rem;
}

.container input, .search-bar-wrapper,.filter-bar-wrapper{
    background-color: var(--secondary-bg);
}

.search-bar-wrapper{
    box-shadow: 0 0 10px -7px var(--tertiery-bg);
    /* border: 2px solid var(--bg); */
    width: 100%;
    max-width: 35rem;
    padding: 2px;
}

.search-bar-wrapper .search-bar{
    padding: 0 10px;
    font-size: clamp(1rem, 1.2rem, 2rem);
    color: var(--text);
    width:clamp(80%, 5vw, 80%);
    outline: 0;
}

.search-bar-wrapper form{
    display: flex;
    align-items: center;
}

.search-bar-wrapper button{
    background-color: rgb(255, 124, 124);
    font-size: clamp(1rem, 1vw, 2rem);
    text-transform: uppercase;
    color: #fff;
    width: clamp(30%, 10px, 30%);
}

.search-bar-wrapper button:hover{
    background-color: #f75e49;
    cursor: pointer;

}
.search-bar-wrapper form > *{
    border: 0;
    height: 2.5rem;
}

.filter-bar-wrapper{
    box-shadow: 0 0 10px -7px var(--tertiery-bg);
    /* border: 2px solid var(--bg); */
    width: 25%;
    padding: 2px;
}

.filters-bar, #filters{
    background-color: var(--secondary-bg);
}
.filters-bar{
    padding: 0 15px;
}
#filters{
    cursor: pointer;
    color: var(--text);
    outline: 0;
    border: 0;
    height: 2.5rem;
    width: 100%;
}

@media screen and (max-width: 720px) {
    .container{
        flex-direction: column;
    }
    .filter-bar-wrapper{
        width: clamp(100px, 100%, 200px);
        align-self: flex-end;
    }

    .search-bar-wrapper{
        max-width: 100%;
    }
}

@media screen and (max-width: 400px) {
    .search-bar-wrapper{
        padding: 3px;
    }
    .search-bar-wrapper form{
        flex-direction: column;
        display: flex;
    }

    .search-bar-wrapper .search-bar,.search-bar-wrapper button{
        width: 100%;
    }
}
</style>