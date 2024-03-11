<template>
  <div class="q-pa-md" style="width: 100%">
    <q-card :class="['my-card', customClass]">
      <q-item class="card-header">
          <q-skeleton type="square" class="card-header-text" />
          <q-skeleton type="text" height="5px" />
      </q-item>

      <q-item class="card-content">
        <q-item-section>
          <q-skeleton type="square" class="card-content-text" />
        </q-item-section>

        <q-item-section>
          <q-skeleton type="square" class="card-content-toggle" />
        </q-item-section>
      </q-item>

      <q-card-actions class="card-tempunits">
        <q-skeleton type="QBtn" />
        <q-skeleton type="QBtn" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WeatherCardSkeleton',
  props: {
    customClass: {
      type: String,
      default: '',
    },
  },
});
</script>

<style scoped>

.card-header{
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.card-header-text {
  align-self: center;
  height: 40px;
  width: 194px;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card-content-text {
  align-self: center;
  height: 100px;
  width: 295px;
}
.card-content-toggle {
  align-self: center;
  width: 120px;
  height: 36px;
}

.card-tempunits {
  display: flex;
  gap: 30px;
  justify-content: space-around;
  @media (max-width: 768px) {
    justify-content: center;
  }
}
</style>
