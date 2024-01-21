<template>
  <div class="q-pa-md content">
    <div class="q-gutter-md row">
      <q-select
        filled
        v-model="model"
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
    <template v-if="weatherData">
      <q-card class="my-card">
        <q-card-section>
          <div class="col text-black text-center">
            <div class="text-h4 text-weight-light">Kyrgyzstan</div>
            <q-separator size="1px" color="black" spaced />
            <div class="text-h6 text-weight-light">Bishkek</div>
            <div class="text-h1 text-weight-thin q-my-lg">
              <span>8&deg;</span>
            </div>
          </div>
          <div class="col text-center">
            <q-btn label="Детали">
              <q-menu transition-show="flip-right" transition-hide="flip-left" anchor="bottom right" self="bottom left">
                <q-list>
                  <q-item clickable v-ripple>
                    <q-item-section>Температура</q-item-section>
                    <q-item-section>
                      <div>Текущая: 8&deg;</div>
                      <!-- <div>Минимальная: 5&deg;</div>
                      <div>Максимальная: 10&deg;</div>
                      <div>Ощущаемая: 7&deg;</div> -->
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-ripple>
                    <q-item-section>Влажность</q-item-section>
                    <q-item-section>
                      <div>75%</div>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-ripple>
                    <q-item-section>Давление</q-item-section>
                    <q-item-section>
                      <div>1015 hPa</div>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-ripple>
                    <q-item-section>Ветер</q-item-section>
                    <q-item-section>
                      <div>Скорость: 10 м/с</div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </q-card-section>
      </q-card>
    </template>
  </div>
</template>

<script>
import { ref } from 'vue';

const stringOptions = ['Bishkek', 'Naryn', 'Tokmok', 'Osh', 'Talas'];

export default {
  name: 'WeatherCitySelect',
  setup() {
    const options = ref(stringOptions);
    const weatherData = true;

    return {
      model: ref(null),
      weatherData,
      options,

      filterFn(val, update) {
        update(() => {
          const needle = val.toLowerCase();
          options.value = stringOptions.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
      },
    };
  },
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  gap: 35px;
}
</style>
