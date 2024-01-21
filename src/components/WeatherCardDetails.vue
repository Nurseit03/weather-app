<template>
  <q-menu
    transition-show="flip-right"
    transition-hide="flip-left"
    anchor="bottom right"
    self="bottom left"
  >
    <q-list>
      <q-item clickable v-ripple v-show="weatherData.main">
        <q-item-section>Температура</q-item-section>
        <q-item-section>
          <div>Текущая: {{ weatherData.main?.temp }}F&deg;</div>
          <div>Минимальная: {{ weatherData.main?.temp_min }}&deg;</div>
          <div>Максимальная: {{ weatherData.main?.temp_max }}&deg;</div>
          <div>По ощущению: {{ weatherData.main?.feels_like }}&deg;</div>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item clickable v-ripple v-show="weatherData.main?.humidity">
        <q-item-section>Влажность</q-item-section>
        <q-item-section>
          <div>{{ weatherData.main?.humidity }} %</div>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item clickable v-ripple v-show="weatherData.main?.pressure">
        <q-item-section>Давление</q-item-section>
        <q-item-section>
          <div>{{ weatherData.main?.pressure }} hPa</div>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item clickable v-ripple v-show="weatherData.wind">
        <q-item-section>Ветер</q-item-section>
        <q-item-section>
          <div>Скорость: {{ weatherData.wind?.speed }} м/с</div>
          <div>Направление: {{ weatherData.wind?.deg }}&deg;</div>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple v-show="weatherData.weather">
        <q-item-section>
          <img
            :src="`https://openweathermap.org/img/wn/${weatherData?.weather?.[0]?.icon}@2x.png`"
          />
        </q-item-section>
        <q-item-section>
          {{ weatherData?.weather?.[0]?.main }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script>
export default {
  props: {
    weatherData: {
      type: Object,
      required: true,
    },
  },
};
</script>
