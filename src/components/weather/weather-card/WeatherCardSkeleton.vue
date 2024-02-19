<template>
    <div :class="['q-pa-md', customClass]" style="width: 100%;">
      <q-card style="max-width: 400px">
        <q-item>
          <q-item-section>
            <q-item-label>
              <q-skeleton type="text" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text" />
            </q-item-label>
          </q-item-section>
        </q-item>
  
        <q-skeleton height="200px" square />
  
        <q-card-actions style="align: right" class="q-gutter-md">
          <q-skeleton type="QBtn" />
          <q-skeleton type="QBtn" />
        </q-card-actions>
      </q-card>
    </div>
  </template>

<script setup>
const props = defineProps({
  customClass: {
    type: String,
    default: '',
  },
});
</script>