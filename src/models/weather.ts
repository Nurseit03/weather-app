export interface IWeather {
  wind?: {
    speed: number;
    deg: number;
  };
  main?: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
  };
  weather?: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  sys?:{
    country: string;
  }
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';