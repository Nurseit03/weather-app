<template>
  <div class="q-gutter-md row">
    <q-select
      filled
      :label="$t('Select city')"
      v-model="model"
      use-input
      hide-selected
      fill-input
      input-debounce="0"
      :options="filteredOptions"
      @filter="filterFn"
      @update:model-value="emitSelectedCity"
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
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'WeatherCitySelect',
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const model = ref(null);
    const filteredOptions = ref(props.options);

    watch(
      () => props.options,
      (newOptions) => {
        filteredOptions.value = newOptions;
      }
    );

    const emitSelectedCity = (val) => {
      emit('onSelect', val);
    };

    const filterFn = (val, update, abort) => {
      update(() => {
        const needle = val.toLocaleLowerCase();
        filteredOptions.value = props.options.filter(
          (v) => v.label.toLocaleLowerCase().indexOf(needle) > -1
        );
      });
    };

    return {
      model,
      emitSelectedCity,
      filteredOptions,
      filterFn,
    };
  },
};
</script>
