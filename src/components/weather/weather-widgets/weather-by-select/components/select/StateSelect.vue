<template>
  <q-select
    filled
    :label="selectedState ? $t('State') : $t('Select state')"
    v-model="selectedState"
    use-input
    hide-selected
    fill-input
    input-debounce="0"
    :options="filteredStates"
    :option-label="(state: IArea) => state?.name"
    @filter="filterStates"
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
import { Ref } from 'vue';

export default {
  name: 'StateSelect',
  props: {
    areas: Array,
    onSelect: Function,
    defaultArea: {
      type: Object as () => IArea | null,
      default: null,
    },
  },
  setup(props, { emit }) {
    const selectedState = ref(props?.defaultArea ?? null);
    const filteredStates = ref(props?.areas ?? []);

    const filterStates = (
      val: string,
      update: (callback: () => void) => void
    ) => {
      update(() => {
        const needle = val.toLocaleLowerCase();
        filteredStates.value =
          props?.areas?.filter(
            (state: any) =>
              state?.name && state.name.toLocaleLowerCase().indexOf(needle) > -1
          ) || [];
      });
    };

    const onSelected = () => {
      emit('onSelect', selectedState.value);
    };

    watch(
      () => props.defaultArea,
      (newVal) => {
        selectedState.value = newVal;
      },
      { deep: true }
    );

    return {
      selectedState,
      filteredStates,
      filterStates,
      onSelected,
    };
  },
};
</script>
