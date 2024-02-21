<template>
  <q-select
    filled
    :label="$t('Select city')"
    v-model="selectedCity"
    use-input
    hide-selected
    fill-input
    input-debounce="0"
    :options="filteredCities"
    :option-label="(city: IArea) => city?.name"
    @filter="filterCities"
    @update:model-value="onSelected"
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
import { ref } from 'vue';
import { IArea } from '@/models/area';

export default {
  name: 'CitySelect',
  props: {
    areas: Array,
    onSelect: Function,
  },
  setup(props, { emit }) {
    const selectedCity = ref(null);
    const filteredCities = ref(props.areas);

    const filterCities = (
      val: string,
      update: (callback: () => void) => void
    ) => {
      update(() => {
        const needle = val.toLocaleLowerCase();
        filteredCities.value = props?.areas?.filter(
          (city: any) =>
            city?.name &&
            city.name.toLocaleLowerCase().indexOf(needle) > -1
        ) || [];
      });
    };

    const onSelected = () => {
      emit('onSelect', selectedCity.value);
    };

    return {
      selectedCity,
      filteredCities,
      filterCities,
      onSelected,
    };
  },
};
</script>
