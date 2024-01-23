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
      @input-value="setModel"
      style="width: 250px"
      @input="emitSelectedObject"
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
import { ref, watch} from 'vue'

export default {
  props: {
    options: {
      type: Array,
      required: true,
    }
  },
  setup(props) {
    const model = ref(null);
    const filteredOptions = ref(props.options);

    watch(
      () => props.options,
      (newOptions) => {
        filteredOptions.value = newOptions;
      }
    )

    watch(
      () => model.value,
      (newValue) => {
        console.log('Выбранный объект:', newValue);
      }
    )

    const filterFn = (val, update, abort) => {
      update(() => {
        const needle = val.toLocaleLowerCase();
        filteredOptions.value = props.options.filter(v => v.label.toLocaleLowerCase().indexOf(needle) > -1);
      })
    }

    const setModel = (val) => {
      model.value = val;
    }

    const emitSelectedObject = () => {
      console.log('Emit emit emit', model.value);
      this.$emit('selectedCity', model.value);
    }

    return {
      model,
      filteredOptions,
      filterFn,
      setModel,
      emitSelectedObject,
    }
  },
}
</script>