<template>
        <div class="col text-black text-center">
      <div class="text-h5 text-weight-light">Узнайте погоду в вашем городе</div>
      <q-separator size="1px" color="black" spaced />
      <div class="text-h6 text-weight-light">
        <q-btn @click="getUserCoordinates" color="primary">
          <q-icon name="location_on" />Проверить мое местоположение
        </q-btn>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    getUserCoordinates: {
      type: Function,
      required: true,
    },
  },
};
</script>