<template>
  <q-btn
    @click="handleTheme"
    round
    :icon="darkMode ? 'dark_mode' : 'light_mode'"
  />
</template>

<script>
export default {
  data() {
    return {
      darkMode: false,
    };
  },
  methods: {
    handleTheme() {
      const $q = this.$q;
      this.darkMode = $q.dark.isActive;
      $q.dark.toggle();
    },
  },
};
</script>
