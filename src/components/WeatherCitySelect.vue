<template>
  <div class="q-gutter-md row">
    <q-select
      filled
      :label="$t('Select city')"
      use-input
      hide-selected
      fill-input
      input-debounce="0"
      :options="options"
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
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    // model: {
    //   type: [String, Number, Object], // Adjust type as needed
    //   required: true
    // }
  },
};
</script>
