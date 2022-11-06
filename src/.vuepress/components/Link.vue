<template>
  <a class="link" v-bind="$attrs" v-on="$listeners">
    <slot />
  </a>
</template>

<style scoped>
  a.link {
    --btn-fontsize: 16px;
    display: inline-block;
    font-size: var(--btn-fontsize);
    padding: calc(var(--unit) * 1) calc(var(--unit) * 3);
    margin: calc(var(--unit) * 1) 0;
    border-radius: calc(var(--unit) * 1);
    border: none;
    background-color: #21a8af;
    color: white;
    cursor: pointer;
  }
  a.link:hover {
    text-decoration: none;
    background-color: #1b8f95;
  }
</style>
