<template>
  <div class="q-pa-md content">
    <div class="q-gutter-md row">
      <q-select
        filled
        v-model="model"
        label="Выберите город"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        :options="options"
        @filter="filterFn"
        style="width: 250px; padding-bottom: 32px"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
    <q-card v-if="weatherData.main" class="my-card">
      <q-card-section>
        <div class="col text-black text-center">
          <div class="text-h4 text-weight-light">Kyrgyzstan</div>
          <q-separator size="1px" color="black" spaced />
          <div class="text-h6 text-weight-light">Bishkek</div>
          <div class="text-h1 text-weight-thin q-my-lg">
            <span>{{ weatherData.main?.temp }}&deg;C</span>
          </div>
        </div>
        <div class="col text-center">
          <q-btn label="Детали" style="border: none">
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
                    <div>
                      Минимальная: {{ weatherData.main?.temp_min }}&deg;
                    </div>
                    <div>
                      Максимальная: {{ weatherData.main?.temp_max }}&deg;
                    </div>
                    <div>По ощущению: {{ weatherData.main?.temp }}&deg;</div>
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
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
    <div class="text-h6 text-weight-light" v-else>ИЛИ</div>
    <div class="col text-black text-center">
      <div class="text-h5 text-weight-light">Узнайте погоду в вашем городе</div>
      <q-separator size="1px" color="black" spaced />
      <div class="text-h6 text-weight-light">
        <q-btn @click="getUserCoordinates" color="primary">
          <q-icon name="location_on" />Проверить мое местоположение
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, toRefs } from 'vue';
import { IWeather } from '../models/weather';

const stringOptions = ['Bishkek', 'Naryn', 'Tokmok', 'Osh', 'Talas'];

const model = ref(null);
let options = reactive(stringOptions);
let weatherData = reactive<IWeather>({});
let userCoordinates = reactive({ latitude: null, longitude: null });

const getUserCoordinates = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    setUserCoordinates(position?.coords?.longitude, position?.coords?.latitude);
  });
};

const setUserCoordinates = (latitude: any, longitude: any) => {
  userCoordinates.latitude = latitude;
  userCoordinates.longitude = longitude;
};

const getWeatherByCoordinates = (latitude: any, longitude: any) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      Object.assign(weatherData, toRefs(reactive(data)));
    });
};

const filterFn = (val: any, update: any) => {
  update(() => {
    const needle = val.toLowerCase();
    options = stringOptions.filter((v) => v.toLowerCase().indexOf(needle) > -1);
  });
};

const convertToCelsius = (tempInFahrenheit: number | undefined) => {
  if (tempInFahrenheit !== undefined) {
    return Math.round((tempInFahrenheit - 32) / 1.8);
  }
  return '';
};

watch(userCoordinates, () => {
  if (userCoordinates) {
    getWeatherByCoordinates(
      userCoordinates?.latitude,
      userCoordinates?.longitude
    );
  }
});
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 35px;
}
</style>
