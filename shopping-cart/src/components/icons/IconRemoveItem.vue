<template>
    <div class="icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
            <path d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z" />
        </svg>
    </div>
</template>
<style scoped>
.icon-wrapper {
    border: 2px solid var(--Rose-300);
    padding: .2rem;
    border-radius: 50px;
    fill: var(--Rose-300);
    cursor: pointer;
    display: flex;
}

.icon-wrapper svg {
    width: .75rem;
    height: .75rem;
}

.icon-wrapper:hover {
    border-color: var(--Rose-500);
}

.icon-wrapper:hover path {
    fill: var(--Rose-500);
}
</style>