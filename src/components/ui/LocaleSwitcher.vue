<template>
    <q-select
      v-model="locale"
      :options="localeOptions"
      dense
      borderless
      emit-value
      map-options
      options-dense
      :style="{ 'min-width': '50px', 'border-radius': '15px', 'background-color': $q.dark.isActive ? '#121212' : 'aliceblue', 'color': $q.dark.isActive ? 'white' : 'black', 'padding': '2.5px 10px' }"
    />
  </template>
  
  <script>
  import { useI18n } from 'vue-i18n'
  
  export default {
    setup () {
      const { locale } = useI18n({ useScope: 'global' })
  
      return {
        locale,
        localeOptions: [
          { value: 'en-US', label: 'EN' },
          { value: 'ru-RU', label: 'RU' }
        ]
      }
    }
  }
  </script>