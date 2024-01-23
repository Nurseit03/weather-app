<template>
  <q-btn
    @click="handleTheme"
    :icon="darkMode ? 'light_mode' : 'dark_mode'"
    color="primary"
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
      $q.dark.toggle();
      this.darkMode = $q.dark.isActive;
    },
  },
};
</script>
