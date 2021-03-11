<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  data: () => ({}),
}
</script>

<style lang="scss">
@import "./assets/styles/variables";

.contact-form-errors {
  color: $danger-color;
  text-align: center;
  margin-top: 5px;
}

.close {
  cursor: pointer;
  padding: 5px;
}
</style>
