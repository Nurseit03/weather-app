export const getWeatherByLocationName = (name: string, locale: string) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${process.env.WEATHER_API_KEY}&units=metric&lang=${locale}`
  ).then((response) => response.json());
};

export const getWeatherByCoordinates = (
  latitude: number | null,
  longitude: number | null,
  locale: string
) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}&units=metric&lang=${locale}`
  ).then((response) => response.json());
};
