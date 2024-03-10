import { AreaType, IArea } from '@/models/area';
import { IWeather } from '@/models/weather';
import { Module } from 'vuex';

interface WeatherState {
  weatherData: IWeather;
  selectedAreas: AreaType;
  countriesData: IArea[];
  weatherIsFetching: boolean;
}

const weatherModule: Module<WeatherState, any> = {
  state: {
    weatherData: {},
    selectedAreas: {},
    countriesData: [],
    weatherIsFetching: false,
  },
  mutations: {
    setWeatherData(state, data) {
      return (state.weatherData = data);
    },
    setSelectedAreas(state, areas) {
      return (state.selectedAreas = areas);
    },
    setCountriesData(state, data) {
      return (state.countriesData = data);
    },
    setWeatherIsFetching(state, value: boolean): boolean {
      return (state.weatherIsFetching = value);
    },
  },
  actions: {
    setWeatherData({ commit }, data) {
      commit('setWeatherData', data);
    },
    setSelectedAreas({ commit }, areas) {
      commit('setSelectedAreas', areas);
    },
    setWeatherIsFetching({commit}, value) {
      commit('setWeatherIsFetching', value)
    }
  },
  getters: {
    getWeatherData(state) {
      return state.weatherData;
    },
    getSelectedAreas(state) {
      return state.selectedAreas;
    },
    getCountriesData(state) {
      return state.countriesData;
    },
    getWeatherIsFetching(state) {
      return state.weatherIsFetching;
    },
  },
};

export default weatherModule;
