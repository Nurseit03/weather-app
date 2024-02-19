<template>
    <q-select
      filled
      :label="$t('Select state')"
      v-model="selectedState"
      use-input
      hide-selected
      fill-input
      input-debounce="0"
      :options="filteredStates"
      :option-label="state => state?.name"
      @filter="filterStates"
      @update:model-value="getState"
      style="width: 250px"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            {{ $t('No results') }}
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </template>
  
  <script lang="ts">
  import { ref, watch } from 'vue';
  import { State } from 'country-state-city';
  
  export default {
    name: 'StateSelect',
    props: {
      isoCode: String,
      onSelect: Function,
    },
    setup(props, { emit }) {
      const selectedState = ref(null);
      const filteredStates = ref(State.getStatesOfCountry(props?.isoCode));
  
      watch(
        () => props.isoCode,
        (newIsoCode) => {
          if (newIsoCode) {
            filteredStates.value = State.getStatesOfCountry(newIsoCode);
          }
        }
      );
  
      const filterStates = (val: string, update: (callback: () => void) => void) => {
        update(() => {
          const needle = val.toLocaleLowerCase();
          if (props.isoCode) {
            filteredStates.value = State.getStatesOfCountry(props.isoCode).filter(
              (state) => state.name.toLocaleLowerCase().indexOf(needle) > -1
            );
          }
        });
      };
  
      const getState = () => {
        emit('onSelect', selectedState.value);
      };
  
      return {
        selectedState,
        filteredStates,
        filterStates,
        getState,
      };
    },
  };
  </script>
  