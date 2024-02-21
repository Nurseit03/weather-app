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
import { ref } from 'vue';
import { IArea } from '@/models/area';

export default {
  name: 'StateSelect',
  props: {
    areas: Array,
    onSelect: Function,
  },
  setup(props, { emit }) {
    const selectedState = ref(null);
    const filteredStates = ref(props.areas);

    const filterStates = (
      val: string,
      update: (callback: () => void) => void
    ) => {
      update(() => {
        const needle = val.toLocaleLowerCase();
        filteredStates.value = props?.areas?.filter(
          (state: any) =>
            state?.name &&
            state.name.toLocaleLowerCase().indexOf(needle) > -1
        ) || [];
      });
    };

    const onSelected = () => {
      emit('onSelect', selectedState.value);
    };

    return {
      selectedState,
      filteredStates,
      filterStates,
      onSelected,
    };
  },
};
</script>
