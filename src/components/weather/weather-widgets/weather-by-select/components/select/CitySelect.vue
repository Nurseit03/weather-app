<template>
  <q-select
    filled
    :label="selectedCity ? $t('City') : $t('Select city')"
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
import { ref, watch } from 'vue';
import { IArea } from '@/models/area';

export default {
  name: 'CitySelect',
  props: {
    areas: {
      type: Array as () => IArea[] | null,
      default: null,
    },
    onSelect: Function,
    defaultArea: {
      type: Object as () => IArea | null,
      default: null,
    },
  },
  setup(props, { emit }) {
    const selectedCity = ref(props?.defaultArea ?? null);
    const filteredCities = ref(props?.areas ?? []);

    const filterCities = (
      val: string,
      update: (callback: () => void) => void
    ) => {
      update(() => {
        const needle = val.toLocaleLowerCase();
        filteredCities.value =
          props?.areas?.filter(
            (city: IArea | null) =>
              city?.name && city.name.toLocaleLowerCase().indexOf(needle) > -1
          ) || [];
      });
    };

    const onSelected = () => {
      emit('onSelect', selectedCity.value);
    };

    watch(
      () => props.defaultArea,
      (newVal) => {
        selectedCity.value = newVal;
      },
      { deep: true }
    );

    return {
      selectedCity,
      filteredCities,
      filterCities,
      onSelected,
    };
  },
};
</script>
