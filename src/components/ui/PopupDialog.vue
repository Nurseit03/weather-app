<template>
  <q-dialog
    v-model="showDialog"
    persistent
    transition-show="scale"
    transition-hide="scale"
    :class="{ ...customClasses }"
  >
    <q-card :class="'bg-teal text-white'">
      <q-card-section>
        <div class="text-h6">{{ $t(`${title}`) }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        {{ $t(`${content}`) }}
      </q-card-section>
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn
          flat
          :label="$t(buttonText)"
          v-close-popup
          @click="hideCustomDialog"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'PopupDialog',
  props: {
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    buttonText: {
      type: String,
      default: 'OK',
    },
    customClasses: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const showDialog = ref(true);

    return {
      showDialog,
      ...props,
    };
  },
};
</script>
